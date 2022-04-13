import express from 'express'
import path from 'path'
import * as IO  from '../../interface/SocketIOContants'

import { FFmepgInstance } from '../ffmpeg/FFmpegInstance'
import { IFactory } from '../../interface/GenericInterfaces'

import io from 'socket.io-client'
let ip = '0.0.0.0'
let port = 1406
const socketClient = io(`http://${ip}:${port}`)

let ffmpegFactories: IFactory[] = []
let factoryInstances: FFmepgInstance[] = []

const updateFactory = (index: number, cmd: IFactory) => {
	ffmpegFactories[index] = cmd
}

export const updateEncoderState = (index: number, activated: boolean, running: boolean) => {
	ffmpegFactories[index].activated = activated
	ffmpegFactories[index].running = running
	console.log('Emitting Encoder update state. Index :', index, 'activated :', activated, 'running :', running)
	socketClient.emit(IO.UPDATE_ENCODER_STATE, index, activated, running  )
}

export const initializeNodeServer = () => {
	socketClient.on('connection', (client) => {
		client.on(IO.START_ENCODER, (id: number, cmd: IFactory) => {
			updateFactory(id, cmd)
			if (!factoryInstances[id]) {
				factoryInstances[id] = new FFmepgInstance({containerIndex: id})
			}
			factoryInstances[id].initFFmpeg(cmd)
		})
		.on(IO.STOP_ENCODER, (id: number) => {
			factoryInstances[id]?.stopInstance(id)
		})
    })
}
