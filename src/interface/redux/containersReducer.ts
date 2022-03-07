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
	activated: boolean
	running: boolean
	global: IGlobalParams
	input: IInputParams
	filter: IFilterParams
	output: IOutputParams
}

export interface IFFmpegReducer {
	rerender: boolean
	factory: IFactory[]
}

const defaultFfmpegContainerReducerState = (): IFFmpegReducer => {
	return {
		rerender: false,
		factory: [
			{
				containerName: 'PIPE 1',
				ffmpegInstance: null,
				activated: false,
				running: false,
				global: { params: [''] },
				input: { type: INPUT_TYPES.NONE, params: [''] },
				filter: { params: [''] },
				output: { type: OUTPUT_TYPES.NONE, params: [` -f libndi_newtek -pix_fmt uyvy422 `, `NDI_PIPE_1`] },
			},
		],
	}
}

export const ffmpeg = (state = [defaultFfmpegContainerReducerState()], action: any): Array<IFFmpegReducer> => {
	let nextState = [...state]

	switch (action.type) {
		case CONTAINER_ACTIONS.ADD_FACTORY:
			const newContainer = defaultFfmpegContainerReducerState().factory[0]
			newContainer.containerName = `PIPE ${nextState[0].factory.length + 1}`
			newContainer.output.params = [
				` -f libndi_newtek -pix_fmt uyvy422 `,
				`NDI_PIPE_${nextState[0].factory.length + 1}`,
			]

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
		case CONTAINER_ACTIONS.SET_CONTAINER_STATE:
			nextState[0].factory[action.factoryId].activated = action.activated
			nextState[0].factory[action.factoryId].running = action.running
			nextState[0].rerender = !nextState[0].rerender
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
