// const exec = require('child_process').exec
// import { exec } from 'child_process'

import { IFactory } from "../../interface/redux/containersReducer"


export class StartFFPlay {
	constructor() {
	}

	initFFmplay = (cmd: IFactory) => {
		console.log(cmd)
		// ffmpegArgs = '-f lavfi -i smptehdbars=1920x1080'
/*		console.log('Command :', `ffplay ${cmd.global.otherParams[0]} ${cmd.input.otherParams[0]}`)

		const child = exec(`ffplay ${cmd.global.otherParams[0]} ${cmd.input.otherParams[0]}`, function (error: any, stdout: any, stderr: any) {
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
		*/
	}
}
