import { FFmepgInstance } from '../../server/ffmpeg/FFmpegInstance'
import {
	IFilterParams,
	IGlobalParams,
	IInputParams,
	INPUT_TYPES,
	IOutputParams,
	OUTPUT_TYPES,
} from '../GenericInterfaces'
import * as CONTAINER_ACTIONS from './containerActions'

export interface IFactory {
	containerName: string
	ffmpegInstance: FFmepgInstance | null
	global: IGlobalParams
	input: IInputParams
	filter: IFilterParams
	output: IOutputParams
}

export interface IFFmpegReducer {
	factory: IFactory[]
}

const defaultFfmpegContainerReducerState = (): IFFmpegReducer => {
	return {
		factory: [
			{
				containerName: '',
				ffmpegInstance: null,
				global: { params: [''] },
				input: { type: INPUT_TYPES.NONE, params: [''] },
				filter: { params: [''] },
				output: { type: OUTPUT_TYPES.NONE, params: [''] },
			},
		],
	}
}

export const ffmpeg = (state = [defaultFfmpegContainerReducerState()], action: any): Array<IFFmpegReducer> => {
	let nextState = [...state]

	switch (action.type) {
		case CONTAINER_ACTIONS.ADD_FACTORY:
			nextState[0].factory = [...nextState[0].factory, ...defaultFfmpegContainerReducerState().factory]
			return nextState
		case CONTAINER_ACTIONS.SET_INPUT_TYPE:
			nextState[0].factory[action.factoryId].input.type = action.inputType
			return nextState
		case CONTAINER_ACTIONS.SET_GLOBAL_PARAMS:
			nextState[0].factory[action.factoryId].global.params[action.paramIndex] = action.param
			return nextState
		case CONTAINER_ACTIONS.CLEAR_GLOBAL_PARAMS:
			nextState[0].factory[action.factoryId].global.params = ['']
			return nextState
		case CONTAINER_ACTIONS.SET_INPUT_PARAMS:
			nextState[0].factory[action.factoryId].input.params[action.paramIndex] = action.param
			return nextState
		case CONTAINER_ACTIONS.CLEAR_INPUT_PARAMS:
			nextState[0].factory[action.factoryId].input.params = ['']
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
