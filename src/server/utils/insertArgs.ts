const insertArgs = (argString: string, paramArgs: string[]) => {
    let returnString = argString
    paramArgs.forEach((param: string, index: number) => {
        returnString = returnString.replace(`{arg${index}}`, param)
    })
    console.log('insertArgs() argString : ', argString, 'paramArgs :', paramArgs)
    console.log('insertArgs() returnString : ', returnString)
    return returnString
}

export default insertArgs