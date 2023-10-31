import express from 'express'
import path from 'path'
import * as IO from '../../interface/SocketIOContants'

const expressApp: express.Application = express()
import http from 'http'
const httpServer = http.createServer(expressApp)

import { Server } from 'socket.io'
import { FFmepgInstance } from '../ffmpeg/FFmpegInstance'
import { DEVICE_TYPES, IDeviceList, Pipeline } from '../../interface/GenericInterfaces'
import { loadPipelines, loadSettings, savePipelineList } from '../utils/storage'
import { discoverNdiSources } from '../utils/discoverNdiSources'
import { discoverDecklinkSources } from '../utils/discoverDecklinkSources'
import { discoverDecklinkOutputs } from '../utils/discoverDecklinkOutputs'
import { findGpu } from '../utils/findGpu'
import { NODE_TYPES, ISettings } from '../../interface/SettingsInterface'
import { DockerInstance } from '../ffmpeg/DockerInstance'
const socketIO = new Server(httpServer)

const PORT = 1406
let pipelines: Pipeline[] = []
let pipelineInstances: Array<FFmepgInstance | DockerInstance> = []
let devices: IDeviceList[] = []
let settings: ISettings = loadSettings()

devices[DEVICE_TYPES.NDI] = { type: DEVICE_TYPES.NDI, devices: ['Finding Sources...'] }
devices[DEVICE_TYPES.DECKLINK_INPUT] = { type: DEVICE_TYPES.DECKLINK_INPUT, devices: ['Finding Inputs...'] }
devices[DEVICE_TYPES.DECKLINK_OUTPUT] = { type: DEVICE_TYPES.DECKLINK_OUTPUT, devices: ['Finding Outputs...'] }

const updatePipeline = (index: number, cmd: Pipeline) => {
	pipelines[index] = cmd
	savePipelineList(pipelines)
}

const deletePipeline = (index: number) => {
	pipelineInstances[index]?.stopInstance(index)
	pipelineInstances.splice(index, 1)
	pipelines.splice(index, 1)
	savePipelineList(pipelines)
	updateClients()
}

const updateClients = () => {
	socketIO.emit(IO.FULL_STORE, pipelines)
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
	if (pipelines[index]) {
		pipelines[index].activated = activated
		pipelines[index].running = running
		console.log('Emitting Encoder update state. Index :', index, 'activated :', activated, 'running :', running)
		socketIO.emit(IO.UPDATE_ENCODER_STATE, index, activated, running)
	}
}

export const addToLog = (pipelineIndex: number, logLine: string) => {
	socketIO.emit(IO.LOG_PUSH, pipelineIndex, logLine)
}

const initializePipelines = () => {
	pipelines = loadPipelines()
	pipelines.forEach((pipeline) => {
		if (pipeline) {
			pipeline.activated = false
			pipeline.running = false
		}
	})
}

export const initializeWebServer = () => {
	initializePipelines()
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
			.on(IO.START_ENCODER, (id: number, cmd: Pipeline) => {
				updatePipeline(id, cmd)
				if (!pipelineInstances[id]) {
					if (settings.nodeList[cmd.nodeIndex].type === NODE_TYPES.FFMPEG) {
						pipelineInstances[id] = new FFmepgInstance({ containerIndex: id, settings: settings })
					} else {
						pipelineInstances[id] = new DockerInstance({ containerIndex: id, settings: settings })
					}
				}
				pipelineInstances[id].initFFmpeg(cmd)
			})
			.on(IO.STOP_ENCODER, (id: number) => {
				pipelineInstances[id]?.stopInstance(id)
			})
			.on(IO.UPDATE_PIPELINE, (id: number, cmd: Pipeline) => {
				updatePipeline(id, cmd)
				updateClients()
			})
			.on(IO.DELETE_PIPELINE, (id: number) => {
				deletePipeline(id)
			})
	})

	httpServer.listen(PORT, () => {
		console.log(`Server is listening on port ${PORT}`)
	})
}
