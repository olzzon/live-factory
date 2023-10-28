// Node Modules:
const fs = require('fs')
const path = require('path')
const homeDir = require('os').homedir()

const STORAGE_NAME = 'stored-setup'
const SETTINGS_NAME = 'settings.json'

import { IFactory } from '../../interface/GenericInterfaces'
import { ISettings, NODE_TYPES } from '../../interface/SettingsInterface'
import { extractListOfInputTypes, extractListOfOutputEncoderTypes, extractListOfOutputTypes } from './createListFromTypes'

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

export const loadSettings = () => {
    let settings: ISettings
    try {
        settings = JSON.parse(
            fs.readFileSync(
                path.resolve(homeDir, 'live-factory', SETTINGS_NAME)
            )
        )
    } catch (error) {
        console.error('Error loading settings. Setting up default settings')
        settings = {
            maxActiveEncoders: 1,
            nodeList: [{ name: 'FFmpeg local', type: NODE_TYPES.FFMPEG, url: '/usr/bin/ffmpeg' },
            { name: 'Docker FFmpeg local', type: NODE_TYPES.DOCKER, url: '/var/run/docker.sock', containerName: 'jrottenberg/ffmpeg' },
            { name: 'Docker FFmpeg remote', type: NODE_TYPES.DOCKER, url: 'http://xx.xx.xx.xx:2375', containerName: 'jrottenberg/ffmpeg' }],
            allowedInputTypes: extractListOfInputTypes(),
            allowedOutputTypes: extractListOfOutputTypes(),
            allowedOutputEncoderTypes: extractListOfOutputEncoderTypes(),
        }
        saveSettings(settings)
        return settings
    }
    console.log('Settings loaded')
    return settings
}

export const saveSettings = (settings: ISettings) => {
    console.log('Saving settings')
    let json = JSON.stringify(settings)
    if (!fs.existsSync(path.resolve(homeDir, 'live-factory'))) {
        fs.mkdirSync(path.resolve(homeDir, 'live-factory'))
    }
    fs.writeFile(
        path.resolve(homeDir, 'live-factory', SETTINGS_NAME),
        json,
        'utf8',
        (error: any) => {
            if (error) {
                console.error('Error writing ' + SETTINGS_NAME + ' file')
                console.log('Error writing .json file: ', error)
            } else {
                console.info(SETTINGS_NAME + ' file updated')
            }
        }
    )
}
