import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	storeSetGlobalInParamString,
	storeSetInputParams,
	storeSetInputParamString,
} from '../../../interface/redux/containerActions'
import { RootState } from '../../main'

interface ITcpProps {
	factoryId: number
}

const TcpInputOptions: React.FC<ITcpProps> = (props) => {
	const dispatch = useDispatch()
	const id = props.factoryId

	const ip = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].input.paramArgs[0])
	const port = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].input.paramArgs[1])
	const mode = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].input.paramArgs[2])

	useEffect(() => {
		//` -re -i srt://0.0.0.0:9998?pkt_size=1316&mode=listener -vcodec copy -acodec copy -strict -2 -y`))
		dispatch(storeSetGlobalInParamString(id, ` -hwaccel videotoolbox `))
		dispatch(storeSetInputParamString(id, `  -i tcp://{arg0}:{arg1}?{arg2}`))
		if (!ip) {
			dispatch(storeSetInputParams(id, 0, '0.0.0.0'))
		}
		if (!port) {
			dispatch(storeSetInputParams(id, 1, '9998'))
		}
		if (!mode) {
			dispatch(storeSetInputParams(id, 2, ' '))
		}
	}, [])

	return (
		<div className="options">
			<label className="pipeline-label">
				IP :
				<input
					className="input-text"
					type="text"
					value={ip ?? 'none'}
					onChange={(event) => dispatch(storeSetInputParams(id, 0, event.target.value))}
				/>
			</label>
			<label className="pipeline-label">
				Port :
				<input
					className="input-text"
					type="text"
					value={port ?? 'none'}
					onChange={(event) => dispatch(storeSetInputParams(id, 1, event.target.value))}
				/>
			</label>
			<label className="pipeline-label">
				Mode (listen or nothing) :
				<input
					className="input-text"
					type="text"
					value={mode ?? 0}
					onChange={(event) => dispatch(storeSetInputParams(id, 2, event.target.value))}
				/>
			</label>
		</div>
	)
}

export default TcpInputOptions
