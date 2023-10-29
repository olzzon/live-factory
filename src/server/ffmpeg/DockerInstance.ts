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

		//this.docker.run(node.containerName || 'jrottenberg/ffmpeg', ['ffmpeg ', containerArgs, ffmpegArgs], [process.stdout, process.stderr], { Tty: false },
		console.log('Container is starting')

		this.docker.run(node.containerName || 'jrottenberg/ffmpeg', ffmpegArgs, [process.stdout, process.stderr], { Env: [containerArgs], Tty: false },
			(err: Error, data: any) => {
				if (err) {
					addToLog(this.containerIndex, err.message)
					if (err.message.includes('Decklink input buffer overrun')) {
						// Restart service if Decklink buffer is overrun:
					}
					console.error('Error :', err.message)
				} else {
					addToLog(this.containerIndex, 'Running')
					//console.log('Data from Docker :', data)
					//let statusCode = data[0];
					this.container = data[1];
					//console.log("Statuscode :", statusCode);
				}
			}
		)


		/*
		.on('exit', (response: number) => {
				console.log(`Encoder ${cmd.containerName} Exited :`, response)
			})
			.on('close', (code: number, signal: string) => {
				console.log('Encoder index :', this.containerIndex, 'Have been closed with code :', code, 'Signal :', signal)
				if (this.keepInstanceRunning) {
					this.killInstance(this.containerIndex)
					updateEncoderState(this.containerIndex, true, false)
					this.timeOutInstance = setTimeout(() => {
						console.warn('Encoder restarting')
						this.initFFmpeg(cmd)
					}, 2000)
				} else {
					updateEncoderState(this.containerIndex, false, false)
				}
			})
			.on('error', (response: Error) => {
				console.error(`Encoder ${cmd.containerName} Error :`, response)
			})
			.on('disconnect', (response: any) => {
				updateEncoderState(this.containerIndex, false, false)
				console.error(`Encoder ${cmd.containerName} Disconnected :`, response)
			})
			*/

	}

	runInstance = (command: string, args: string[]) => {
		console.log(command, args)
		console.log('Setting Encoder state on index:', this.containerIndex)
		updateEncoderState(this.containerIndex, true, true)
		return this.container.id
	}

	killInstance = (containerIndex: number) => {
		console.log(`Stopping Encoder Index : ${containerIndex}`, 'Docker :', this.container.id)
		this.container.remove();
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
