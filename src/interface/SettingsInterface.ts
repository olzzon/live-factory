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
    imageName?: string
    host?: string
    port?: number
    hwaccel: GPU_TYPES
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

export enum GPU_TYPES {
    NVIDIA,
    MAC,
    NONE
}