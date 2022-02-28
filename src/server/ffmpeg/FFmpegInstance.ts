// const exec = require('child_process').exec
import { exec } from 'child_process'
import { IFFmpegCommand } from '../../interface/GenericInterfaces'

export class FFmepgInstance {
	constructor() {}

	initFFmpeg = (cmd: IFFmpegCommand) => {
		console.log(cmd.input.type)
/*		for (let i = 0; i < 1; i++) {
			//const child = exec(`ffmpeg  -re -stream_loop -1 -i RedBull.ts  -c:v h264_videotoolbox -b:v 50000k -preset normal -pix_fmt yuv420p10le -strict -2 -y -f mpegts udp://localhost:${1234 + i}?pkt_size=1316 `, function (error: any, stdout: any, stderr: any) {
			// -stream_loop -1 -hwaccel videotoolbox -hwaccel_output_format videotoolbox -re -vsync 0 -i /Users/olzzon/coding/live-factory/media/RedBull.ts -f libndi_newtek -pix_fmt uyvy422 OUTPUT
			let child = exec(
				`${__dirname}/../ffmpegruntime -stream_loop -1 -hwaccel videotoolbox -hwaccel_output_format videotoolbox -re -vsync 0 -i /Users/olzzon/coding/live-factory/media/RedBull.ts -f libndi_newtek -pix_fmt uyvy422 OUTPUT${1234 + i} `,
				function (error: any, stdout: any, stderr: any) {
					//const child = exec(`ffmpeg -stream_loop -1 -i song.mov -c:v h264_videotoolbox -b:v 20000k -profile 4 -allow_sw false -c:a copy -f mpegts udp://localhost:${1234 + i}?pkt_size=1316 `, function (error: any, stdout: any, stderr: any) {
					if (error != null) {
						console.log(stderr)
						// error handling & exit
					} else {
						console.log(stdout)
					}
				}
			)
			console.log('FFmpeg IS Running', child.spawnargs)
		}
		*/
		
		const child = exec(`${__dirname}/../ffmpegruntime ${cmd.global.otherParams[0]} ${cmd.input.otherParams[0]} ${cmd.filter.otherParams[0]} ${cmd.outputCodec.otherParams[0]} ${cmd.outputType.otherParams[0]} ${cmd.outputContainer.otherParams[0]} `, function (error: any, stdout: any, stderr: any) {
			if (error != null) {
				console.log(stderr)
				// error handling & exit
			} else {
				console.log(stdout)
			}
		})
		console.log('FFmpeg IS Running', child.spawnargs)
	}
}
