// const exec = require('child_process').exec
import { ChildProcess, ChildProcessWithoutNullStreams, spawn } from 'child_process'
import { IFactory } from '../../interface/GenericInterfaces'
import insertArgs from '../utils/insertArgs'
import { addToLog, updateEncoderState } from '../webserver/webserver'
import Docker from 'dockerode'

interface DockerInstanceProps {
	containerIndex: number
}

export class DockerInstance {
	CHANGE_TO_DOCKER_childProcess: ChildProcess | null = null
	containerIndex = 0
	timeOutInstance: NodeJS.Timeout | null = null
	keepInstanceRunning = true
	constructor(props: DockerInstanceProps) {
		this.containerIndex = props.containerIndex
	}

	initFFmpeg = (cmd: IFactory) => {
		// console.log('Transcoder Child', this.child)
		//const command = path.resolve(homeDir, 'live-factory', 'dockerruntime')
		// const command = `/snapshot/live-factory/dist/server/ffmpeg/../ffmpegruntime`

		// const container = new Docker({ socketPath: '/var/run/docker.sock'})
		const container = new Docker({ socketPath: '/opt/homebrew/Cellar/docker/24.0.7/bin/docker' })


		let args =
			' -hide_banner ' +
			insertArgs(cmd.globalInput.param, cmd.globalInput.paramArgs) +
			insertArgs(cmd.globalOutput.param, cmd.globalOutput.paramArgs) +
			insertArgs(cmd.input.param, cmd.input.paramArgs) +
			insertArgs(cmd.filter.param, cmd.filter.paramArgs) +
			insertArgs(cmd.audioFilter.param, cmd.audioFilter.paramArgs) +
			insertArgs(cmd.output.param, cmd.output.paramArgs)

		this.keepInstanceRunning = true

		if (this.CHANGE_TO_DOCKER_childProcess) {
			container.run('jrottenberg/ffmpeg', [args], [process.stdout, process.stderr], { Tty: false },
				() => {
					let data = Buffer.from(args)
					let message = data.toString('utf8')
					addToLog(this.containerIndex, message)
					if (message.includes('Decklink input buffer overrun')) {
						// Restart service if Decklink buffer is overrun:
						if (this.CHANGE_TO_DOCKER_childProcess) {
							this.CHANGE_TO_DOCKER_childProcess?.stdin?.write('q')
						}
					}
				}
			);
			console.log('Transcoder already running')
			this.CHANGE_TO_DOCKER_childProcess.stdin?.write('q')
		}
		console.log('Container is starting')
		console.debug('Container ID', container)


		this.CHANGE_TO_DOCKER_childProcess?.on('exit', (response: number) => {
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

	}

	runInstance = (command: string, args: string[]): ChildProcessWithoutNullStreams => {
		console.log('Spawning Encode index:', this.containerIndex)
		updateEncoderState(this.containerIndex, true, true)
		return spawn(command, args, { shell: true })
	}

	killInstance = (containerIndex: number) => {
		console.log(`Stopping Encoder Index : ${containerIndex}`)
		if (this.timeOutInstance) {
			clearTimeout(this.timeOutInstance)
		}
		this.CHANGE_TO_DOCKER_childProcess?.stdin?.write('q')
		this.CHANGE_TO_DOCKER_childProcess?.unref()
		updateEncoderState(this.containerIndex, false, false)
	}

	stopInstance = (containerIndex: number) => {
		this.keepInstanceRunning = false
		this.killInstance(containerIndex)
	}
}
