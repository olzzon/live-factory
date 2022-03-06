import express from 'express'
import path from 'path'
import * as IO  from '../../interface/SocketIOContants'

const expressApp: express.Application = express()
import http from 'http'
const httpServer = http.createServer(expressApp)
import { Server } from 'socket.io'
import { FFmepgInstance } from '../ffmpeg/FFmpegInstance'
import { IFactory } from '../../interface/redux/containersReducer'
const socketIO = new Server(httpServer)

const PORT = 1406
let ffmpegFactories: IFactory[] = []

const updateFactory = (index: number, cmd: IFactory) => {
	const instance = ffmpegFactories[index]?.ffmpegInstance
	ffmpegFactories[index] = cmd
	ffmpegFactories[index].ffmpegInstance = instance
}

export const updateEncoderState = (index: number, activated: boolean, running: boolean) => {
	console.log('Emitting Encoder update state. Index :', index, 'activated :', activated, 'running :', running)
	socketIO.emit(IO.UPDATE_ENCODER_STATE, index, activated, running  )
}

export const initializeWebServer = () => {
	expressApp.use('/', express.static(path.resolve('dist')))

	expressApp.get('/', (req: any, res: any) => {
		console.log('Request :', req)
		res.sendFile(path.resolve('dist/index.html'))
	})

	socketIO.on('connection', (client) => {
		console.log('a user connected')
		client.on(IO.START_ENCODER, (id: number, cmd: IFactory) => {
			updateFactory(id, cmd)
			if (!ffmpegFactories[id]?.ffmpegInstance) {
				ffmpegFactories[id].ffmpegInstance = new FFmepgInstance({containerIndex: id})
			}
			ffmpegFactories[id].ffmpegInstance?.initFFmpeg(cmd)
		})
		.on(IO.STOP_ENCODER, (id: number) => {
			ffmpegFactories[id]?.ffmpegInstance?.killFFmpeg(id)
		})
    })

	httpServer.listen(PORT, () => {
		console.log(`Server is listening on port ${PORT}`)
	})
}
