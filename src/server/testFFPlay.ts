// const exec = require('child_process').exec
import { exec } from 'child_process'

const ffmpegParams = '\
-f lavfi \
-i smptehdbars=1920x1080'

const child = exec(`ffplay ${ffmpegParams}`, function (error: any, stdout: any, stderr: any) {
	if (error != null) {
		console.log(stderr)
		// error handling & exit
	} else {
		console.log(stdout)
	}
})
console.log('FFPLAY 1 IS STARTING', child)

const child2 = exec(`ffplay ${ffmpegParams}`, function (error: any, stdout: any, stderr: any) {
	if (error != null) {
		console.log(stderr)
		// error handling & exit
	} else {
		console.log(stdout)
	}
})
console.log('FFPLAY 2 IS STARTING', child2)


setTimeout(() => {
    child.kill('SIGINT')
    child2.kill('SIGINT')

}, 5000)