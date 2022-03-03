import { INPUT_TYPES, OUTPUT_TYPES } from '../GenericInterfaces'

export const ADD_FACTORY = 'addFactory'

export const SET_GLOBAL_PARAMS = 'setGlobalParams'
export const SET_INPUT_TYPE = 'setInputType'
export const SET_INPUT_PARAMS = 'setInputParams'
export const SET_FILTER_PARAMS = 'setFilterParams'
export const SET_OUTPUT_TYPE = 'setOutputType'
export const SET_OUTPUT_PARAMS = 'setOutputParams'


export const addFactory = () => {
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
