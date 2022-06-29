const insertArgs = (argString: string, paramArgs: string[]) => {
    let returnString = argString
    paramArgs.forEach((param: string, index: number) => {
        returnString = returnString.replace(`{arg${index}}`, param)
    })
    console.debug('insertArgs() argString : ', argString, 'paramArgs :', paramArgs)
    console.debug('insertArgs() returnString : ', returnString)
    return returnString
}

export default insertArgs