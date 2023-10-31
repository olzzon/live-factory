import { create } from 'domain'
import {
	IDeviceList,
	Pipeline,
	INPUT_TYPES,
	OUTPUT_AUDIO_ENCODER,
	OUTPUT_ENCODER,
	OUTPUT_TYPES,
} from '../GenericInterfaces'
import * as CONTAINER_ACTIONS from './containerActions'

export interface IFFmpegReducer {
	rerender: boolean
	deviceTypes: IDeviceList[]
	pipeline: Pipeline[]
}

const createNewUUID = () => {
	return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

const defaultFfmpegContainerReducerState = (): IFFmpegReducer => {
	return {
		rerender: false,
		deviceTypes: [],
		pipeline: [
			{
				containerName: 'NEW PIPE',
				nodeIndex: 0,
				uuid: createNewUUID(),
				activated: false,
				running: false,
				globalInput: { param: [], paramArgs: [] },
				globalOutput: { param: [], paramArgs: [] },
				input: { type: INPUT_TYPES.COLORBAR, param: [], paramArgs: [] },
				filter: { type: OUTPUT_ENCODER.COPY, param: ['-v:c copy'], paramArgs: [''] },
				audioFilter: { type: OUTPUT_AUDIO_ENCODER.COPY, param: ['-a:c copy'], paramArgs: [''] },
				output: { type: OUTPUT_TYPES.NDI, param: [], paramArgs: [] },
				log: ['log is empty'],
			},
		],
	}
}

export const ffmpeg = (state = [defaultFfmpegContainerReducerState()], action: any): Array<IFFmpegReducer> => {
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
		case CONTAINER_ACTIONS.SET_GLOBAL_IN_PARAM_ARR:
			nextState[0].pipeline[action.pipelineId].globalInput.param = action.paramArr
			return nextState
		case CONTAINER_ACTIONS.SET_GLOBAL_IN_PARAMS:
			nextState[0].pipeline[action.pipelineId].globalInput.paramArgs[action.paramIndex] = action.param
			return nextState
		case CONTAINER_ACTIONS.CLEAR_GLOBAL_IN_PARAMS:
			nextState[0].pipeline[action.pipelineId].globalInput.paramArgs = ['']
			return nextState
		case CONTAINER_ACTIONS.SET_GLOBAL_OUT_PARAM_ARR:
			nextState[0].pipeline[action.pipelineId].globalOutput.param = action.paramArr
			return nextState
		case CONTAINER_ACTIONS.SET_GLOBAL_OUT_PARAMS:
			nextState[0].pipeline[action.pipelineId].globalOutput.paramArgs[action.paramIndex] = action.param
			return nextState
		case CONTAINER_ACTIONS.CLEAR_GLOBAL_OUT_PARAMS:
			nextState[0].pipeline[action.pipelineId].globalOutput.paramArgs = ['']
			return nextState
		case CONTAINER_ACTIONS.SET_INPUT_PARAM_ARR:
			nextState[0].pipeline[action.pipelineId].input.param = action.paramArr
			return nextState
		case CONTAINER_ACTIONS.SET_INPUT_PARAMS:
			nextState[0].pipeline[action.pipelineId].input.paramArgs[action.paramIndex] = action.param
			return nextState
		case CONTAINER_ACTIONS.CLEAR_INPUT_PARAMS:
			nextState[0].pipeline[action.pipelineId].input.paramArgs = ['']
			return nextState
		case CONTAINER_ACTIONS.SET_FILTER_PARAM_ARR:
			nextState[0].pipeline[action.pipelineId].filter.param = action.paramArr
			return nextState
		case CONTAINER_ACTIONS.SET_FILTER_PARAMS:
			nextState[0].pipeline[action.pipelineId].filter.paramArgs[action.paramIndex] = action.param
			return nextState
		case CONTAINER_ACTIONS.CLEAR_FILTER_PARAMS:
			nextState[0].pipeline[action.pipelineId].filter.paramArgs = ['']
			return nextState
		case CONTAINER_ACTIONS.SET_FILTER_AUDIO_PARAM_ARR:
			nextState[0].pipeline[action.pipelineId].audioFilter.param = action.paramArr
			return nextState
		case CONTAINER_ACTIONS.SET_FILTER_AUDIO_PARAMS:
			nextState[0].pipeline[action.pipelineId].audioFilter.paramArgs[action.paramIndex] = action.param
			return nextState
		case CONTAINER_ACTIONS.CLEAR_FILTER_AUDIO_PARAMS:
			nextState[0].pipeline[action.pipelineId].audioFilter.paramArgs = ['']
			return nextState
		case CONTAINER_ACTIONS.SET_OUTPUT_PARAM_ARR:
			nextState[0].pipeline[action.pipelineId].output.param = action.paramArr
			return nextState
		case CONTAINER_ACTIONS.SET_OUTPUT_PARAMS:
			nextState[0].pipeline[action.pipelineId].output.paramArgs[action.paramIndex] = action.param
			return nextState
		case CONTAINER_ACTIONS.CLEAR_OUTPUT_PARAMS:
			nextState[0].pipeline[action.pipelineId].output.paramArgs = ['']
			return nextState
		default:
			return nextState
	}
}
