import {
	DeviceList,
	Pipeline,
	INPUT_PARAMS,
	OUTPUT_AUDIO_ENCODER,
	OUTPUT_ENCODER,
	OUTPUT_PARAMS,
} from '../GenericInterfaces'
import * as CONTAINER_ACTIONS from './containerActions'
import { GPU_TYPES } from '../SettingsInterface'

export interface FFmpegReducer {
	rerender: boolean
	deviceTypes: DeviceList[]
	pipeline: Pipeline[]
}

const generateUUID = () => {
	return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

const defaultFfmpegContainerReducerState = (): FFmpegReducer => {
	return {
		rerender: false,
		deviceTypes: [],
		pipeline: [
			{
				containerName: 'NEW PIPE',
				nodeIndex: 0,
				uuid: generateUUID(),
				activated: false,
				running: false,
				dockerInputPorts: [],
				dockerOutputPorts: [],
				globalInput: { param: [], valueArgs: [] },
				globalOutput: { param: [], valueArgs: [] },
				input: { type: INPUT_PARAMS.COLORBAR, param: [], valueArgs: [] },
				filter: { type: OUTPUT_ENCODER.COPY, param: ['-v:c', 'copy'], valueArgs: [''] },
				audioFilter: { type: OUTPUT_AUDIO_ENCODER.COPY, param: ['-a:c', 'copy'], valueArgs: [''] },
				output: { type: OUTPUT_PARAMS.NDI, param: [], valueArgs: [] },
				log: ['log is empty'],
				hwaccell: GPU_TYPES.NONE
			},
		],
	}
}

export const ffmpeg = (state = [defaultFfmpegContainerReducerState()], action: any): Array<FFmpegReducer> => {
	let nextState = [...state]

	switch (action.type) {
		case CONTAINER_ACTIONS.ADD_FACTORY:
			let newContainer = defaultFfmpegContainerReducerState().pipeline[0]
			nextState[0].pipeline = [...nextState[0].pipeline, newContainer]
			return nextState
		case CONTAINER_ACTIONS.DUPLICATE_FACTORY:
			newContainer = JSON.parse(JSON.stringify(nextState[0].pipeline[action.pipelineId]))
			newContainer.containerName = newContainer.containerName + ' COPY'
			newContainer.activated = false
			newContainer.log = []
			newContainer.running = false
			nextState[0].pipeline = [...nextState[0].pipeline, newContainer]
			return nextState
		case CONTAINER_ACTIONS.UPDATE_FULL_STORE:
			nextState[0].pipeline = []
			action.fullStore.forEach((pipeline: Pipeline, index: number) => {
				nextState[0].pipeline.push(pipeline !== null ? pipeline : defaultFfmpegContainerReducerState().pipeline[0])
			})
			nextState[0].rerender = !nextState[0].rerender
			return nextState
		case CONTAINER_ACTIONS.LOG_PUSH:
			let log = [...(nextState[0].pipeline[action.pipelineId].log || [])]
			if (log.length > 20) {
				log.shift()
			}
			log.push(action.logLine)
			nextState[0].pipeline[action.pipelineId].log = log
			return nextState
		case CONTAINER_ACTIONS.UPDATE_DEVICES_LIST:
			nextState[0].deviceTypes = action.deviceTypes
			return nextState
		case CONTAINER_ACTIONS.SET_CONTAINER_NAME:
			nextState[0].pipeline[action.pipelineId].containerName = action.containerName
			nextState[0].rerender = !nextState[0].rerender
			return nextState
		case CONTAINER_ACTIONS.SET_NODE_INDEX:
			nextState[0].pipeline[action.pipelineId].nodeIndex = action.nodeIndex
			nextState[0].rerender = !nextState[0].rerender
			return nextState
		case CONTAINER_ACTIONS.SET_CONTAINER_STATE:
			nextState[0].pipeline[action.pipelineId].activated = action.activated
			nextState[0].pipeline[action.pipelineId].running = action.running
			nextState[0].rerender = !nextState[0].rerender
			return nextState
		case CONTAINER_ACTIONS.SET_GPU_TYPE:
			nextState[0].pipeline[action.pipelineId].hwaccell = action.gpuType
			return nextState
		case CONTAINER_ACTIONS.SET_INPUT_TYPE:
			nextState[0].pipeline[action.pipelineId].input.type = action.inputType
			return nextState
		case CONTAINER_ACTIONS.SET_OUTPUT_TYPE:
			nextState[0].pipeline[action.pipelineId].output.type = action.outputType
			return nextState
		case CONTAINER_ACTIONS.SET_FILTER_TYPE:
			nextState[0].pipeline[action.pipelineId].filter.type = action.filterType
			return nextState
		case CONTAINER_ACTIONS.SET_FILTER_AUDIO_TYPE:
			nextState[0].pipeline[action.pipelineId].audioFilter.type = action.filterType
			return nextState
		case CONTAINER_ACTIONS.SET_DOCKER_INPUT_PORTS:
			nextState[0].pipeline[action.pipelineId].dockerInputPorts = action.dockerPorts
			return nextState
		case CONTAINER_ACTIONS.SET_DOCKER_OUTPUT_PORTS:
			nextState[0].pipeline[action.pipelineId].dockerOutputPorts = action.dockerPorts
			return nextState
		case CONTAINER_ACTIONS.SET_GLOBAL_IN_PARAM_ARR:
			nextState[0].pipeline[action.pipelineId].globalInput.param = action.paramArr
			return nextState
		case CONTAINER_ACTIONS.SET_GLOBAL_IN_VALUE:
			nextState[0].pipeline[action.pipelineId].globalInput.valueArgs[action.paramIndex] = action.param
			return nextState
		case CONTAINER_ACTIONS.CLEAR_GLOBAL_IN_VALUE:
			nextState[0].pipeline[action.pipelineId].globalInput.valueArgs = ['']
			return nextState
		case CONTAINER_ACTIONS.SET_GLOBAL_OUT_PARAM_ARR:
			nextState[0].pipeline[action.pipelineId].globalOutput.param = action.paramArr
			return nextState
		case CONTAINER_ACTIONS.SET_GLOBAL_OUT_VALUE:
			nextState[0].pipeline[action.pipelineId].globalOutput.valueArgs[action.paramIndex] = action.param
			return nextState
		case CONTAINER_ACTIONS.CLEAR_GLOBAL_OUT_VALUE:
			nextState[0].pipeline[action.pipelineId].globalOutput.valueArgs = ['']
			return nextState
		case CONTAINER_ACTIONS.SET_INPUT_PARAM_ARR:
			nextState[0].pipeline[action.pipelineId].input.param = action.paramArr
			return nextState
		case CONTAINER_ACTIONS.SET_INPUT_VALUE:
			nextState[0].pipeline[action.pipelineId].input.valueArgs[action.paramIndex] = action.param
			return nextState
		case CONTAINER_ACTIONS.CLEAR_INPUT_VALUE:
			nextState[0].pipeline[action.pipelineId].input.valueArgs = ['']
			return nextState
		case CONTAINER_ACTIONS.SET_FILTER_PARAM_ARR:
			nextState[0].pipeline[action.pipelineId].filter.param = action.paramArr
			return nextState
		case CONTAINER_ACTIONS.SET_FILTER_VALUE:
			nextState[0].pipeline[action.pipelineId].filter.valueArgs[action.paramIndex] = action.param
			return nextState
		case CONTAINER_ACTIONS.CLEAR_FILTER_VALUE:
			nextState[0].pipeline[action.pipelineId].filter.valueArgs = ['']
			return nextState
		case CONTAINER_ACTIONS.SET_FILTER_AUDIO_PARAM_ARR:
			nextState[0].pipeline[action.pipelineId].audioFilter.param = action.paramArr
			return nextState
		case CONTAINER_ACTIONS.SET_FILTER_AUDIO_VALUE:
			nextState[0].pipeline[action.pipelineId].audioFilter.valueArgs[action.paramIndex] = action.param
			return nextState
		case CONTAINER_ACTIONS.CLEAR_FILTER_AUDIO_VALUE:
			nextState[0].pipeline[action.pipelineId].audioFilter.valueArgs = ['']
			return nextState
		case CONTAINER_ACTIONS.SET_OUTPUT_PARAM_ARR:
			nextState[0].pipeline[action.pipelineId].output.param = action.paramArr
			return nextState
		case CONTAINER_ACTIONS.SET_OUTPUT_VALUE:
			nextState[0].pipeline[action.pipelineId].output.valueArgs[action.paramIndex] = action.param
			return nextState
		case CONTAINER_ACTIONS.CLEAR_OUTPUT_VALUE:
			nextState[0].pipeline[action.pipelineId].output.valueArgs = ['']
			return nextState
		default:
			return nextState
	}
}
