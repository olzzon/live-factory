import express from 'express'
import path from 'path'
import { StartFFPlay } from '../ffmpeg/testFFPlay'
import * as IO  from '../../interface/SocketIOContants'

const expressApp: express.Application = express()
import http from 'http'
const httpServer = http.createServer(expressApp)
import { Server } from 'socket.io'
import { FFmepgInstance } from '../ffmpeg/FFmpegInstance'
import { IFactory } from '../../interface/redux/containersReducer'
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
		client.on(IO.START_FFPLAY, (cmd: IFactory) => {
			console.log('Parsed data :', cmd)
			const ffPlayInstance = new StartFFPlay()
			ffPlayInstance.initFFmplay(cmd)
		})
		client.on(IO.START_FFMPEG, (cmd: IFactory) => {
			const ffmpegInstance = new FFmepgInstance()
			ffmpegInstance.initFFmpeg(cmd)
		})
    })

	httpServer.listen(PORT, () => {
		console.log(`Server is listening on port ${PORT}`)
	})
}
