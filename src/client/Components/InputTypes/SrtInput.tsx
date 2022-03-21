import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	storeSetGlobalParams,
	storeSetInputParams,
} from '../../../interface/redux/containerActions'
import { RootState } from '../../main'

interface ISrtProps {
	factoryId: number
}

const SrtInputOptions: React.FC<ISrtProps> = (props) => {
	const dispatch = useDispatch()
	const id = props.factoryId

	const frameRate = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].global.params[1])
	const ip = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].input.params[1])
	const port = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].input.params[3])
	const mode = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].input.params[5])

	useEffect(() => {
		//` -re -i srt://0.0.0.0:9998?pkt_size=1316&mode=listener -vcodec copy -acodec copy -strict -2 -y`))
		dispatch(storeSetGlobalParams(id, 0, ``))
		dispatch(storeSetGlobalParams(id, 1, ``))
		dispatch(storeSetInputParams(id, 0, ` -hwaccel videotoolbox -i "srt://`))
		dispatch(storeSetInputParams(id, 2, `:`))
		dispatch(storeSetInputParams(id, 4, `?pkt_size=1316&mode=`))
		if (!ip) {
			dispatch(storeSetInputParams(id, 1, '0.0.0.0'))
		}
		if (!port) {
			dispatch(storeSetInputParams(id, 3, '9998'))
		}
		if (!mode) {
			dispatch(storeSetInputParams(id, 5, 'caller'))
		}
		dispatch(storeSetInputParams(id, 6, '"'))
	}, [])

	return (
		<div className="options">
			<label className="pipeline-label">
				IP :
				<input
					className="input-text"
					type="text"
					value={ip ?? 'none'}
					onChange={(event) => dispatch(storeSetInputParams(id, 1, event.target.value))}
				/>
			</label>
			<label className="pipeline-label">
				Port :
				<input
					className="input-text"
					type="text"
					value={port ?? 'none'}
					onChange={(event) => dispatch(storeSetInputParams(id, 3, event.target.value))}
				/>
			</label>
			<label className="pipeline-label">
				Mode (listener or caller) :
				<input
					className="input-text"
					type="text"
					value={mode ?? 0}
					onChange={(event) => dispatch(storeSetInputParams(id, 5, event.target.value))}
				/>
			</label>
			<label className="pipeline-label">
				Frame rate (NOT IN USE) :
				<input
					className="input-text"
					type="text"
					value={frameRate ?? 'r 50'}
					onChange={(event) => dispatch(storeSetGlobalParams(id, 1, event.target.value))}
				/>
			</label>
		</div>
	)
}

export default SrtInputOptions
