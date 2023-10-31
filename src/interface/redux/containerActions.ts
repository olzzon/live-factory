import { IDeviceList, INPUT_TYPES, OUTPUT_AUDIO_ENCODER, OUTPUT_ENCODER, OUTPUT_TYPES } from '../GenericInterfaces'
import { Pipeline } from '../GenericInterfaces'

export const ADD_FACTORY = 'addFactory'
export const DUPLICATE_FACTORY = 'duplicateFactory'
export const UPDATE_FULL_STORE = 'update_full_store'
export const UPDATE_DEVICES_LIST = 'update_devices_list'
export const LOG_PUSH = 'log_push'
export const LOG_SHIFT = 'log_shift'

export const SET_TRANSCODER_TYPE = 'setTranscoderType'
export const SET_CONTAINER_NAME = 'setContainerName'
export const SET_NODE_INDEX = 'setNodeIndex'
export const SET_CONTAINER_STATE = 'setContainerState'
export const SET_GLOBAL_IN_PARAMS = 'setGlobalInParams'
export const SET_GLOBAL_IN_PARAM_ARR = 'setGlobalInParamArr'
export const CLEAR_GLOBAL_IN_PARAMS = 'clearGlobalInParams'
export const SET_GLOBAL_OUT_PARAMS = 'setGlobalOutParams'
export const SET_GLOBAL_OUT_PARAM_ARR = 'setGlobalOutParamArr'
export const CLEAR_GLOBAL_OUT_PARAMS = 'clearGlobalOutParams'
export const SET_INPUT_TYPE = 'setInputType'
export const SET_INPUT_PARAM_ARR = 'setInputParamArr'
export const SET_INPUT_PARAMS = 'setInputParams'
export const CLEAR_INPUT_PARAMS = 'clearInputParams'
export const SET_FILTER_TYPE = 'setFilterType'
export const SET_FILTER_PARAM_ARR = 'setFilterParamArr'
export const SET_FILTER_PARAMS = 'setFilterParams'
export const CLEAR_FILTER_PARAMS = 'clearFilterParams'
export const SET_FILTER_AUDIO_TYPE = 'setFilterAudioType'
export const SET_FILTER_AUDIO_PARAM_ARR = 'setFilterAudioParamArr'
export const SET_FILTER_AUDIO_PARAMS = 'setFilterAudioParams'
export const CLEAR_FILTER_AUDIO_PARAMS = 'clearFilterAudioParams'
export const SET_OUTPUT_TYPE = 'setOutputType'
export const SET_OUTPUT_PARAM_ARR = 'setOutputParamArr'
export const SET_OUTPUT_PARAMS = 'setOutputParams'
export const CLEAR_OUTPUT_PARAMS = 'clearOutputParams'


export const storeAddFactory = () => {
    return {
        type: ADD_FACTORY
    }
}

export const storeDuplicateFactory = (pipelineId: number) => {
    return {
        type: DUPLICATE_FACTORY,
		pipelineId: pipelineId
    }
}

export const storeUpdateDevicesList = (deviceTypes: IDeviceList[]) => {
	return {
		type: UPDATE_DEVICES_LIST,
		deviceTypes: deviceTypes
	}
}

export const storeUpdateFullStore = (fullStore: Pipeline[]) => {
    return {
        type: UPDATE_FULL_STORE,
		fullStore: fullStore
    }
}

export const storePushLog = (pipelineId: number, logLine: string) => {
    return {
        type: LOG_PUSH,
		logLine: logLine,
		pipelineId: pipelineId,
    }
}

export const storeShiftLog = (pipelineId: number) => {
    return {
        type: LOG_SHIFT,
		pipelineId: pipelineId,
    }
}

export const storeSetContainerName = (pipelineId: number, name: string) => {
	return {
		type: SET_CONTAINER_NAME,
		pipelineId: pipelineId,
		containerName: name,
	}
}

export const storeSetNodeIndex = (pipelineId: number, nodeIndex: number) => {
	return {
		type: SET_NODE_INDEX,
		pipelineId: pipelineId,
		nodeIndex: nodeIndex,
	}
}

export const storeSetContainerState = (pipelineId: number, activated: boolean, running: boolean) => {
	return {
		type: SET_CONTAINER_STATE,
		pipelineId: pipelineId,
		activated: activated,
		running: running
	}
}

export const storeSetGlobalInParamArr = (pipelineId: number, paramArr: string[]) => {
	return {
		type: SET_GLOBAL_IN_PARAM_ARR,
		pipelineId: pipelineId,
		paramArr: paramArr
	}
}

