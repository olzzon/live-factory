const insertArgs = (argArray: string[], paramArgs: string[]): string[] => {
    let returnArray = argArray
    paramArgs.forEach((param: string, index: number) => {
        param = param?.replace(' ', '')
        returnArray = returnArray.map((str) => str.replace(`{arg${index}}`, param))
    })
    
    // Remove empty items:
    returnArray = returnArray.filter((item) => item !== '')

    //console.debug('insertArgs() returnArray : ', returnArray)
    return returnArray
}

export default insertArgs