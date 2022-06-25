import { IDeviceList, IFactory, INPUT_TYPES, OUTPUT_ENCODER, OUTPUT_TYPES } from '../GenericInterfaces'
import * as CONTAINER_ACTIONS from './containerActions'

export interface IFFmpegReducer {
	rerender: boolean
	deviceTypes: IDeviceList[]
	factory: IFactory[]
}

const defaultFfmpegContainerReducerState = (): IFFmpegReducer => {
	return {
		rerender: false,
		deviceTypes: [],
		factory: [
			{
				containerName: 'NEW PIPE',
				activated: false,
				running: false,
				globalInput: { param: '', paramArgs: [] },
				globalOutput: { param: '', paramArgs: [] },
				input: { type: INPUT_TYPES.COLORBAR, param: '', paramArgs: [] },
				filter: { type: OUTPUT_ENCODER.NONE, param: '', paramArgs: [''] },
				output: { type: OUTPUT_TYPES.NDI, param: '', paramArgs: [] },
				log: ['log is empty'],
			},
		],
	}
}

export const ffmpeg = (state = [defaultFfmpegContainerReducerState()], action: any): Array<IFFmpegReducer> => {
	let nextState = [...state]

	switch (action.type) {
		case CONTAINER_ACTIONS.ADD_FACTORY:
			let newContainer = defaultFfmpegContainerReducerState().factory[0]
			nextState[0].factory = [...nextState[0].factory, newContainer]
			return nextState
		case CONTAINER_ACTIONS.DUPLICATE_FACTORY:
			newContainer = JSON.parse(JSON.stringify(nextState[0].factory[action.factoryId]))
			newContainer.containerName = newContainer.containerName + ' COPY'
			nextState[0].factory = [...nextState[0].factory, newContainer]
			return nextState
		case CONTAINER_ACTIONS.UPDATE_FULL_STORE:
			nextState[0].factory = []
			action.fullStore.forEach((factory: IFactory, index: number) => {
				nextState[0].factory.push(factory !== null ? factory : defaultFfmpegContainerReducerState().factory[0])
			})
			nextState[0].rerender = !nextState[0].rerender
			return nextState
		case CONTAINER_ACTIONS.LOG_PUSH:
			let log = [...(nextState[0].factory[action.factoryId].log || [])]
			if (log.length > 3) {
				log.shift()
			}
			log.push(action.logLine)
			nextState[0].factory[action.factoryId].log = log
			return nextState
		case CONTAINER_ACTIONS.UPDATE_DEVICES_LIST:
			nextState[0].deviceTypes = action.deviceTypes
			return nextState
		case CONTAINER_ACTIONS.SET_CONTAINER_NAME:
			nextState[0].factory[action.factoryId].containerName = action.containerName
			nextState[0].rerender = !nextState[0].rerender
			return nextState
		case CONTAINER_ACTIONS.SET_CONTAINER_STATE:
			nextState[0].factory[action.factoryId].activated = action.activated
			nextState[0].factory[action.factoryId].running = action.running
			nextState[0].rerender = !nextState[0].rerender
			return nextState
		case CONTAINER_ACTIONS.SET_INPUT_TYPE:
			nextState[0].factory[action.factoryId].input.type = action.inputType
			return nextState
		case CONTAINER_ACTIONS.SET_OUTPUT_TYPE:
			nextState[0].factory[action.factoryId].output.type = action.outputType
			return nextState
		case CONTAINER_ACTIONS.SET_FILTER_TYPE:
			nextState[0].factory[action.factoryId].filter.type = action.filterType
			return nextState
		case CONTAINER_ACTIONS.SET_GLOBAL_IN_PARAM_STRING:
			nextState[0].factory[action.factoryId].globalInput.param = action.paramString
			return nextState
		case CONTAINER_ACTIONS.SET_GLOBAL_IN_PARAMS:
			nextState[0].factory[action.factoryId].globalInput.paramArgs[action.paramIndex] = action.param
			return nextState
		case CONTAINER_ACTIONS.CLEAR_GLOBAL_IN_PARAMS:
			nextState[0].factory[action.factoryId].globalInput.paramArgs = ['']
			return nextState
		case CONTAINER_ACTIONS.SET_GLOBAL_OUT_PARAM_STRING:
			nextState[0].factory[action.factoryId].globalOutput.param = action.paramString
			return nextState
		case CONTAINER_ACTIONS.SET_GLOBAL_OUT_PARAMS:
			nextState[0].factory[action.factoryId].globalOutput.paramArgs[action.paramIndex] = action.param
			return nextState
		case CONTAINER_ACTIONS.CLEAR_GLOBAL_OUT_PARAMS:
			nextState[0].factory[action.factoryId].globalOutput.paramArgs = ['']
			return nextState
		case CONTAINER_ACTIONS.SET_INPUT_PARAM_STRING:
			nextState[0].factory[action.factoryId].input.param = action.paramString
			return nextState
		case CONTAINER_ACTIONS.SET_INPUT_PARAMS:
			nextState[0].factory[action.factoryId].input.paramArgs[action.paramIndex] = action.param
			return nextState
		case CONTAINER_ACTIONS.CLEAR_INPUT_PARAMS:
			nextState[0].factory[action.factoryId].input.paramArgs = ['']
			return nextState
		case CONTAINER_ACTIONS.SET_FILTER_PARAM_STRING:
			nextState[0].factory[action.factoryId].filter.param = action.paramString
			return nextState
		case CONTAINER_ACTIONS.SET_FILTER_PARAMS:
			nextState[0].factory[action.factoryId].filter.paramArgs[action.paramIndex] = action.param
			return nextState
		case CONTAINER_ACTIONS.CLEAR_FILTER_PARAMS:
			nextState[0].factory[action.factoryId].filter.paramArgs = ['']
			return nextState
		case CONTAINER_ACTIONS.SET_OUTPUT_PARAM_STRING:
			nextState[0].factory[action.factoryId].output.param = action.paramString
			return nextState
		case CONTAINER_ACTIONS.SET_OUTPUT_PARAMS:
			nextState[0].factory[action.factoryId].output.paramArgs[action.paramIndex] = action.param
			return nextState
		case CONTAINER_ACTIONS.CLEAR_OUTPUT_PARAMS:
			nextState[0].factory[action.factoryId].output.paramArgs = ['']
			return nextState
		default:
			return nextState
	}
}
