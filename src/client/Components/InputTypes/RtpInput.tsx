import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	storeSetGlobalInParamString,
	storeSetInputParams,
} from '../../../interface/redux/containerActions'
import { RootState } from '../../main'

interface IRtpProps {
	factoryId: number
}

const RtpInputOptions: React.FC<IRtpProps> = (props) => {
	const dispatch = useDispatch()
	const id = props.factoryId

	const ip = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].input.paramArgs[0])
	const port = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].input.paramArgs[1])

	useEffect(() => {
		//` -re -i srt://0.0.0.0:9998?pkt_size=1316&mode=listener -vcodec copy -acodec copy -strict -2 -y`))
		dispatch(storeSetGlobalInParamString(id, ` -re -vsync 1 -hwaccel videotoolbox -adrift_threshold 0.06 -async 8000 `))
		if (!ip) {
			dispatch(storeSetInputParams(id, 0, '0.0.0.0'))
		}
		if (!port) {
			dispatch(storeSetInputParams(id, 1, '9998'))
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
		</div>
	)
}

export default RtpInputOptions
