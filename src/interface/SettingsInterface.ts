import { INPUT_PARAMS, OUTPUT_PARAMS } from "./GenericInterfaces"

export interface Settings {
    nodeList: NodeList[]
    maxActiveEncoders: number
    allowedInputTypes: AllowedInputTypes[]
    allowedOutputTypes: AllowedOutputTypes[]
    allowedOutputEncoderTypes: AllowedOutputEncoderTypes[]
    inputParams: SettingsInputParam[]
    outputParams: SettingsOutputParam[]
}

export interface NodeList {
    name: string,
    type: NODE_TYPES,
    path?: string,
    imageName?: string
    host?: string
    port?: number
    mapHostFolders: [string]
    hwaccel: GPU_TYPES
}

export enum NODE_TYPES {
    FFMPEG = 'FFMPEG',
    DOCKER = 'DOCKER'
}

export interface SettingsInputParam {
    type: INPUT_PARAMS
    globalIn: string[] 
    input: string[]
}

export interface SettingsOutputParam {
    type: OUTPUT_PARAMS
    globalOut: string[]
    output: string[]
}

export interface AllowedInputTypes {
    value: string
    label: string
}

export interface AllowedOutputTypes {
    value: string
    label: string
}

export interface AllowedOutputEncoderTypes {
    value: string
    label: string
}

export enum GPU_TYPES {
    NVIDIA,
    MAC,
    NONE
}