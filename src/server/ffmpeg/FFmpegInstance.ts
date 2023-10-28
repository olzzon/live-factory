// const exec = require('child_process').exec
import { ChildProcess, ChildProcessWithoutNullStreams, spawn } from 'child_process'
import { IFactory } from '../../interface/GenericInterfaces'
import insertArgs from '../utils/insertArgs'
import { addToLog, updateEncoderState } from '../webserver/webserver'
import { ISettings } from '../../interface/SettingsInterface'

// Node Modules:
const path = require('path')
const homeDir = require('os').homedir()

interface FFmpegInstanceProps {
	containerIndex: number
	settings: ISettings
}

export class FFmepgInstance {
	childProcess: ChildProcess | null = null
	containerIndex = 0
	settings: ISettings
	timeOutInstance: NodeJS.Timeout | null = null
	keepInstanceRunning = true
	constructor(props: FFmpegInstanceProps) {
		this.containerIndex = props.containerIndex
		this.settings = props.settings
	}

	initFFmpeg = (cmd: IFactory) => {
		const command = this.settings.nodeList[cmd.nodeIndex].path || path.resolve(homeDir, 'live-factory', 'ffmpegruntime')

		let args =
			' -hide_banner ' +
			insertArgs(cmd.globalInput.param, cmd.globalInput.paramArgs) +
			insertArgs(cmd.globalOutput.param, cmd.globalOutput.paramArgs) +
			insertArgs(cmd.input.param, cmd.input.paramArgs) +
			insertArgs(cmd.filter.param, cmd.filter.paramArgs) +
			insertArgs(cmd.audioFilter.param, cmd.audioFilter.paramArgs) +
			insertArgs(cmd.output.param, cmd.output.paramArgs)

		this.keepInstanceRunning = true

		if (this.childProcess) {
			console.log('Transcoder already running')
			this.childProcess.stdin?.write('q')
		}
		this.childProcess = this.runInstance(command, [args])
		console.log('FFmpeg is starting')
		console.debug('FFmpeg Spawn', this.childProcess.spawnargs)

		this.childProcess.stderr?.on('data', (data) => {
			let message = data.toString('utf8')
			addToLog(this.containerIndex, message)
			if (message.includes('Decklink input buffer overrun')) {
				// Restart service if Decklink buffer is overrun:
				if (this.childProcess) {
					this.childProcess?.stdin?.write('q')
				}
			}
		})

		this.childProcess
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
		this.childProcess?.stdin?.write('q')
		this.childProcess?.unref()
		updateEncoderState(this.containerIndex, false, false)
	}

	stopInstance = (containerIndex: number) => {
		this.keepInstanceRunning = false
		this.killInstance(containerIndex)
	}
}
