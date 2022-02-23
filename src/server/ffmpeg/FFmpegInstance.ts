// const exec = require('child_process').exec
import { exec } from 'child_process'
import { IFFmpegCommand } from '../../interface/GenericInterfaces'

export class FFmepgInstance {
	constructor() {
	}

	initFFmpeg = (cmd: IFFmpegCommand) => {
		// ffmpegArgs = '-f lavfi -i smptehdbars=1920x1080'

		const child = exec(`ffmpeg ${cmd.global.otherParams[0]} ${cmd.input.otherParams[0]} ${cmd.filter.otherParams[0]} ${cmd.output.otherParams[0]}`, function (error: any, stdout: any, stderr: any) {
			if (error != null) {
				console.log(stderr)
				// error handling & exit
			} else {
				console.log(stdout)
			}
		})
		console.log('FFmpeg IS STARTING', child.spawnargs)
	}
}
