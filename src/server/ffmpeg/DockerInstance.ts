import { IFactory } from '../../interface/GenericInterfaces'
import insertArgs from '../utils/insertArgs'
import { addToLog, updateEncoderState } from '../webserver/webserver'
import Docker from 'dockerode'
import { ISettings } from '../../interface/SettingsInterface'

interface DockerInstanceProps {
	containerIndex: number
	settings: ISettings
}

export class DockerInstance {
	settings: ISettings
	containerIndex = 0
	timeOutInstance: NodeJS.Timeout | null = null
	keepInstanceRunning = true
	docker: Docker | null = null
	container: any = null

	constructor(props: DockerInstanceProps) {
		this.containerIndex = props.containerIndex
		this.settings = props.settings
	}


	initFFmpeg = (cmd: IFactory) => {
		const node = this.settings.nodeList[cmd.nodeIndex]
		this.docker = new Docker({ host: node.host, port: node.port })

		// Todo: Add support for docker args pr pipeline (e.g. ports for NDI and SRT)
		const containerArgs = '-it -p 5000-9000:5000-9000'

		const ffmpegArgs = [
			'-hide_banner',
			...insertArgs(cmd.globalInput.param, cmd.globalInput.paramArgs),
			...insertArgs(cmd.globalOutput.param, cmd.globalOutput.paramArgs),
			...insertArgs(cmd.input.param, cmd.input.paramArgs),
			...insertArgs(cmd.filter.param, cmd.filter.paramArgs),
			...insertArgs(cmd.audioFilter.param, cmd.audioFilter.paramArgs),
			...insertArgs(cmd.output.param, cmd.output.paramArgs)
		]

		this.keepInstanceRunning = true
		const runtimeName = 'live-factory-' + cmd.uuid

		// Check if container exists:
		console.log('Setting up docker container :', runtimeName)
		this.docker.listContainers({ all: true }).then((containers) => {
			const container = containers.find((container: any) => container.Names.includes('/' + runtimeName))
			if (container) {
				console.log('Container already exists, removing')
				this.docker?.getContainer(container.Id).stop()
				this.docker?.getContainer(container.Id).remove()
			}
		})


		this.docker.run(node.containerName || 'jrottenberg/ffmpeg', ffmpegArgs, process.stdout, { name: runtimeName ,Env: [containerArgs], Tty: false },
			(err: Error) => {
				if (err) {
					addToLog(this.containerIndex, err.message)
					if (err.message.includes('Decklink input buffer overrun')) {
						// Restart service if Decklink buffer is overrun:
					}
					console.error('Error :', err.message)
				}
			}
		).on('container', (container: any) => {
			updateEncoderState(this.containerIndex, true, false)
			console.log('Container :', container.id)
			this.container = container
		}).on('stream', (stream: any) => {
			stream.on('data', (data: any) => {
				console.log('Data :', data.toString())
				updateEncoderState(this.containerIndex, true, true)
			})
			.on('end', () => {
				this.container.remove()
				this.container = null
				console.log('Encoding ended, container removed')
				updateEncoderState(this.containerIndex, false, false)
			})
		})
	}

	runInstance = (command: string, args: string[]) => {
		console.log(command, args)
		console.log('Setting Encoder state on index:', this.containerIndex)
		updateEncoderState(this.containerIndex, true, true)
		return this.container.id
	}

	killInstance = (containerIndex: number) => {
		console.log(`Stopping Encoder Index : ${containerIndex}`, 'Docker :', this.container.id)
		this.container.stop();
		if (this.timeOutInstance) {
			clearTimeout(this.timeOutInstance)
		}
		updateEncoderState(this.containerIndex, false, false)
	}

	stopInstance = (containerIndex: number) => {
		this.keepInstanceRunning = false
		this.killInstance(containerIndex)
	}
}
