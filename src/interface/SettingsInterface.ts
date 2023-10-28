export interface ISettings {
    nodeList: NodeList[]
    maxActiveEncoders: number
    allowedInputTypes: IAllowedInputTypes[]
    allowedOutputTypes: IAllowedOutputTypes[]
    allowedOutputEncoderTypes: IAllowedOutputEncoderTypes[]
}

export interface NodeList {
    name: string,
    type: NODE_TYPES,
    path?: string,
    containerName?: string
    host?: string
    port?: number
}

export enum NODE_TYPES {
    FFMPEG = 'FFMPEG',
    DOCKER = 'DOCKER'
}

export interface IAllowedInputTypes {
    value: string
    label: string
}

export interface IAllowedOutputTypes {
    value: string
    label: string
}

export interface IAllowedOutputEncoderTypes {
    value: string
    label: string
}