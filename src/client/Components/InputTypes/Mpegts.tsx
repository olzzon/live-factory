import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	storeSetGlobalInParamString,
	storeSetInputParams,
	storeSetInputParamString,
} from '../../../interface/redux/containerActions'
import { RootState } from '../../main'

interface IMpegtsProps {
	factoryId: number
}

const MpegtsInputOptions: React.FC<IMpegtsProps> = (props) => {
	const dispatch = useDispatch()
	const id = props.factoryId

	const ip = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].input.paramArgs[0])
	const port = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].input.paramArgs[1])
	const fifoSize = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].input.paramArgs[2])

	useEffect(() => {
		dispatch(storeSetGlobalInParamString(id, ' -re -hwaccel videotoolbox -vsync 0 '))
		dispatch(storeSetInputParamString(id, ' -i udp://{arg0}:{arg1}?fifo_size={arg2}'))
		if (!ip) {
			dispatch(storeSetInputParams(id, 0, 'localhost'))
		}
		if (!port) {
			dispatch(storeSetInputParams(id, 1, '1234'))
		}
		if (!fifoSize) {
			dispatch(storeSetInputParams(id, 2, '49152'))
		}
	}, [])

	return (
		<div className="options">
			<label className="pipeline-label">
				IP :
				<input
					className="input-text"
					type="text"
					value={ip}
					onChange={(event) => dispatch(storeSetInputParams(id, 0, event.target.value))}
				/>
			</label>
			<label className="pipeline-label">
				PORT :
				<input
					className="input-text"
					type="text"
					value={port}
					onChange={(event) => dispatch(storeSetInputParams(id, 1, event.target.value))}
				/>
			</label>
			<label className="pipeline-label">
				Buffer Size (fifo) :
				<input
					className="input-text"
					type="text"
					value={fifoSize}
					onChange={(event) => dispatch(storeSetInputParams(id, 2, event.target.value))}
				/>
			</label>
		</div>
	)
}

export default MpegtsInputOptions
