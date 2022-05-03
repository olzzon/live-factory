import { IDeviceList, INPUT_TYPES, OUTPUT_ENCODER, OUTPUT_TYPES } from '../GenericInterfaces'
import { IFactory } from '../GenericInterfaces'

export const ADD_FACTORY = 'addFactory'
export const UPDATE_FULL_STORE = 'update_full_store'
export const UPDATE_DEVICES_LIST = 'update_devices_list'
export const LOG_PUSH = 'log_push'
export const LOG_SHIFT = 'log_shift'

export const SET_TRANSCODER_TYPE = 'setTranscoderType'
export const SET_CONTAINER_NAME = 'setContainerName'
export const SET_CONTAINER_STATE = 'setContainerState'
export const SET_GLOBAL_IN_PARAMS = 'setGlobalInParams'
export const SET_GLOBAL_IN_PARAM_STRING = 'setGlobalInParamString'
export const CLEAR_GLOBAL_IN_PARAMS = 'clearGlobalInParams'
export const SET_GLOBAL_OUT_PARAMS = 'setGlobalOutParams'
export const SET_GLOBAL_OUT_PARAM_STRING = 'setGlobalOutParamString'
export const CLEAR_GLOBAL_OUT_PARAMS = 'clearGlobalOutParams'
export const SET_INPUT_TYPE = 'setInputType'
export const SET_INPUT_PARAM_STRING = 'setInputParamString'
export const SET_INPUT_PARAMS = 'setInputParams'
export const CLEAR_INPUT_PARAMS = 'clearInputParams'
export const SET_FILTER_TYPE = 'setFilterType'
export const SET_FILTER_PARAM_STRING = 'setFilterParamString'
export const SET_FILTER_PARAMS = 'setFilterParams'
export const CLEAR_FILTER_PARAMS = 'clearFilterParams'
export const SET_OUTPUT_TYPE = 'setOutputType'
export const SET_OUTPUT_PARAM_STRING = 'setOutputParamString'
export const SET_OUTPUT_PARAMS = 'setOutputParams'
export const CLEAR_OUTPUT_PARAMS = 'clearOutputParams'


export const storeAddFactory = () => {
    return {
        type: ADD_FACTORY
    }
}

export const storeUpdateDevicesList = (deviceTypes: IDeviceList[]) => {
	return {
		type: UPDATE_DEVICES_LIST,
		deviceTypes: deviceTypes
	}
}

export const storeUpdateFullStore = (fullStore: IFactory[]) => {
    return {
        type: UPDATE_FULL_STORE,
		fullStore: fullStore
    }
}

export const storePushLog = (factoryId: number, logLine: string) => {
    return {
        type: LOG_PUSH,
		logLine: logLine,
		factoryId: factoryId,
    }
}

export const storeShiftLog = (factoryId: number) => {
    return {
        type: LOG_SHIFT,
		factoryId: factoryId,
    }
}

export const storeSetContainerName = (factoryId: number, name: string) => {
	return {
		type: SET_CONTAINER_NAME,
		factoryId: factoryId,
		containerName: name,
	}
}

export const storeSetContainerState = (factoryId: number, activated: boolean, running: boolean) => {
	return {
		type: SET_CONTAINER_STATE,
		factoryId: factoryId,
		activated: activated,
		running: running
	}
}

export const storeSetGlobalInParamString = (factoryId: number, paramString: string) => {
	return {
		type: SET_GLOBAL_IN_PARAM_STRING,
		factoryId: factoryId,
		paramString: paramString
	}
}

export const storeSetGlobalInParams = (factoryId: number, paramIndex: number, param: string) => {
	return {
		type: SET_GLOBAL_IN_PARAMS,
		factoryId: factoryId,
        paramIndex: paramIndex,
		param: param,
	}
}

export const storeClearGlobalInParams = (factoryId: number) => {
	return {
		type: CLEAR_GLOBAL_IN_PARAMS,
		factoryId: factoryId,
	}
}

export const storeSetGlobalOutParamString = (factoryId: number, paramString: string) => {
	return {
		type: SET_GLOBAL_OUT_PARAM_STRING,
		factoryId: factoryId,
		paramString: paramString
	}
}

export const storeSetGlobalOutParams = (factoryId: number, paramIndex: number, param: string) => {
	return {
		type: SET_GLOBAL_OUT_PARAMS,
		factoryId: factoryId,
        paramIndex: paramIndex,
		param: param,
	}
}

export const storeClearGlobalOutParams = (factoryId: number) => {
	return {
		type: CLEAR_GLOBAL_OUT_PARAMS,
		factoryId: factoryId,
	}
}

export const storeSetInputType = (factoryId: number, inputType: INPUT_TYPES) => {
	return {
		type: SET_INPUT_TYPE,
		factoryId: factoryId,
		inputType: inputType,
	}
}

export const storeSetInputParamString = (factoryId: number, paramString: string) => {
	return {
		type: SET_INPUT_PARAM_STRING,
		factoryId: factoryId,
		paramString: paramString,
	}
}

export const storeSetInputParams = (factoryId: number, paramIndex: number, param: string) => {
	return {
		type: SET_INPUT_PARAMS,
		factoryId: factoryId,
        paramIndex: paramIndex,
		param: param,
	}
}

export const storeClearInputParams = (factoryId: number) => {
	return {
		type: CLEAR_INPUT_PARAMS,
		factoryId: factoryId,
	}
}

export const storeSetFilterType = (factoryId: number, filterType: OUTPUT_ENCODER) => {
	return {
		type: SET_FILTER_TYPE,
		factoryId: factoryId,
		filterType: filterType,
	}
}

export const storeSetFilterParamString = (factoryId: number, paramString: string) => {
	return {
		type: SET_FILTER_PARAM_STRING,
		factoryId: factoryId,
		paramString: paramString,
	}
}

export const storeSetFilterParams = (factoryId: number, paramIndex: number, param: string) => {
	return {
		type: SET_FILTER_PARAMS,
		factoryId: factoryId,
        paramIndex: paramIndex,
		param: param,
	}
}

export const storeClearFilterParams = (factoryId: number) => {
	return {
		type: CLEAR_FILTER_PARAMS,
		factoryId: factoryId,
	}
}

export const storeSetOutputType = (factoryId: number, outputType: OUTPUT_TYPES) => {
	return {
		type: SET_OUTPUT_TYPE,
		factoryId: factoryId,
		outputType: outputType,
	}
}

export const storeSetOutputParamString = (factoryId: number, paramString: string) => {
	return {
		type: SET_OUTPUT_PARAM_STRING,
		factoryId: factoryId,
		paramString: paramString,
	}
}

export const storeSetOutputParams = (factoryId: number, paramIndex: number, param: string) => {
	return {
		type: SET_OUTPUT_PARAMS,
		factoryId: factoryId,
        paramIndex: paramIndex,
		param: param,
	}
}

export const storeClearOutputParams = (factoryId: number) => {
	return {
		type: CLEAR_OUTPUT_PARAMS,
		factoryId: factoryId,
	}
}
