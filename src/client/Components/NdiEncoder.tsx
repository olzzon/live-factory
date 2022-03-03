import React, { useEffect } from 'react'
import io from 'socket.io-client'

import {
	INPUT_TYPES,
} from '../../interface/GenericInterfaces'
import '../styles/app.css'
import * as IO from '../../interface/SocketIOContants'
import FileInputOptions from './InputTypes/File'
import { storeSetInputType, storeSetOutputParams } from '../../interface/redux/containerActions'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../main'
import { IFactory } from '../../interface/redux/containersReducer'
import ColorbarInputOptions from './InputTypes/ColorBar'
import MpegtsInputOptions from './InputTypes/Mpegts'
const socketClient = io()

const NdiEncoder = () => {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(storeSetOutputParams(0, 0, ` -f libndi_newtek -pix_fmt uyvy422 `))
		dispatch(storeSetOutputParams(0, 1, `NDI_PIPE_1`))
	}, [])

	const inputType = useSelector<RootState, INPUT_TYPES>((state) => state.ffmpeg[0].factory[0].input.type)
	const outputName = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[0].output.params[1])
	const fullState = useSelector<RootState, IFactory>((state) => state.ffmpeg[0].factory[0])

	const handleStartNdi = () => {
		socketClient.emit(IO.START_FFMPEG, fullState)
	}

	return (
		<React.Fragment>
			<div className="pipeline">
				<label>
					SELECT INPUT TYPE :
					<select
						value={inputType}
						onChange={(event) => {
							dispatch(storeSetInputType(0, event.target.value as INPUT_TYPES))
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
				{inputType === INPUT_TYPES.FILE ? <FileInputOptions factoryId={0} /> : null}
				{inputType === INPUT_TYPES.COLORBAR ? <ColorbarInputOptions factoryId={0} /> : null}
				{inputType === INPUT_TYPES.MPEG_TS ? <MpegtsInputOptions factoryId={0} /> : null}
				<hr className="horizontal" />
				<label>
					NDI Name :
					<input
						className=""
						type="text"
						value={outputName}
						onChange={(event) => dispatch(storeSetOutputParams(0, 1, event.target.value))}
					/>
				</label>

				<button className="button" onClick={() => handleStartNdi()}>
					START NDI ENCODER
				</button>
				<label className="debugger">Factory debug :</label>
			</div>
		</React.Fragment>
	)
}

export default NdiEncoder
