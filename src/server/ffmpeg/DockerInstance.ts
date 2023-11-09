import { Pipeline } from '../../interface/GenericInterfaces'
import insertArgs from '../utils/insertArgs'
import { addToLog, updatePipelineState } from '../webserver/webserver'
import Docker from 'dockerode'
import { Settings } from '../../interface/SettingsInterface'

interface DockerInstanceProps {
	pipelineIndex: number
	settings: Settings
	dockerNode: Docker | null
}

export class DockerInstance {
	settings: Settings
	docker: Docker | null
	containerIndex: number
	timeOutInstance: NodeJS.Timeout | null = null
	keepInstanceRunning = true
	container: any = null

	constructor(props: DockerInstanceProps) {
		this.containerIndex = props.pipelineIndex
		this.settings = props.settings
		this.docker = props.dockerNode
	}


	initFFmpeg = (cmd: Pipeline) => {
		if (!this.docker) {
			return
		}
		const imageName = this.settings.nodeList[cmd.nodeIndex].imageName
		const ffmpegArgs = [
			//'-hide_banner',
			...insertArgs(cmd.globalInput.param, cmd.globalInput.valueArgs),
			...insertArgs(cmd.globalOutput.param, cmd.globalOutput.valueArgs),
			...insertArgs(cmd.input.param, cmd.input.valueArgs),
			...insertArgs(cmd.filter.param, cmd.filter.valueArgs),
			...insertArgs(cmd.audioFilter.param, cmd.audioFilter.valueArgs),
			...insertArgs(cmd.output.param, cmd.output.valueArgs)
		]
		
		this.keepInstanceRunning = true
		const runtimeName = 'live-factory-' + cmd.uuid
		
		// Check if container exists:
		console.log('Setting up docker container :', runtimeName)
		console.log('With parameters :', ffmpegArgs)
		this.docker.listContainers({ all: true, filters: { name: [runtimeName] } }).then((container) => {
			if (container.length > 0) {
				console.log('Container already running, stopping')
				this.docker?.getContainer(container[0].Id).inspect().then((container: any) => {
					if (container.State.Running) {
						this.docker?.getContainer(container.Id).stop().then(() => {
							this.docker?.getContainer(container.Id).remove()
						})
					} else {
						this.docker?.getContainer(container.Id).remove()
					}
				})
			} else {
				let bindings: {} = {}
				let exposure: {} = {}
				let folderBinds = this.settings.nodeList[cmd.nodeIndex].mapHostFolders?.map((folder) => {
					return `${folder}`
				}) || []

				cmd.dockerInputPorts.forEach((port) => {
					bindings = {...bindings, [`${port.port}/${port.protocol}`]: [{ HostPort: `${port.port}` }]}
					exposure = {...exposure, [`${port.port}/${port.protocol}`]: {}}
				})
				cmd.dockerOutputPorts.forEach((port) => {
					bindings = {...bindings, [`${port.port}/${port.protocol}`]: [{ HostPort: `${port.port}` }]}
					exposure = {...exposure, [`${port.port}/${port.protocol}`]: {}}
				})
				const hostConfig = {
					PortBindings: {...bindings},
					Binds: folderBinds
				}
				const exposedPorts = {...exposure}
				
/*				Example of port bindings and exposed ports:
				const hostConfig1 = {
					PortBindings:
						{ "5432/tcp": [{ HostPort: "5432" }] }
				}
				const exposedPorts1 = {
					'5432/tcp': {}
				}
*/				

				this.docker?.run(imageName || 'jrottenberg/ffmpeg', ffmpegArgs, process.stdout, {
					ExposedPorts: exposedPorts,
					HostConfig: hostConfig,
					name: runtimeName,
					Tty: false
				},
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
					updatePipelineState(this.containerIndex, true, false)
					console.log('Container :', container.id)
					this.container = container
				}).on('stream', (stream: any) => {
					stream.on('data', (data: any) => {
						addToLog(this.containerIndex, data.toString())
						console.log('Pipeline :', this.containerIndex, 'Data: ', data.toString())
						updatePipelineState(this.containerIndex, true, true)
					})
						.on('end', () => {
							this.container.remove()
							this.container = null
							console.log('Encoding ended, container removed')
							updatePipelineState(this.containerIndex, false, false)
						})
				})
			}
		})
	}

	runInstance = (command: string, args: string[]) => {
		console.log(command, args)
		console.log('Setting Encoder state on index:', this.containerIndex)
		updatePipelineState(this.containerIndex, true, true)
		return this.container.id
	}

	killInstance = (containerIndex: number) => {
		if (this.container === null) {
			return
		}
		console.log(`Stopping Encoder Index : ${containerIndex}`, 'Docker :', this.container?.id)
		this.container.stop();
		if (this.timeOutInstance) {
			clearTimeout(this.timeOutInstance)
		}
		updatePipelineState(this.containerIndex, false, false)
	}

	stopInstance = (containerIndex: number) => {
		this.keepInstanceRunning = false
		this.killInstance(containerIndex)
	}
}
