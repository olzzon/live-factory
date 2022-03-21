import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	storeSetFilterParams,
	storeSetOutputParams,
} from '../../../interface/redux/containerActions'
import { RootState } from '../../main'

interface ISrtProps {
	factoryId: number
}

const SrtOutputOptions: React.FC<ISrtProps> = (props) => {
	const dispatch = useDispatch()
	const id = props.factoryId

	const vCodec = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].filter.params[0])
	const aCodec = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].filter.params[1])
	const ip = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].output.params[1])
	const port = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].output.params[3])
	const mode = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].output.params[5])


	useEffect(() => {
		//` -re -i srt://0.0.0.0:9998?pkt_size=1316&mode=listener -vcodec copy -acodec copy -strict -2 -y`))
		dispatch(storeSetOutputParams(id, 0, ` -f matroska "srt://`))
		dispatch(storeSetOutputParams(id, 2, `:`))
		dispatch(storeSetOutputParams(id, 4, `?pkt_size=1316&mode=`))
		if (!ip) {
			dispatch(storeSetOutputParams(id, 1, '0.0.0.0'))
		}
		if (!port) {
			dispatch(storeSetOutputParams(id, 3, '9998'))
		}
		if (!mode) {
			dispatch(storeSetOutputParams(id, 5, 'listener'))
		}
		if (!vCodec) {
			dispatch(storeSetFilterParams(id, 0, `  -c:v h264_videotoolbox -b:v 22000k -pix_fmt yuv420p `))
		}
		if (!aCodec) {
			dispatch(storeSetFilterParams(id, 1, `   -acodec libopus -b:a 256k `))	
		}
		dispatch(storeSetOutputParams(id, 6, '"'))
	}, [])

	return (
		<div className="options">
			<label className="pipeline-label">
				Video Codec :
				<input
					className="input-text"
					type="text"
					value={vCodec ?? 'none'}
					onChange={(event) => dispatch(storeSetFilterParams(id, 0, event.target.value))}
				/>
			</label>
			<label className="pipeline-label">
				Audio Codec :
				<input
					className="input-text"
					type="text"
					value={aCodec ?? 'none'}
					onChange={(event) => dispatch(storeSetFilterParams(id, 1, event.target.value))}
				/>
			</label>
			<label className="pipeline-label">
				IP :
				<input
					className="input-text"
					type="text"
					value={ip ?? 'none'}
					onChange={(event) => dispatch(storeSetOutputParams(id, 1, event.target.value))}
				/>
			</label>
			<label className="pipeline-label">
				Port :
				<input
					className="input-text"
					type="text"
					value={port ?? 'none'}
					onChange={(event) => dispatch(storeSetOutputParams(id, 3, event.target.value))}
				/>
			</label>
			<label className="pipeline-label">
				Mode (listener or caller) :
				<input
					className="input-text"
					type="text"
					value={mode ?? 0}
					onChange={(event) => dispatch(storeSetOutputParams(id, 5, event.target.value))}
				/>
			</label>
		</div>
	)
}

export default SrtOutputOptions
