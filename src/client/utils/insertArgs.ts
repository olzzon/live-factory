const insertArgsToString = (argArray: string[], paramArgs: string[]): string => {
    let returnArray = argArray
    paramArgs.forEach((param: string, index: number) => {
        returnArray = returnArray.map((str) => str.replace(`{arg${index}}`, param))
    })
    console.debug('insertArgs() returnString : ', returnArray)
    return returnArray.flat().join(' ')
}

export default insertArgsToString