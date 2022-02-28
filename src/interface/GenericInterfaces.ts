export const GLOBAL_FLAGS = {
    READ_RATE_INPUT_SYNC: '-re',
    GENERATE_PTS: '+genpts', 
    FILTER_COMPLEX: '-lavfi'  
}

export enum INPUT_TYPES {
    NONE = 'NONE',
    SRT = 'SRT',
    UDP = 'UDP',
    COLORBAR = 'COLORBAR',
    FILE = 'FILE',
    DECKLINK = 'DECKLINK',
    NDI = 'NDI',
    RTMP_S = 'TRMP_S', 
    MPEG_TS = 'MPEG_TS',
    RTP_UDP = 'RTP-UDP', 
}

export enum OUTPUT_TYPES {
    NONE = 'NONE',
    FILE = 'FILE',
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

export interface IFFmpegCommand {
    global: IGlobalParams
    input: IInputParams
    filter: IFilterParams
    outputType: IOutputTypeParams
    outputContainer: IOutContainerParams
    outputCodec: IOutCodecParams
}

export interface IGlobalParams {
    otherParams: string[]
    readRateInputSync?: boolean,
    generatePTS?: boolean,
    filterComplex?: string
}

export interface IInputParams {
    type: INPUT_TYPES
    otherParams: string[]
}

export interface IFilterParams {
    otherParams: string[]
}

export interface IOutputTypeParams {
    type: OUTPUT_TYPES
    otherParams: string[]
}
export interface IOutContainerParams {
    type: OUTPUT_CONTAINER
    otherParams: string[]
}
export interface IOutCodecParams {
    type: OUTPUT_CODEC
    otherParams: string[]
}



/*
    NONE = '',
    SRT = 'srt://',
    UDP = 'udp://',
    COLORBAR = 'smptehdbars',
    DECKLINK = 'xxx',
    NDI = 'NDI???',
    RTMP_S = 'TRMP?', 
    MPEG_TS = 'TSxxx',
    RTP_UDP = 'RTP-UDPxxx', 
*/
