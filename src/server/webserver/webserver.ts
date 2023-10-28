import express from 'express'
import path from 'path'
import * as IO from '../../interface/SocketIOContants'

const expressApp: express.Application = express()
import http from 'http'
const httpServer = http.createServer(expressApp)

import { Server } from 'socket.io'
import { FFmepgInstance } from '../ffmpeg/FFmpegInstance'
import { DEVICE_TYPES, IDeviceList, IFactory } from '../../interface/GenericInterfaces'
import { loadFactories, loadSettings, saveFactoriesList } from '../utils/storage'
import { discoverNdiSources } from '../utils/discoverNdiSources'
import { discoverDecklinkSources } from '../utils/discoverDecklinkSources'
import { discoverDecklinkOutputs } from '../utils/discoverDecklinkOutputs'
import { findGpu } from '../utils/findGpu'
import { NODE_TYPES, ISettings } from '../../interface/SettingsInterface'
import { DockerInstance } from '../ffmpeg/DockerInstance'
const socketIO = new Server(httpServer)

const PORT = 1406
let ffmpegFactories: IFactory[] = []
let factoryInstances: Array<FFmepgInstance | DockerInstance> = []
let devices: IDeviceList[] = []
let settings: ISettings = loadSettings()

devices[DEVICE_TYPES.NDI] = { type: DEVICE_TYPES.NDI, devices: ['Finding Sources...'] }
devices[DEVICE_TYPES.DECKLINK_INPUT] = { type: DEVICE_TYPES.DECKLINK_INPUT, devices: ['Finding Inputs...'] }
devices[DEVICE_TYPES.DECKLINK_OUTPUT] = { type: DEVICE_TYPES.DECKLINK_OUTPUT, devices: ['Finding Outputs...'] }

const updateFactory = (index: number, cmd: IFactory) => {
	ffmpegFactories[index] = cmd
	saveFactoriesList(ffmpegFactories)
}

const deleteFactory = (index: number) => {
	factoryInstances[index]?.stopInstance(index)
	factoryInstances.splice(index, 1)
	ffmpegFactories.splice(index, 1)
	saveFactoriesList(ffmpegFactories)
	updateClients()
}

const updateClients = () => {
	socketIO.emit(IO.FULL_STORE, ffmpegFactories)
	socketIO.emit(IO.DEVICES_LIST, devices)
	socketIO.emit(IO.SETTINGS, settings)
}

const subscribeDevicesList = () => {
	//Only once:
	devices[DEVICE_TYPES.GPU_TYPE] = { type: DEVICE_TYPES.GPU_TYPE, devices: [findGpu()] }

	//Dynamically updated:
	setInterval(() => {
		devices[DEVICE_TYPES.NDI] = { type: DEVICE_TYPES.NDI, devices: discoverNdiSources() }
		devices[DEVICE_TYPES.DECKLINK_INPUT] = { type: DEVICE_TYPES.DECKLINK_INPUT, devices: discoverDecklinkSources() }
		devices[DEVICE_TYPES.DECKLINK_OUTPUT] = { type: DEVICE_TYPES.DECKLINK_OUTPUT, devices: discoverDecklinkOutputs() }
		socketIO.emit(IO.DEVICES_LIST, devices)
	}, 9000)
}

export const updateEncoderState = (index: number, activated: boolean, running: boolean) => {
	if (ffmpegFactories[index]) {
		ffmpegFactories[index].activated = activated
		ffmpegFactories[index].running = running
		console.log('Emitting Encoder update state. Index :', index, 'activated :', activated, 'running :', running)
		socketIO.emit(IO.UPDATE_ENCODER_STATE, index, activated, running)
	}
}

export const addToLog = (factoryIndex: number, logLine: string) => {
	socketIO.emit(IO.LOG_PUSH, factoryIndex, logLine)
}

const initializeFactories = () => {
	ffmpegFactories = loadFactories()
	ffmpegFactories.forEach((factory) => {
		if (factory) {
			factory.activated = false
			factory.running = false
		}
	})
}

export const initializeWebServer = () => {
	initializeFactories()
	subscribeDevicesList()
	expressApp.use('/', express.static(path.resolve(__dirname, '../../client')))

	expressApp.get('/', (req: any, res: any) => {
		console.log('Request :', req)
		res.sendFile(path.resolve(__dirname, '../../client/index.html'))
	})

	socketIO.on('connection', (client) => {
		console.log('a user connected')
		updateClients()

		client
			.on(IO.START_ENCODER, (id: number, cmd: IFactory) => {
				updateFactory(id, cmd)
				if (!factoryInstances[id]) {
					if (settings.nodeList[cmd.nodeIndex].type === NODE_TYPES.FFMPEG) {
						factoryInstances[id] = new FFmepgInstance({ containerIndex: id })
					} else {
						factoryInstances[id] = new DockerInstance({ containerIndex: id })
					}
				}
				factoryInstances[id].initFFmpeg(cmd)
			})
			.on(IO.STOP_ENCODER, (id: number) => {
				factoryInstances[id]?.stopInstance(id)
			})
			.on(IO.UPDATE_FACTORY, (id: number, cmd: IFactory) => {
				updateFactory(id, cmd)
				updateClients()
			})
			.on(IO.DELETE_FACTORY, (id: number) => {
				deleteFactory(id)
			})
	})

	httpServer.listen(PORT, () => {
		console.log(`Server is listening on port ${PORT}`)
	})
}
