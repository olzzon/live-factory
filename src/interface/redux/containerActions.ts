import { INPUT_TYPES, OUTPUT_TYPES } from '../GenericInterfaces'

export const ADD_FACTORY = 'addFactory'

export const SET_GLOBAL_PARAMS = 'setGlobalParams'
export const CLEAR_GLOBAL_PARAMS = 'clearGlobalParams'
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

export const storeSetGlobalParams = (factoryId: number, paramIndex: number, param: string) => {
	return {
		type: SET_GLOBAL_PARAMS,
		factoryId: factoryId,
        paramIndex: paramIndex,
		param: param,
	}
}

export const storeClearGlobalParams = (factoryId: number) => {
	return {
		type: CLEAR_GLOBAL_PARAMS,
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
		type: SET_INPUT_PARAMS,
		factoryId: factoryId,
        paramIndex: paramIndex,
		param: param,
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
