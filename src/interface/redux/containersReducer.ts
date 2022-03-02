import { ChildProcess } from 'child_process'
import {
	IFilterParams,
	IGlobalParams,
	IInputParams,
	IOutCodecParams,
	IOutContainerParams,
	IOutputTypeParams,
} from '../GenericInterfaces'
import * as CONTAINER_ACTIONS from './containerActions'

export interface IFFmpegContainer {
	containerId: string
	execInstance: ChildProcess | null
	global?: IGlobalParams
	input?: IInputParams
	filter?: IFilterParams
	outputType?: IOutputTypeParams
	outputContainer?: IOutContainerParams
	outputCodec?: IOutCodecParams
}

const defaultFfmpegContainerReducerState: Array<IFFmpegContainer> = [{ containerId: '', execInstance: null }]

export const settings = (state = defaultFfmpegContainerReducerState, action: any): Array<IFFmpegContainer> => {
	let nextState = [Object.assign({}, state[0])]

	switch (action.type) {
		case CONTAINER_ACTIONS.SET_INPUT_TYPE:
			// nextState[0].showSettings = !nextState[0].showSettings
			return nextState
		default:
			return nextState
	}
}
