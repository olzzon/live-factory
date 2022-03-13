import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	storeSetGlobalParams,
	storeSetInputParams,
} from '../../../interface/redux/containerActions'
import { RootState } from '../../main'

interface IMpegtsProps {
	factoryId: number
}

const MpegtsInputOptions: React.FC<IMpegtsProps> = (props) => {
	const dispatch = useDispatch()
	const id = props.factoryId

	const ip = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].input.params[1])
	const port = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].input.params[3])
	const fifoSize = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].input.params[5])

	useEffect(() => {
		dispatch(storeSetGlobalParams(id, 0, ' -re '))
		dispatch(storeSetInputParams(id, 0, '-hwaccel videotoolbox -vsync 0 -i udp://'))
		if (!ip) {
			dispatch(storeSetInputParams(id, 1, 'localhost'))
		}
		dispatch(storeSetInputParams(id, 2, ':'))
		if (!port) {
			dispatch(storeSetInputParams(id, 3, '1234'))
		}
		dispatch(storeSetInputParams(id, 4, '?fifo_size='))
		if (!fifoSize) {
			dispatch(storeSetInputParams(id, 5, '49152'))
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
					onChange={(event) => dispatch(storeSetInputParams(id, 1, event.target.value))}
				/>
			</label>
			<label className="pipeline-label">
				PORT :
				<input
					className="input-text"
					type="text"
					value={port}
					onChange={(event) => dispatch(storeSetInputParams(id, 3, event.target.value))}
				/>
			</label>
			<label className="pipeline-label">
				Buffer Size (fifo) :
				<input
					className="input-text"
					type="text"
					value={fifoSize}
					onChange={(event) => dispatch(storeSetInputParams(id, 5, event.target.value))}
				/>
			</label>
		</div>
	)
}

export default MpegtsInputOptions
