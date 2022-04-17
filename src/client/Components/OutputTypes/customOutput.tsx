import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	storeSetFilterParams,
	storeSetFilterParamString,
	storeSetGlobalOutParams,
	storeSetGlobalOutParamString,
	storeSetOutputParams,
	storeSetOutputParamString,
} from '../../../interface/redux/containerActions'
import { RootState } from '../../main'

interface ISrtProps {
	factoryId: number
}

const CustomOutputOptions: React.FC<ISrtProps> = (props) => {
	const dispatch = useDispatch()
	const id = props.factoryId

	const globalOut = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].globalOutput.paramArgs[0])
	const filter = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].filter.paramArgs[0])
	const output = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].output.paramArgs[0])

	useEffect(() => {
		//` -re -i srt://0.0.0.0:9998?pkt_size=1316&mode=listener -vcodec copy -acodec copy -strict -2 -y`))
		// MAC M1 : 
		//  ` -c:v h264_videotoolbox -b:v {arg0}k -pix_fmt yuv420p -acodec libopus -b:a {arg1}k`
		// CUDA Linux:
		//  ` -c:v h264_nvenc -preset llhq -zerolatency 1 -b:v 6000k -pix_fmt yuv420p `))
		dispatch(storeSetGlobalOutParamString(id, `{arg0}`))
		dispatch(storeSetFilterParamString(id, `{arg0}`))
		dispatch(storeSetOutputParamString(id, `{arg0}`))

		if (!globalOut) {
			dispatch(storeSetGlobalOutParams(id, 0, ``))
		}
		if (!output) {
			dispatch(storeSetOutputParams(id, 0, ` -f mpegts "srt://0.0.0.0:9998?pkt_size=1316&mode=listener" `))
		}
		if (!filter) {
			dispatch(storeSetFilterParams(id, 0, ` -c:v libx264 -preset veryfast -b:v 22000k -pix_fmt yuv420p -acodec libopus -b:a 256k`))
		}
	}, [])

	return (
		<div className="options">
			<label className="pipeline-label">
				GLOBAL OUT :
				<input
					className="input-text"
					type="text"
					value={globalOut ?? 'none'}
					onChange={(event) => dispatch(storeSetGlobalOutParams(id, 0, event.target.value))}
				/>
			</label>
			<label className="pipeline-label">
				FILTER :
				<input
					className="input-text"
					type="text"
					value={filter ?? 'none'}
					onChange={(event) => dispatch(storeSetFilterParams(id, 0, event.target.value))}
				/>
			</label>
			<label className="pipeline-label">
				OUTPUT :
				<input
					className="input-text"
					type="text"
					value={output ?? 'none'}
					onChange={(event) => dispatch(storeSetOutputParams(id, 0, event.target.value))}
				/>
			</label>
		</div>
	)
}

export default CustomOutputOptions
