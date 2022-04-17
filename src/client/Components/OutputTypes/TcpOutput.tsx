import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	storeSetFilterParams,
	storeSetFilterParamString,
	storeSetGlobalOutParamString,
	storeSetOutputParams,
	storeSetOutputParamString,
} from '../../../interface/redux/containerActions'
import { RootState } from '../../main'

interface ITcpProps {
	factoryId: number
}

const TcpOutputOptions: React.FC<ITcpProps> = (props) => {
	const dispatch = useDispatch()
	const id = props.factoryId

	const vBandwidth = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].filter.paramArgs[0])
	const aBandwidth = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].filter.paramArgs[1])
	const ip = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].output.paramArgs[0])
	const port = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].output.paramArgs[1])
	const mode = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].output.paramArgs[2])


	useEffect(() => {
		//` -re -i srt://0.0.0.0:9998?pkt_size=1316&mode=listener -vcodec copy -acodec copy -strict -2 -y`))
		// MAC M1 : 
		//  ` -c:v h264_videotoolbox -b:v {arg0}k -pix_fmt yuv420p -acodec libopus -b:a {arg1}k`
		// CUDA Linux:
		//  ` -c:v h264_nvenc -preset llhq -zerolatency 1 -b:v 6000k -pix_fmt yuv420p `))

		dispatch(storeSetGlobalOutParamString(id, ` `))
		dispatch(storeSetFilterParamString(id, ` -c:v h264_videotoolbox -b:v {arg0}k -pix_fmt yuv420p -acodec libopus -b:a {arg1}k`))
		dispatch(storeSetOutputParamString(id, ` -f matroska "tcp://{arg0}:{arg1}?{arg2}" `))

		if (!ip) {
			dispatch(storeSetOutputParams(id, 0, '0.0.0.0'))
		}
		if (!port) {
			dispatch(storeSetOutputParams(id, 1, '9998'))
		}
		if (!mode) {
			dispatch(storeSetOutputParams(id, 2, 'listen'))
		}
		if (!vBandwidth) {
			dispatch(storeSetFilterParams(id, 0, `22000`))
		}
		if (!aBandwidth) {
			dispatch(storeSetFilterParams(id, 1, `256`))	
		}
	}, [])

	return (
		<div className="options">
			<label className="pipeline-label">
				Video Bandwidth (in kbit/s) :
				<input
					className="input-number"
					type="number"
					value={vBandwidth ?? '22000'}
					onChange={(event) => dispatch(storeSetFilterParams(id, 0, event.target.value))}
				/>
			</label>
			<label className="pipeline-label">
				Audio Bandwidth (in kbit/s) :
				<input
					className="input-number"
					type="number"
					value={aBandwidth ?? '256'}
					onChange={(event) => dispatch(storeSetFilterParams(id, 1, event.target.value))}
				/>
			</label>
			<label className="pipeline-label">
				IP :
				<input
					className="input-text"
					type="text"
					value={ip ?? 'none'}
					onChange={(event) => dispatch(storeSetOutputParams(id, 0, event.target.value))}
				/>
			</label>
			<label className="pipeline-label">
				Port :
				<input
					className="input-text"
					type="text"
					value={port ?? 'none'}
					onChange={(event) => dispatch(storeSetOutputParams(id, 1, event.target.value))}
				/>
			</label>
			<label className="pipeline-label">
				Mode (listen or nothing) :
				<input
					className="input-text"
					type="text"
					value={mode ?? 0}
					onChange={(event) => dispatch(storeSetOutputParams(id, 2, event.target.value))}
				/>
			</label>
		</div>
	)
}

export default TcpOutputOptions
