import React from 'react'

import { INPUT_TYPES } from '../../interface/GenericInterfaces'
import '../styles/app.css'
import * as IO from '../../interface/SocketIOContants'
import FileInputOptions from './InputTypes/File'
import {
	storeClearGlobalParams,
	storeClearInputParams,
	storeSetContainerName,
	storeSetInputType,
	storeSetOutputParams,
} from '../../interface/redux/containerActions'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../main'
import { IFactory } from '../../interface/GenericInterfaces'
import ColorbarInputOptions from './InputTypes/ColorBar'
import MpegtsInputOptions from './InputTypes/Mpegts'
import SrtInputOptions from './InputTypes/SrtInput'

export interface IfactoryId {
	factoryId: number
	socketClient: any
}

const NdiEncoder: React.FC<IfactoryId> = (props) => {
	const id = props.factoryId
	const dispatch = useDispatch()

	const factoryName = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].containerName)
	const inputType = useSelector<RootState, INPUT_TYPES>((state) => state.ffmpeg[0].factory[id].input.type)
	const outputName = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].output.params[1])
	const factory = useSelector<RootState, IFactory>((state) => state.ffmpeg[0].factory[id])

	const handleSetInputType = (event: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(storeClearGlobalParams(id))
		dispatch(storeClearInputParams(id))
		dispatch(storeSetInputType(id, event.target.value as INPUT_TYPES))
	}

	const handleStartEncoder = () => {
		console.log('starting encoder index :', id)
		props.socketClient.emit(IO.START_ENCODER, id, factory)
	}

	const handleStopEncoder = () => {
		props.socketClient.emit(IO.UPDATE_FACTORY, id, factory)
		props.socketClient.emit(IO.STOP_ENCODER, id)
	}

	return (
		<React.Fragment>
			<div className="pipeline">
				<label className="pipeline-label">
					Pipeline Name :
					<input
						className="input-text"
						type="text"
						value={factoryName ?? ''}
						onChange={(event) => dispatch(storeSetContainerName(id, event.target.value))}
					/>
				</label>
				<hr className="horizontal" />
				<label className="pipeline-label">
					Input Type :
					<select
						value={inputType}
						onChange={(event) => {
							handleSetInputType(event)
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
				{inputType === INPUT_TYPES.SRT ? <SrtInputOptions factoryId={id} /> : null}
				<hr className="horizontal" />
				<label className="pipeline-label">
					NDI Name :
					<input
						className="input-text"
						type="text"
						value={outputName ?? ''}
						onChange={(event) => dispatch(storeSetOutputParams(id, 1, event.target.value))}
					/>
				</label>
				<div className="pipeline-footer">
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
