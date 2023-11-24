import { ValueArg } from "../../interface/GenericInterfaces"

const insertArgsToString = (argArray: string[], valueArgs: ValueArg[]): string => {
    let returnArray = argArray
    valueArgs.forEach((value: ValueArg, index: number) => {
        const param: string = value?.valueArg?.join(' ') || ''
        returnArray = returnArray.map((str) => str.replace(`{arg${index}}`, param))
    })
    console.debug('insertArgs() returnString : ', returnArray)
    return returnArray.flat().join(' ')
}

export default insertArgsToString