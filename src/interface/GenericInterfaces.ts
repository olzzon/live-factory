export interface IFactory {
	containerName: string
	activated: boolean
	running: boolean
	globalInput: IGlobalParams
	globalOutput: IGlobalParams
	input: IInputParams
	filter: IFilterParams
	output: IOutputParams
}

export enum INPUT_TYPES {
    COLORBAR = 'COLORBAR',
    SRT = 'SRT',
    RIST = 'RIST',
    UDP = 'UDP',
    TCP = 'TCP',
    FILE = 'FILE',
    NDI = 'NDI',
    DECKLINK = 'DECKLINK',
    TWENTY_ONE_TEN = '2110',
    MPEG_TS = 'MPEG_TS',
}

export enum OUTPUT_TYPES {
    NDI = 'NDI',
    SRT = 'SRT',
    RIST = 'RIST',
    DECKLINK = 'DECKLINK',
    MPEG_TS = 'MPEG_TS',
    TCP = 'TCP',
    FILE = 'FILE',
    CUSTOM = 'CUSTOM'
}

export enum OUTPUT_ENCODER {
    H264_NATIVE = 'x264',
    HEVC_NATIVE = 'x265',
    H264_MAC = 'h264_videotoolbox',
    HEVC_MAC = 'hevc_videotoolbox',
    H264_NVIDIA = 'h264_nvenc',
    HEVC_NVIDIA = 'hevc_nvenc',
}

export interface IGlobalParams {
    param: string
    paramArgs: string[]
}

export interface IInputParams {
    type: INPUT_TYPES
    param: string
    paramArgs: string[]
}

export interface IFilterParams {
    param: string
    paramArgs: string[]
}

export interface IOutputParams {
    type: OUTPUT_TYPES
    param: string
    paramArgs: string[]
}
