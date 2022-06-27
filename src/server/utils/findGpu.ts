const os = require('os')

export const findGpu = (): string => {
    return os.type()
}