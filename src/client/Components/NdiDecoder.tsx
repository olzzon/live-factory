import React, { useEffect } from 'react'

import { IFactory, OUTPUT_TYPES } from '../../interface/GenericInterfaces'
import '../styles/app.css'
import * as IO from '../../interface/SocketIOContants'
import FileInputOptions from './InputTypes/File'
import {
	storeClearFilterParams,
	storeClearGlobalParams,
	storeClearInputParams,
	storeClearOutputParams,
	storeSetContainerName,
	storeSetInputParams,
	storeSetOutputType,
} from '../../interface/redux/containerActions'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../main'
import SrtOutputOptions from './OutputTypes/SrtOutput'

export interface IfactoryId {
	factoryId: number
	socketClient: any
}

const NdiDecoder: React.FC<IfactoryId> = (props) => {
	const id = props.factoryId
	const dispatch = useDispatch()

	const factoryName = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].containerName)
	const ndiSource = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].input.params[1])
	const outputType = useSelector<RootState, OUTPUT_TYPES>((state) => state.ffmpeg[0].factory[id].output.type)
	const factory = useSelector<RootState, IFactory>((state) => state.ffmpeg[0].factory[id])

	useEffect(() => {
		if (!ndiSource) {
			dispatch(storeClearInputParams(id))
			dispatch(storeClearFilterParams(id))
			dispatch(storeSetInputParams(id, 0, ` -f libndi_newtek -i "`))
			dispatch(storeSetInputParams(id, 1, `CASPARCG (CCG Ch2)`))
			dispatch(storeSetInputParams(id, 2, `"`))
		}
	}, [])

	const handleSetOutputType = (event: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(storeClearGlobalParams(id))
		dispatch(storeClearOutputParams(id))
		dispatch(storeSetOutputType(id, event.target.value as OUTPUT_TYPES))
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
					NDI Source :
					<input
						className="input-text"
						type="text"
						value={ndiSource ?? ''}
						onChange={(event) => dispatch(storeSetInputParams(id, 1, event.target.value))}
					/>
				</label>
				<label className="pipeline-label">
					Output Type :
					<select
						value={outputType}
						onChange={(event) => {
							handleSetOutputType(event)
						}}
					>
						{Object.keys(OUTPUT_TYPES).map((key, index) => {
							return (
								<option key={index} value={key}>
									{key}
								</option>
							)
						})}
					</select>
				</label>
				{outputType === OUTPUT_TYPES.FILE ? <FileInputOptions factoryId={id} /> : null}
				{outputType === OUTPUT_TYPES.SRT ? <SrtOutputOptions factoryId={id} /> : null}
				<hr className="horizontal" />

				<div className="pipeline-footer">
					<button className="button" onClick={() => handleStopEncoder()}>
						STOP DECODER
					</button>
					<button className="button" onClick={() => handleStartEncoder()}>
						START DECODER
					</button>
				</div>
			</div>
		</React.Fragment>
	)
}

export default NdiDecoder
