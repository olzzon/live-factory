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
    UDP = 'UDP',
    FILE = 'FILE',
    NDI = 'NDI',
    DECKLINK = 'DECKLINK',
    TWENTY_ONE_TEN = '2110',
    RTMP_S = 'TRMP_S', 
    MPEG_TS = 'MPEG_TS',
    RTP_UDP = 'RTP-UDP', 
}

export enum OUTPUT_TYPES {
    NDI = 'NDI',
    FILE = 'FILE',
    SRT = 'SRT',
    DECKLINK = 'DECKLINK',
    MPEG_TS = 'MPEG_TS',
    RTMP_S = 'RTMP_S',
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
    params: string[]
}

export interface IInputParams {
    type: INPUT_TYPES
    params: string[]
}

export interface IFilterParams {
    params: string[]
}

export interface IOutputParams {
    type: OUTPUT_TYPES
    params: string[]
}