export const storeSetGlobalInParams = (pipelineId: number, paramIndex: number, param: string) => {
	return {
		type: SET_GLOBAL_IN_PARAMS,
		pipelineId: pipelineId,
        paramIndex: paramIndex,
		param: param,
	}
}

export const storeClearGlobalInParams = (pipelineId: number) => {
	return {
		type: CLEAR_GLOBAL_IN_PARAMS,
		pipelineId: pipelineId,
	}
}

export const storeSetGlobalOutParamArr = (pipelineId: number, paramArr: string[]) => {
	return {
		type: SET_GLOBAL_OUT_PARAM_ARR,
		pipelineId: pipelineId,
		paramArr: paramArr
	}
}

export const storeSetGlobalOutParams = (pipelineId: number, paramIndex: number, param: string) => {
	return {
		type: SET_GLOBAL_OUT_PARAMS,
		pipelineId: pipelineId,
        paramIndex: paramIndex,
		param: param,
	}
}

export const storeClearGlobalOutParams = (pipelineId: number) => {
	return {
		type: CLEAR_GLOBAL_OUT_PARAMS,
		pipelineId: pipelineId,
	}
}

export const storeSetInputType = (pipelineId: number, inputType: INPUT_TYPES) => {
	return {
		type: SET_INPUT_TYPE,
		pipelineId: pipelineId,
		inputType: inputType,
	}
}

export const storeSetInputParamArr = (pipelineId: number, paramArr: string[]) => {
	return {
		type: SET_INPUT_PARAM_ARR,
		pipelineId: pipelineId,
		paramArr: paramArr,
	}
}

export const storeSetInputParams = (pipelineId: number, paramIndex: number, param: string) => {
	return {
		type: SET_INPUT_PARAMS,
		pipelineId: pipelineId,
        paramIndex: paramIndex,
		param: param,
	}
}

export const storeClearInputParams = (pipelineId: number) => {
	return {
		type: CLEAR_INPUT_PARAMS,
		pipelineId: pipelineId,
	}
}

export const storeSetFilterType = (pipelineId: number, filterType: OUTPUT_ENCODER) => {
	return {
		type: SET_FILTER_TYPE,
		pipelineId: pipelineId,
		filterType: filterType,
	}
}

export const storeSetFilterParamArr = (pipelineId: number, paramArr: string[]) => {
	return {
		type: SET_FILTER_PARAM_ARR,
		pipelineId: pipelineId,
		paramArr: paramArr,
	}
}

export const storeSetFilterParams = (pipelineId: number, paramIndex: number, param: string) => {
	return {
		type: SET_FILTER_PARAMS,
		pipelineId: pipelineId,
        paramIndex: paramIndex,
		param: param,
	}
}

export const storeClearFilterParams = (pipelineId: number) => {
	return {
		type: CLEAR_FILTER_PARAMS,
		pipelineId: pipelineId,
	}
}

export const storeSetFilterAudioType = (pipelineId: number, filterType: OUTPUT_AUDIO_ENCODER) => {
	return {
		type: SET_FILTER_AUDIO_TYPE,
		pipelineId: pipelineId,
		filterType: filterType,
	}
}

export const storeSetFilterAudioParamArr = (pipelineId: number, paramArr: string[]) => {
	return {
		type: SET_FILTER_AUDIO_PARAM_ARR,
		pipelineId: pipelineId,
		paramArr: paramArr,
	}
}

export const storeSetFilterAudioParams = (pipelineId: number, paramIndex: number, param: string) => {
	return {
		type: SET_FILTER_AUDIO_PARAMS,
		pipelineId: pipelineId,
        paramIndex: paramIndex,
		param: param,
	}
}

export const storeClearFilterAudioParams = (pipelineId: number) => {
	return {
		type: CLEAR_FILTER_AUDIO_PARAMS,
		pipelineId: pipelineId,
	}
}

export const storeSetOutputType = (pipelineId: number, outputType: OUTPUT_TYPES) => {
	return {
		type: SET_OUTPUT_TYPE,
		pipelineId: pipelineId,
		outputType: outputType,
	}
}

export const storeSetOutputParamArr = (pipelineId: number, paramArr: string[]) => {
	return {
		type: SET_OUTPUT_PARAM_ARR,
		pipelineId: pipelineId,
		paramArr: paramArr,
	}
}

export const storeSetOutputParams = (pipelineId: number, paramIndex: number, param: string) => {
	return {
		type: SET_OUTPUT_PARAMS,
		pipelineId: pipelineId,
        paramIndex: paramIndex,
		param: param,
	}
}

export const storeClearOutputParams = (pipelineId: number) => {
	return {
		type: CLEAR_OUTPUT_PARAMS,
		pipelineId: pipelineId,
	}
}
