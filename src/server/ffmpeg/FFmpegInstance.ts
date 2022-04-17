// const exec = require('child_process').exec
import { ChildProcess, ChildProcessWithoutNullStreams, spawn } from 'child_process'
import { IFactory } from '../../interface/GenericInterfaces'
import insertArgs from '../utils/insertArgs'
import { updateEncoderState } from '../webserver/webserver'

interface FFmpegInstanceProps {
	containerIndex: number
}

export class FFmepgInstance {
	childProcess: ChildProcess | null = null
	containerIndex = 0
	timeOutInstance: NodeJS.Timeout | null = null
	keepInstanceRunning = true
	constructor(props: FFmpegInstanceProps) {
		this.containerIndex = props.containerIndex
	}

	initFFmpeg = (cmd: IFactory) => {
		// console.log('Transcoder Child', this.child)
		const command = `${__dirname}/../ffmpegruntime`

		let args =
			' -hide_banner ' +
			insertArgs(cmd.globalInput.param, cmd.globalInput.paramArgs) +
			insertArgs(cmd.globalOutput.param, cmd.globalOutput.paramArgs) +
			insertArgs(cmd.input.param, cmd.input.paramArgs) +
			insertArgs(cmd.filter.param, cmd.filter.paramArgs) +
			insertArgs(cmd.output.param, cmd.output.paramArgs)

		this.keepInstanceRunning = true

		if (this.childProcess) {
			console.log('Transcoder already running')
			this.childProcess.kill()
		}
		this.childProcess = this.spawnChild(command, [args])
		console.log('FFmpeg is starting', this.childProcess.spawnargs)

		this.childProcess.stderr?.on('data', (data) => {
			console.log(`Encoder ${cmd.containerName} :`, data.toString('utf8'))
		})

		this.childProcess
			.on('exit', (response: number) => {
				console.log(`Encoder ${cmd.containerName} Exited :`, response)
			})
			.on('close', (code: number, signal: string) => {
				console.log('Encoder index :', this.containerIndex, 'Have been closed with code :', code, 'Signal :', signal)
				if (this.keepInstanceRunning) {
					this.destroySpawn(this.containerIndex)
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

	spawnChild = (command: string, args: string[]): ChildProcessWithoutNullStreams => {
		console.log('Spawning Encode index:', this.containerIndex)
		updateEncoderState(this.containerIndex, true, true)
		return spawn(command, args, { shell: true })
	}

	destroySpawn = (containerIndex: number) => {
		console.log(`Stopping Encoder Index : ${containerIndex}`)
		if (this.timeOutInstance) {
			clearTimeout(this.timeOutInstance)
		}
		this.childProcess?.kill()
		this.childProcess?.unref()
		updateEncoderState(this.containerIndex, false, false)
	}

	stopInstance = (containerIndex: number) => {
		this.keepInstanceRunning = false
		this.destroySpawn(containerIndex)
	}
}
