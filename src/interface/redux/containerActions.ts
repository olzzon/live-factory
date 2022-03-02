import { INPUT_TYPES, OUTPUT_CODEC, OUTPUT_CONTAINER, OUTPUT_TYPES } from "../GenericInterfaces"

export const SET_GLOBAL_PARAMS = 'setGlobalParams'
export const SET_INPUT_TYPE = 'setInputType'
export const SET_INPUT_PARAMS = 'setInputParams'
export const SET_FILTER_PARAMS = 'setFilterParams'
export const SET_OUTPUT_TYPE = 'setOutputType'
export const SET_OUTPUT_PARAMS = 'setOutputParams'
export const SET_OUT_CONTAINER_TYPE = 'setOutContainerType'
export const SET_OUT_CONTAINER_PARAMS = 'setOutContainerParams'
export const SET_OUT_CODEC_TYPE = 'setOutContainerType'
export const SET_OUT_CODEC_PARAMS = 'setOutContainerParams'

export const storeSetGlobalParams = (params: string[]) => {
    return {
        type: SET_GLOBAL_PARAMS,
        params: params
    }
}

export const storeSetInputType = () => {
    return {
        type: SET_INPUT_TYPE,
        inputType: INPUT_TYPES
    }
}

export const storeSetInputParams = (params: string[]) => {
    return {
        type: SET_INPUT_PARAMS,
        params: params
    }
}

export const storeSetFilterParams = (params: string[]) => {
    return {
        type: SET_INPUT_PARAMS,
        params: params
    }
}

export const storeSetOutputType = () => {
    return {
        type: SET_OUTPUT_TYPE,
        inputType: OUTPUT_TYPES
    }
}

export const storeSetOutputParams = (params: string[]) => {
    return {
        type: SET_OUTPUT_PARAMS,
        params: params
    }
}

export const storeSetOutContainerType = () => {
    return {
        type: SET_OUT_CONTAINER_TYPE,
        inputType: OUTPUT_CONTAINER
    }
}

export const storeSetOutContainerParams = (params: string[]) => {
    return {
        type: SET_OUT_CONTAINER_PARAMS,
        params: params
    }
}

export const storeSetOutCodecType = () => {
    return {
        type: SET_OUT_CODEC_TYPE,
        inputType: OUTPUT_CODEC
    }
}

export const storeSetOutCodecParams = (params: string[]) => {
    return {
        type: SET_OUT_CODEC_PARAMS,
        params: params
    }
}