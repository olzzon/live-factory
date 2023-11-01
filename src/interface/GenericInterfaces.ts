import { GPU_TYPES } from "./SettingsInterface"

export interface Pipeline {
    nodeIndex: number
    containerName: string
    uuid: string
	activated: boolean
	running: boolean
    hwaccell: GPU_TYPES
	globalInput: GlobalParams
	globalOutput: GlobalParams
	input: InputParams
	filter: OutputCodecParams
	audioFilter: OutputAudioCodecParams
	output: OutputParams
    log: string[]
}

export interface InputParams {
    type: INPUT_PARAMS
    param: string[]
    paramArgs: string[]
}

export enum INPUT_PARAMS {
    COLORBAR = 'COLORBAR',
    SRT = 'SRT',
    // RIST = 'RIST',
    UDP = 'UDP',
    TCP = 'TCP',
    // RTP = 'RTP',
    FILE = 'FILE',
    NDI = 'NDI',
    DECKLINK = 'DECKLINK',
    // TWENTY_ONE_TEN = '2110',
    MPEG_TS = 'MPEG_TS',
    CUSTOM = 'CUSTOM'
}

export interface OutputParams {
    type: OUTPUT_PARAMS
    param: string[]
    paramArgs: string[]
}

export enum OUTPUT_PARAMS {
    NDI = 'NDI',
    SRT = 'SRT',
    // RIST = 'RIST',
    DECKLINK = 'DECKLINK',
    MPEG_TS = 'MPEG_TS',
    TCP = 'TCP',
    RTP = 'RTP',
    SCREEN = 'SCREEN',
    // FILE = 'FILE',
    CUSTOM = 'CUSTOM'
}

export interface OutputCodecParams {
    type: OUTPUT_ENCODER
    param: string[]
    paramArgs: string[]
}

export enum OUTPUT_ENCODER {
    COPY = 'COPY',
    H264_NATIVE = 'H264_NATIVE',
    HEVC_NATIVE = 'HEVC_NATIVE',
    H264_MAC = 'H264_MAC',
    HEVC_MAC = 'HEVC_MAC',
    H264_NVIDIA = 'H264_NVIDIA',
    HEVC_NVIDIA = 'HEVC_NVIDIA',
}

export interface OutputAudioCodecParams {
    type: OUTPUT_AUDIO_ENCODER
    param: string[]
    paramArgs: string[]
}

export enum OUTPUT_AUDIO_ENCODER {
    COPY = 'COPY',
    OPUS = 'OPUS',
}

export interface GlobalParams {
    param: string[]
    paramArgs: string[]
}

export interface DeviceList {
    type: DEVICE_TYPES
    devices: string[]
}

export enum DEVICE_TYPES {
    NDI,
    DECKLINK_INPUT,
    DECKLINK_OUTPUT
}

