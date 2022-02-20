// const exec = require('child_process').exec
import { exec } from 'child_process'

export class FFmepgInstance {
	constructor() {
	}

	initFFmpeg = (globalArgs: string, inputArgs: string, filterArgs: string, outputArgs: string) => {
		// ffmpegArgs = '-f lavfi -i smptehdbars=1920x1080'

		const child = exec(`ffmpeg ${globalArgs} ${inputArgs} ${filterArgs} ${outputArgs}`, function (error: any, stdout: any, stderr: any) {
			if (error != null) {
				console.log(stderr)
				// error handling & exit
			} else {
				console.log(stdout)
			}
		})
		console.log('FFmpeg IS STARTING', child.spawnargs)

		setTimeout(() => {
			child.kill('SIGINT')
		}, 50000)
	}
}
