export interface IFactory {
    transcoderType: TRANSCODER_TYPE
	containerName: string
	activated: boolean
	running: boolean
	globalInput: IGlobalParams
	globalOutput: IGlobalParams
	input: IInputParams
	filter: IFilterParams
	output: IOutputParams
}

export const GLOBAL_FLAGS = {
    READ_RATE_INPUT_SYNC: '-re',
    GENERATE_PTS: '+genpts', 
    FILTER_COMPLEX: '-lavfi'  
}

export enum TRANSCODER_TYPE {
    ENC = 'ENC',
    DEC = 'DEC',
    TRANSCODER = 'TRANSCODER'
}

export enum INPUT_TYPES {
    NONE = 'NONE',
    SRT = 'SRT',
    UDP = 'UDP',
    COLORBAR = 'COLORBAR',
    FILE = 'FILE',
    TWENTY_ONE_TEN = '2110',
    DECKLINK = 'DECKLINK',
    NDI = 'NDI',
    RTMP_S = 'TRMP_S', 
    MPEG_TS = 'MPEG_TS',
    RTP_UDP = 'RTP-UDP', 
}

export enum OUTPUT_TYPES {
    NONE = 'NONE',
    FILE = 'FILE',
    SRT = 'SRT',
    MPEG_TS = 'MPEG_TS',
    DECKLINK = 'DECKLINK',
    NDI = 'NDI',
    RTMP_S = 'RTMP_S',
}

export enum OUTPUT_CONTAINER {
    NONE = 'NONE',
    HIDDEN = 'HIDDEN',
    SRT = 'SRT',
    UDP = 'UDP',
    FILE = 'FILE',
    DECKLINK = 'DECKLINK',
    RTP_UDP = 'RTP-UDP', 
}

export enum OUTPUT_CODEC {
    NONE = 'NONE',
    HIDDEN = 'HIDDEN',
    JK2 = 'JK2',
    H262 = 'H262',
    H264 = 'H264',
    H265 = 'H265'
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
