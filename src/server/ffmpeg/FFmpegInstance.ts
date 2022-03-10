// const exec = require('child_process').exec
import { ChildProcess, ChildProcessWithoutNullStreams, spawn } from 'child_process'
import { IFactory } from '../../interface/GenericInterfaces'
import { updateEncoderState } from '../webserver/webserver'

interface FFmpegInstanceProps {
	containerIndex: number
}

export class FFmepgInstance {
	child: ChildProcess | null = null
	containerIndex = 0
	constructor(props: FFmpegInstanceProps) {
		this.containerIndex = props.containerIndex
	}

	initFFmpeg = (cmd: IFactory) => {
		// console.log('Transcoder Child', this.child)
		const command = `${__dirname}/../ffmpegruntime`
		const args = [
			`${cmd.global.params.join('')} ${cmd.input.params.join('')} ${cmd.filter.params.join(
				''
			)} ${cmd.output.params.join('')}`,
		]

		if (this.child && this.child.pid) {
			console.log('Transcoder already running')
			this.child.kill()
		}
		this.child = this.spawnChild(command, args)
		console.log('FFmpeg IS Running', this.child.spawnargs)

		this.child.stderr?.on('data', (data) => {
			console.log(`Encoder ${cmd.containerName} :`, data.toString('utf8'))
		})

		this.child
			.on('exit', (response: number) => {
				console.log(`Encoder ${cmd.containerName} Exited :`, response)
			})
			.on('close', (code: number, signal: string) => {
				console.log('Encoder index :', this.containerIndex, 'Have been closed with code :', code, 'Signal :', signal)
				if (signal === 'SIGSEGV' || code === 1) {
					console.warn('Encoder stopped with SIGSEV, will try to restart')
					updateEncoderState(this.containerIndex, true, false)
					this.destroySpawn()
					setTimeout(() => {
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

	destroySpawn = () => {
		this.child?.kill()
		this.child?.unref()
	}

	killFFmpeg = (containerIndex: number) => {
		console.log(`Stopping Encoder Index : ${containerIndex}`)
		this.destroySpawn()
		updateEncoderState(this.containerIndex, false, false)
	}
}
