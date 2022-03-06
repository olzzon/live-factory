// const exec = require('child_process').exec
import { ChildProcess, spawn } from 'child_process'
import { IFactory } from '../../interface/redux/containersReducer'
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
		this.child = spawn(command, args, {shell: true})
		console.log('FFmpeg IS Running', this.child.spawnargs)
		updateEncoderState(this.containerIndex, true, true)

		this.child.stdout?.on('data', (data) => {
			console.log(`Encoder ${cmd.containerName} :`, data.toString('utf8'))
		})

		this.child
			.on('exit', (response: number) => {
				console.log(`Encoder ${cmd.containerName} Exit :`, response)
			})
			.on('close', (response: number) => {
				updateEncoderState(this.containerIndex, true, false)
				console.log(`Encoder ${cmd.containerName} Closed :`, response)
			})
			.on('error', (response: Error) => {
				console.log(`Encoder ${cmd.containerName} Error :`, response)
			})
			.on('disconnect', (response: any) => {
				console.log(`Encoder ${cmd.containerName} Disconnected :`, response)
			})
	}

	killFFmpeg = (containerIndex: number) => {
		console.log(`Stopping Encoder Index : ${containerIndex}`)
		this.child?.kill()
	}
}
