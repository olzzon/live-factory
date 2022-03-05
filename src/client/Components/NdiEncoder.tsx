import React, { useEffect } from 'react'
import io from 'socket.io-client'

import { INPUT_TYPES } from '../../interface/GenericInterfaces'
import '../styles/app.css'
import * as IO from '../../interface/SocketIOContants'
import FileInputOptions from './InputTypes/File'
import { storeSetContainerName, storeSetInputType, storeSetOutputParams } from '../../interface/redux/containerActions'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../main'
import { IFactory } from '../../interface/redux/containersReducer'
import ColorbarInputOptions from './InputTypes/ColorBar'
import MpegtsInputOptions from './InputTypes/Mpegts'
const socketClient = io()

export interface IfactoryId {
	factoryId: number
}

const NdiEncoder: React.FC<IfactoryId> = (props) => {
	const id = props.factoryId
	const dispatch = useDispatch()

	const factoryName = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].containerName)
	const inputType = useSelector<RootState, INPUT_TYPES>((state) => state.ffmpeg[0].factory[id].input.type)
	const outputName = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].output.params[1])
	const fullState = useSelector<RootState, IFactory>((state) => state.ffmpeg[0].factory[id])

	const handleStartEncoder = () => {
		socketClient.emit(IO.START_ENCODER, id, fullState)
	}

	const handleStopEncoder = () => {
		socketClient.emit(IO.STOP_ENCODER, id)
	}

	return (
		<React.Fragment>
			<div className='pipeline'>
				<label className='pipeline-label'>
					Pipeline Name :
					<input
						className="input-text"
						type="text"
						value={factoryName ?? ''}
						onChange={(event) => dispatch(storeSetContainerName(id, event.target.value))}
					/>
				</label>
				<hr className="horizontal" />
				<label className='pipeline-label'>
					Input Type :
					<select
						value={inputType}
						onChange={(event) => {
							dispatch(storeSetInputType(id, event.target.value as INPUT_TYPES))
						}}
					>
						{Object.keys(INPUT_TYPES).map((key, index) => {
							return (
								<option key={index} value={key}>
									{key}
								</option>
							)
						})}
					</select>
				</label>
				{inputType === INPUT_TYPES.FILE ? <FileInputOptions factoryId={id} /> : null}
				{inputType === INPUT_TYPES.COLORBAR ? <ColorbarInputOptions factoryId={id} /> : null}
				{inputType === INPUT_TYPES.MPEG_TS ? <MpegtsInputOptions factoryId={id} /> : null}
				<hr className="horizontal" />
				<label className='pipeline-label'>
					NDI Name :
					<input
						className="input-text"
						type="text"
						value={outputName ?? ''}
						onChange={(event) => dispatch(storeSetOutputParams(id, 1, event.target.value))}
					/>
				</label>
				<div  className='pipeline-footer'>
					<button className="button" onClick={() => handleStopEncoder()}>
						STOP ENCODER
					</button>
					<button className="button" onClick={() => handleStartEncoder()}>
						START ENCODER
					</button>
				</div>
			</div>
		</React.Fragment>
	)
}

export default NdiEncoder
