import { combineReducers } from 'redux'
import { ffmpeg } from './containersReducer'

const indexReducer = combineReducers({
    ffmpeg: ffmpeg,
})

export default indexReducer
