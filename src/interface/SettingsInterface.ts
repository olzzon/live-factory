export interface ISettings {
    factoryList: IFactoryList[]
    maxActiveEncoders: number
    allowedInputTypes: IAllowedInputTypes[]
    allowedOutputTypes: IAllowedOutputTypes[]
    allowedOutputEncoderTypes: IAllowedOutputEncoderTypes[]
}

export interface IFactoryList {
    id: number,
    name: string,
    type: FACTORY_TYPES,
    url: string,
}

export enum FACTORY_TYPES {
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