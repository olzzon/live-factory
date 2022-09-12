export interface ISettings {
    maxActiveEncoders: number;
    allowedInputTypes: IAllowedInputTypes[]
    allowedOutputTypes: IAllowedOutputTypes[]
    allowedOutputEncoderTypes: IAllowedOutputEncoderTypes[]
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