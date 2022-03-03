import { combineReducers } from 'redux'
import { IFactory, ffmpeg } from './containersReducer'

export interface IStore {
    settings: Array<IFactory>
}

const indexReducer = combineReducers({
    ffmpeg: ffmpeg,
})

export default indexReducer
