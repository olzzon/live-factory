import { INPUT_TYPES, OUTPUT_ENCODER, OUTPUT_TYPES } from "../../interface/GenericInterfaces"
import { IAllowedInputTypes, IAllowedOutputEncoderTypes, IAllowedOutputTypes } from "../../interface/SettingsInterface"

export const extractListOfInputTypes = (): IAllowedInputTypes[] => {
    // convert all INPUT_TYPES to an array called inputTypes for a select list
    let inputTypes: IAllowedInputTypes[] = Object.keys(INPUT_TYPES).map((key) => ({ value: key , label: INPUT_TYPES[key as INPUT_TYPES] }));
    return inputTypes
}


export const extractListOfOutputTypes = (): IAllowedOutputTypes[] => {
    // convert all OUTPUT_TYPES to an array called outputTypes for a select list
    let outputTypes: IAllowedOutputTypes[] = Object.keys(OUTPUT_TYPES).map((key) => ({ value: key , label: OUTPUT_TYPES[key as OUTPUT_TYPES] }));
    return outputTypes
}

export const extractListOfOutputEncoderTypes = (): IAllowedOutputEncoderTypes[] => {
    // convert all OUTPUT_ENCODER to an array called outputEncoderTypes for a select list
    let outputEncoderTypes: IAllowedOutputEncoderTypes[] = Object.keys(OUTPUT_ENCODER).map((key) => ({ value: key , label: OUTPUT_ENCODER[key as OUTPUT_ENCODER] }));
    return outputEncoderTypes
}

