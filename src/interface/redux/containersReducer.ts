import { IFactory, INPUT_TYPES, OUTPUT_TYPES, TRANSCODER_TYPE } from '../GenericInterfaces'
import * as CONTAINER_ACTIONS from './containerActions'

export interface IFFmpegReducer {
	rerender: boolean
	factory: IFactory[]
}

const defaultFfmpegContainerReducerState = (): IFFmpegReducer => {
	return {
		rerender: false,
		factory: [
			{
				transcoderType: TRANSCODER_TYPE.ENC,
				containerName: 'PIPE 1',
				activated: false,
				running: false,
				globalInput: { params: [''] },
				globalOutput: { params: [''] },
				input: { type: INPUT_TYPES.NONE, params: [''] },
				filter: { params: [''] },
				output: { type: OUTPUT_TYPES.NONE, params: [``] },
			},
		],
	}
}

export const ffmpeg = (state = [defaultFfmpegContainerReducerState()], action: any): Array<IFFmpegReducer> => {
	let nextState = [...state]

	switch (action.type) {
		case CONTAINER_ACTIONS.ADD_FACTORY:
			const newContainer = defaultFfmpegContainerReducerState().factory[0]
			nextState[0].factory = [...nextState[0].factory, newContainer]
			return nextState
		case CONTAINER_ACTIONS.UPDATE_FULL_STORE:
			action.fullStore.forEach((factory: IFactory, index: number) => {
				nextState[0].factory[index] = factory !== null ? factory : defaultFfmpegContainerReducerState().factory[0]
			})
			nextState[0].rerender = !nextState[0].rerender
			return nextState
		case CONTAINER_ACTIONS.SET_CONTAINER_NAME:
			nextState[0].factory[action.factoryId].containerName = action.containerName
			return nextState
		case CONTAINER_ACTIONS.SET_TRANSCODER_TYPE:
			nextState[0].factory[action.factoryId].transcoderType = action.transcoderType
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
		case CONTAINER_ACTIONS.SET_GLOBAL_IN_PARAMS:
			nextState[0].factory[action.factoryId].globalInput.params[action.paramIndex] = action.param
			return nextState
		case CONTAINER_ACTIONS.CLEAR_GLOBAL_IN_PARAMS:
			nextState[0].factory[action.factoryId].globalInput.params = ['']
			return nextState
		case CONTAINER_ACTIONS.SET_INPUT_PARAMS:
			nextState[0].factory[action.factoryId].input.params[action.paramIndex] = action.param
			return nextState
		case CONTAINER_ACTIONS.CLEAR_INPUT_PARAMS:
			nextState[0].factory[action.factoryId].input.params = ['']
			return nextState
		case CONTAINER_ACTIONS.SET_FILTER_PARAMS:
			nextState[0].factory[action.factoryId].filter.params[action.paramIndex] = action.param
			return nextState
		case CONTAINER_ACTIONS.CLEAR_FILTER_PARAMS:
			nextState[0].factory[action.factoryId].filter.params = ['']
			return nextState
		case CONTAINER_ACTIONS.SET_OUTPUT_PARAMS:
			nextState[0].factory[action.factoryId].output.params[action.paramIndex] = action.param
			return nextState
		case CONTAINER_ACTIONS.CLEAR_OUTPUT_PARAMS:
			nextState[0].factory[action.factoryId].output.params = ['']
			return nextState
		default:
			return nextState
	}
}
