import { INPUT_PARAMS, OUTPUT_ENCODER, OUTPUT_PARAMS } from "../../interface/GenericInterfaces"
import { AllowedInputTypes, AllowedOutputEncoderTypes, AllowedOutputTypes } from "../../interface/SettingsInterface"

export const extractListOfInputTypes = (): AllowedInputTypes[] => {
    // convert all INPUT_TYPES to an array called inputTypes for a select list
    let inputTypes: AllowedInputTypes[] = Object.keys(INPUT_PARAMS).map((key) => ({ value: key , label: INPUT_PARAMS[key as INPUT_PARAMS] }));
    return inputTypes
}


export const extractListOfOutputTypes = (): AllowedOutputTypes[] => {
    // convert all OUTPUT_TYPES to an array called outputTypes for a select list
    let outputTypes: AllowedOutputTypes[] = Object.keys(OUTPUT_PARAMS).map((key) => ({ value: key , label: OUTPUT_PARAMS[key as OUTPUT_PARAMS] }));
    return outputTypes
}

export const extractListOfOutputEncoderTypes = (): AllowedOutputEncoderTypes[] => {
    // convert all OUTPUT_ENCODER to an array called outputEncoderTypes for a select list
    let outputEncoderTypes: AllowedOutputEncoderTypes[] = Object.keys(OUTPUT_ENCODER).map((key) => ({ value: key , label: OUTPUT_ENCODER[key as OUTPUT_ENCODER] }));
    return outputEncoderTypes
}

