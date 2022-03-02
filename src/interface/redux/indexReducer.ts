import { combineReducers } from 'redux'
import { IFFmpegContainer, settings } from './containersReducer'

export interface IStore {
    settings: Array<IFFmpegContainer>
}

const indexReducer = combineReducers({
    settings,
})

export default indexReducer
