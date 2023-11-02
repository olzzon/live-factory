import { Pipeline, DeviceList, INPUT_PARAMS, OUTPUT_AUDIO_ENCODER, OUTPUT_ENCODER, OUTPUT_PARAMS, DockerPort } from '../GenericInterfaces'
import { GPU_TYPES } from '../SettingsInterface'

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
export const SET_GPU_TYPE = 'setGpuType'
export const SET_DOCKER_INPUT_PORTS = 'setDockerInputPorts'
export const SET_DOCKER_OUTPUT_PORTS = 'setDockerOutputPorts'
export const SET_GLOBAL_IN_VALUE = 'setGlobalInValue'
export const SET_GLOBAL_IN_PARAM_ARR = 'setGlobalInParamArr'
export const CLEAR_GLOBAL_IN_VALUE = 'clearGlobalInValue'
export const SET_GLOBAL_OUT_VALUE = 'setGlobalOutValue'
export const SET_GLOBAL_OUT_PARAM_ARR = 'setGlobalOutParamArr'
export const CLEAR_GLOBAL_OUT_VALUE = 'clearGlobalOutValue'
export const SET_INPUT_TYPE = 'setInputType'
export const SET_INPUT_PARAM_ARR = 'setInputParamArr'
export const SET_INPUT_VALUE = 'setInputValue'
export const CLEAR_INPUT_VALUE = 'clearInputValue'
export const SET_FILTER_TYPE = 'setFilterType'
export const SET_FILTER_PARAM_ARR = 'setFilterParamArr'
export const SET_FILTER_VALUE = 'setFilterValue'
export const CLEAR_FILTER_VALUE = 'clearFilterValue'
export const SET_FILTER_AUDIO_TYPE = 'setFilterAudioType'
export const SET_FILTER_AUDIO_PARAM_ARR = 'setFilterAudioParamArr'
export const SET_FILTER_AUDIO_VALUE = 'setFilterAudioValue'
export const CLEAR_FILTER_AUDIO_VALUE = 'clearFilterAudioValue'
export const SET_OUTPUT_TYPE = 'setOutputType'
export const SET_OUTPUT_PARAM_ARR = 'setOutputParamArr'
export const SET_OUTPUT_VALUE = 'setOutputValue'
export const CLEAR_OUTPUT_VALUE = 'clearOutputValue'


export const storeAddPipeline = () => {
    return {
        type: ADD_FACTORY
    }
}

export const storeDuplicatePipeline = (pipelineId: number) => {
    return {
        type: DUPLICATE_FACTORY,
		pipelineId: pipelineId
    }
}

export const storeUpdateDevicesList = (deviceTypes: DeviceList[]) => {
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

export const storeSetGpuType = (pipelineId: number, gpuType: GPU_TYPES) => {
	return {
		type: SET_GPU_TYPE,
		pipelineId: pipelineId,
		gpuType: gpuType
	}
}

export const storeSetDockerInputPorts = (pipelineId: number, dockerPorts: DockerPort[]) => {
	return {
		type: SET_DOCKER_INPUT_PORTS,
		pipelineId: pipelineId,
		dockerPorts: dockerPorts
	}
}

export const storeSetDockerOutputPorts = (pipelineId: number, dockerPorts: DockerPort[]) => {
	return {
		type: SET_DOCKER_OUTPUT_PORTS,
		pipelineId: pipelineId,
		dockerPorts: dockerPorts
	}
}

export const storeSetGlobalInParamArr = (pipelineId: number, paramArr: string[]) => {
	return {
		type: SET_GLOBAL_IN_PARAM_ARR,
		pipelineId: pipelineId,
		paramArr: paramArr
	}
}

export const storeSetGlobalInValue = (pipelineId: number, paramIndex: number, param: string) => {
	return {
		type: SET_GLOBAL_IN_VALUE,
		pipelineId: pipelineId,
        paramIndex: paramIndex,
		param: param,
	}
}

export const storeClearGlobalInValue = (pipelineId: number) => {
	return {
		type: CLEAR_GLOBAL_IN_VALUE,
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

export const storeSetGlobalOutValue = (pipelineId: number, paramIndex: number, param: string) => {
	return {
		type: SET_GLOBAL_OUT_VALUE,
		pipelineId: pipelineId,
        paramIndex: paramIndex,
		param: param,
	}
}

export const storeClearGlobalOutValue = (pipelineId: number) => {
	return {
		type: CLEAR_GLOBAL_OUT_VALUE,
		pipelineId: pipelineId,
	}
}

export const storeSetInputType = (pipelineId: number, inputType: INPUT_PARAMS) => {
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

export const storeSetInputValue = (pipelineId: number, paramIndex: number, param: string) => {
	return {
		type: SET_INPUT_VALUE,
		pipelineId: pipelineId,
        paramIndex: paramIndex,
		param: param,
	}
}

export const storeClearInputValue = (pipelineId: number) => {
	return {
		type: CLEAR_INPUT_VALUE,
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

export const storeSetFilterValue = (pipelineId: number, paramIndex: number, param: string) => {
	return {
		type: SET_FILTER_VALUE,
		pipelineId: pipelineId,
        paramIndex: paramIndex,
		param: param,
	}
}

export const storeClearFilterValue = (pipelineId: number) => {
	return {
		type: CLEAR_FILTER_VALUE,
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

export const storeSetFilterAudioValue = (pipelineId: number, paramIndex: number, param: string) => {
	return {
		type: SET_FILTER_AUDIO_VALUE,
		pipelineId: pipelineId,
        paramIndex: paramIndex,
		param: param,
	}
}

export const storeClearFilterAudioValue = (pipelineId: number) => {
	return {
		type: CLEAR_FILTER_AUDIO_VALUE,
		pipelineId: pipelineId,
	}
}

export const storeSetOutputType = (pipelineId: number, outputType: OUTPUT_PARAMS) => {
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

export const storeSetOutputValue = (pipelineId: number, paramIndex: number, param: string) => {
	return {
		type: SET_OUTPUT_VALUE,
		pipelineId: pipelineId,
        paramIndex: paramIndex,
		param: param,
	}
}

export const storeClearOutputValue = (pipelineId: number) => {
	return {
		type: CLEAR_OUTPUT_VALUE,
		pipelineId: pipelineId,
	}
}
