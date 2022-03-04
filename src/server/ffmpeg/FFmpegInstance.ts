// const exec = require('child_process').exec
import { ChildProcess, spawn } from 'child_process'
import { IFactory } from '../../interface/redux/containersReducer'

export class FFmepgInstance {
	child: ChildProcess | null = null
	constructor() {}

	initFFmpeg = (cmd: IFactory) => {
		// console.log('Transcoder Child', this.child)
		const command = `${__dirname}/../ffmpegruntime`
		const args = [
			`${cmd.global.params.join('')} ${cmd.input.params.join('')} ${cmd.filter.params.join(
				''
			)} ${cmd.output.params.join('')}`,
		]

		console.log('Command :', command)
		console.log('Args :', command)

		if (this.child && this.child.pid) {
			console.log('Transcoder already running')
			this.child.kill()
		}
		this.child = spawn(command, args, {shell: true})
		console.log('FFmpeg IS Running', this.child.spawnargs)

		this.child.stderr?.on('data', (data) => {
			console.log('Trancoder Response: ', data.toString('utf8'))
		})

		this.child
			.on('exit', (response: number) => {
				console.log('FFmpeg Exited :', response)
			})
			.on('close', (response: number) => {
				console.log('FFmpeg Closed :', response)
			})
			.on('error', (response: Error) => {
				console.log('FFmpeg Error :', response)
			})
			.on('disconnect', (response: any) => {
				console.log('FFmpeg Disconnected :', response)
			})
	}
}
