import { INPUT_TYPES, OUTPUT_TYPES } from '../GenericInterfaces'
import { IFactory } from '../GenericInterfaces'

export const ADD_FACTORY = 'addFactory'
export const UPDATE_FULL_STORE = 'update_full_store'

export const SET_TRANSCODER_TYPE = 'setTranscoderType'
export const SET_CONTAINER_NAME = 'setContainerName'
export const SET_CONTAINER_STATE = 'setContainerState'
export const SET_GLOBAL_IN_PARAMS = 'setGlobalInParams'
export const CLEAR_GLOBAL_IN_PARAMS = 'clearGlobalInParams'
export const SET_GLOBAL_OUT_PARAMS = 'setGlobalOutParams'
export const CLEAR_GLOBAL_OUT_PARAMS = 'clearGlobalOutParams'
export const SET_INPUT_TYPE = 'setInputType'
export const SET_INPUT_PARAMS = 'setInputParams'
export const CLEAR_INPUT_PARAMS = 'clearInputParams'
export const SET_FILTER_PARAMS = 'setFilterParams'
export const CLEAR_FILTER_PARAMS = 'clearFilterParams'
export const SET_OUTPUT_TYPE = 'setOutputType'
export const SET_OUTPUT_PARAMS = 'setOutputParams'
export const CLEAR_OUTPUT_PARAMS = 'clearOutputParams'


export const storeAddFactory = () => {
    return {
        type: ADD_FACTORY
    }
}

export const storeUpdateFullStore = (fullStore: IFactory[]) => {
    return {
        type: UPDATE_FULL_STORE,
		fullStore: fullStore
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
