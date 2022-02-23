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

export interface IFFmpegCommand {
    global: IGlobalParams
    input: IInputParams
    filter: IFilterParams
    output: IOutputParams
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

export interface IOutputParams {
    type: OUTPUT_TYPES
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
