// Node Modules:
const fs = require('fs')
const path = require('path')
const homeDir = require('os').homedir()

const STORAGE_NAME = 'stored-setup'
const SETTINGS_NAME = 'settings.json'

import { Pipeline } from '../../interface/GenericInterfaces'
import { GPU_TYPES, ISettings, NODE_TYPES } from '../../interface/SettingsInterface'
import { extractListOfInputTypes, extractListOfOutputEncoderTypes, extractListOfOutputTypes } from './createListFromTypes'

export const loadPipelines = (): Pipeline[] => {
    let pipelines: Pipeline[] = []
    try {
        pipelines = JSON.parse(
            fs.readFileSync(
                path.resolve(homeDir, 'live-factory', STORAGE_NAME + '.json')
            )
        )
    } catch (error) {
        console.error('Error loading pipeline list. Setting up empty list')
        return []
    }
    console.log('Factory list loaded')
    return pipelines
}

export const savePipelineList = (pipelines: Pipeline[]) => {
    console.log('Saving pipelines')
    let json = JSON.stringify(pipelines)
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
            nodeList: [{ name: 'FFmpeg local', type: NODE_TYPES.FFMPEG, path: '/usr/bin/ffmpeg', hwaccel: GPU_TYPES.NONE },
            { name: 'Node 01 (Docker API)', type: NODE_TYPES.DOCKER, host: '192.168.211.144', port:4243, imageName: 'jrottenberg/ffmpeg', hwaccel: GPU_TYPES.NONE },
            { name: 'Node 02 (Docker API)', type: NODE_TYPES.DOCKER, host: '192.168.211.145', port:4243, imageName: 'jrottenberg/ffmpeg:4.1-nvidia', hwaccel: GPU_TYPES.NVIDIA }],
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
