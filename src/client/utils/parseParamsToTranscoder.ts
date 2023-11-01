import { INPUT_PARAMS } from "../../interface/GenericInterfaces";
import { GPU_TYPES, SettingsInputParam } from "../../interface/SettingsInterface";
import { findGpuSettings } from "../Components/InputTypes/DecoderSettings/findGpu";

export const parseGlobalInParamsToTranscoder = (params: SettingsInputParam[], type: INPUT_PARAMS, hwAccel: GPU_TYPES): string[] => {
    const input = params.find((param) => param.type === type)?.globalIn || [' ']
    let accelIndex = input.indexOf('{hwaccel}')
    if (accelIndex >-1) {
        input.splice(accelIndex, 1, ...findGpuSettings(hwAccel))
    }
    return input
}

export const parseInputParamsToTranscoder = (params: SettingsInputParam[], type: INPUT_PARAMS, hwAccel: GPU_TYPES): string[] => {
    const input = params.find((param) => param.type === type)?.input || [' ']
    let accelIndex = input.indexOf('{hwaccel}')
    if (accelIndex >-1) {
        input.splice(accelIndex, 1, ...findGpuSettings(hwAccel))
    }
    return input
}