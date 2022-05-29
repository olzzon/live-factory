export interface IFactory {
	containerName: string
	activated: boolean
	running: boolean
	globalInput: IGlobalParams
	globalOutput: IGlobalParams
	input: IInputParams
	filter: IOutputCodecParams
	output: IOutputParams
    log: string[]
}

export interface IInputParams {
    type: INPUT_TYPES
    param: string
    paramArgs: string[]
}

export enum INPUT_TYPES {
    COLORBAR = 'COLORBAR',
    SRT = 'SRT',
    // RIST = 'RIST',
    UDP = 'UDP',
    TCP = 'TCP',
    RTP = 'RTP',
    FILE = 'FILE',
    NDI = 'NDI',
    DECKLINK = 'DECKLINK',
    // TWENTY_ONE_TEN = '2110',
    MPEG_TS = 'MPEG_TS',
    CUSTOM = 'CUSTOM'
}

export interface IOutputParams {
    type: OUTPUT_TYPES
    param: string
    paramArgs: string[]
}

export enum OUTPUT_TYPES {
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

export interface IOutputCodecParams {
    type: OUTPUT_ENCODER
    param: string
    paramArgs: string[]
}

export enum OUTPUT_ENCODER {
    NONE = 'NONE',
    H264_NATIVE = 'H264_NATIVE',
    // HEVC_NATIVE = 'HEVC_NATIVE',
    H264_MAC = 'H264_MAC',
    HEVC_MAC = 'HEVC_MAC',
    // H264_NVIDIA = 'H264_NVIDIA',
    // HEVC_NVIDIA = 'HEVC_NVIDIA',
}

export interface IGlobalParams {
    param: string
    paramArgs: string[]
}

export interface IDeviceList {
    type: DEVICE_TYPES
    devices: string[]
}

export enum DEVICE_TYPES {
    NDI,
    DECKLINK_INPUT,
    DECKLINK_OUTPUT
}
