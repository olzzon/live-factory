import express from 'express'
import path from 'path'
import { StartFFPlay } from './testFFPlay'

const expressApp: express.Application = express()
import http  from 'http'
const httpServer = http.createServer(expressApp);
import { Server } from 'socket.io'
const socketIO = new Server(httpServer)

const PORT = 1406
expressApp.use('/', express.static(path.resolve('dist')))

expressApp.get('/', (req: any, res: any) => {
	console.log('Request :', req)
	res.sendFile(path.resolve('dist/index.html'))
})

socketIO.on('connection', (client) => {
    console.log('a user connected');
    client.on('start_ffmpeg', (ffmpegArgs: string)=> {
        const ffPlayInstance = new StartFFPlay()
        ffPlayInstance.initFFmplay(ffmpegArgs)
    })
  });

httpServer.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`)
})
