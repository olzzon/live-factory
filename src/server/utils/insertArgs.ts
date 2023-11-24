import { ValueArg } from "../../interface/GenericInterfaces"

const insertArgs = (argArray: string[], valueArgs: ValueArg[]): string[] => {
    let returnArray = argArray
    valueArgs.forEach((value: ValueArg, index: number) => {
        const param: string = value?.valueArg?.join(' ') || ''
        returnArray = returnArray.map((str) => str.replace(`{arg${index}}`, param))
    })
    
    // Remove empty items:
    returnArray = returnArray.filter((item) => item !== '')

    //console.debug('insertArgs() returnArray : ', returnArray)
    return returnArray
}

export default insertArgs