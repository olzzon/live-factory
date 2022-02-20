import express from 'express'
import path from 'path'
import { StartFFPlay } from '../ffmpeg/testFFPlay'

const expressApp: express.Application = express()
import http from 'http'
const httpServer = http.createServer(expressApp)
import { Server } from 'socket.io'
import { FFmepgInstance } from '../ffmpeg/FFmpegInstance'
const socketIO = new Server(httpServer)

const PORT = 1406

export const initializeWebServer = () => {
	expressApp.use('/', express.static(path.resolve('dist')))

	expressApp.get('/', (req: any, res: any) => {
		console.log('Request :', req)
		res.sendFile(path.resolve('dist/index.html'))
	})

	socketIO.on('connection', (client) => {
		console.log('a user connected')
		client.on('start_ffplay', (globalArgs: string, inputArgs: string) => {
			const ffPlayInstance = new StartFFPlay()
			ffPlayInstance.initFFmplay(globalArgs, inputArgs)
		})
		client.on('start_ffmpeg', (globalArgs: string, inputArgs: string, filterArgs: string,  outputArgs: string) => {
			const ffmpegInstance = new FFmepgInstance()
			ffmpegInstance.initFFmpeg(globalArgs, inputArgs, filterArgs, outputArgs)
		})
    })

	httpServer.listen(PORT, () => {
		console.log(`Server is listening on port ${PORT}`)
	})
}
