// const exec = require('child_process').exec
import { exec } from 'child_process'

export class StartFFPlay {
	constructor() {
	}

	initFFmplay = (globalArgs: string, inputArgs: string) => {
		// ffmpegArgs = '-f lavfi -i smptehdbars=1920x1080'

		const child = exec(`ffplay ${globalArgs} ${inputArgs}`, function (error: any, stdout: any, stderr: any) {
			if (error != null) {
				console.log(stderr)
				// error handling & exit
			} else {
				console.log(stdout)
			}
		})
		console.log('FFPLAY IS STARTING', child.spawnargs)

		setTimeout(() => {
			child.kill('SIGINT')
		}, 5000)
	}
}
