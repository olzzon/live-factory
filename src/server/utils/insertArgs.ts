const insertArgs = (argArray: string[], paramArgs: string[]): string[] => {
    let returnArray = argArray
    paramArgs.forEach((param: string, index: number) => {
        returnArray = returnArray.map((str) => str.replace(`{arg${index}}`, param))
    })
    console.debug('insertArgs() returnArray : ', returnArray)
    return returnArray
}

export default insertArgs