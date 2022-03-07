// Node Modules:
const fs = require('fs')
const path = require('path')
const homeDir = require('os').homedir()

const STORAGE_NAME = 'stored-setup'

import { IFactory } from  '../../interface/redux/containersReducer'

export const loadFactories = (): IFactory[] => {
    let factories: IFactory[] = []
    try {
        factories = JSON.parse(
            fs.readFileSync(
                path.resolve(homeDir, 'live-factory', STORAGE_NAME + '.json')
            )
        )
    } catch (error) {
        console.error('Error loading factory list. Setting up empty list')
        return []
    }
    console.log('Factory list loaded')
    return factories
}

export const saveFactoriesList = (factories: IFactory[]) => {
    console.log('Saving factories')
    let json = JSON.stringify(factories)
    if (!fs.existsSync(path.resolve(homeDir, 'live-factory'))) {
        fs.mkdirSync(path.resolve(homeDir, 'live-factory'))
    }
    fs.writeFile(
        path.resolve(homeDir, 'live-factory', STORAGE_NAME + '.json'),
        json,
        'utf8',
        (error: any) => {
            if (error) {
                console.error('Error writing ' + STORAGE_NAME + '.json file')
                console.log('Error writing .json file: ', error)
            } else {
                console.info(STORAGE_NAME + '.json file updated')
            }
        }
    )
}
