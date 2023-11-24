import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	storeSetFilterValue,
	storeSetFilterParamArr,
	storeSetGlobalOutValue,
	storeSetGlobalOutParamArr,
	storeSetOutputValue,
	storeSetOutputParamArr,
	storeSetDockerOutputPorts,
} from '../../../interface/redux/containerActions'
import { RootState } from '../../main'
import { ValueArg } from '../../../interface/GenericInterfaces'

interface ISrtProps {
	pipelineId: number
}

const CustomOutputOptions: React.FC<ISrtProps> = (props) => {
	const dispatch = useDispatch()
	const id = props.pipelineId
	const [collapse, setCollapse] = useState(false)

	const globalOut = useSelector<RootState, ValueArg>((state) => state.ffmpeg[0].pipeline[id].globalOutput.valueArgs[0])
	const filter = useSelector<RootState, ValueArg>((state) => state.ffmpeg[0].pipeline[id].filter.valueArgs[0])
	const audioFilter = useSelector<RootState, ValueArg>((state) => state.ffmpeg[0].pipeline[id].audioFilter.valueArgs[0])
	const output = useSelector<RootState, ValueArg>((state) => state.ffmpeg[0].pipeline[id].output.valueArgs[0])

	useEffect(() => {
		//` -re -i srt://0.0.0.0:9998?pkt_size=1316&mode=listener -vcodec copy -acodec copy -strict -2 -y`))
		// MAC M1 :
		//  ` -c:v h264_videotoolbox -b:v {arg0}k -pix_fmt yuv420p -acodec libopus -b:a {arg1}k`
		// CUDA Linux:
		//  ` -c:v h264_nvenc -preset llhq -zerolatency 1 -b:v 6000k -pix_fmt yuv420p `))
		dispatch(storeSetGlobalOutParamArr(id, ['{arg0}']))
		dispatch(storeSetFilterParamArr(id, ['{arg0}']))
		dispatch(storeSetOutputParamArr(id, ['{arg0}']))
		dispatch(storeSetDockerOutputPorts(id, []))

		if (!globalOut) {
			dispatch(storeSetGlobalOutValue(id, 0, { valueArg: [] }))
		}
		if (!output) {
			dispatch(storeSetOutputValue(id, 0, { valueArg: ['-f', 'mpegts', '"srt://0.0.0.0:9998?pkt_size=1316&mode=listener"'] }))
		}
		if (!filter) {
			dispatch(
				storeSetFilterValue(
					id,
					0,
					{ valueArg: ['-c:v', 'libx264', '-preset', 'veryfast', '-b:v', '22000k', '-pix_fmt', 'yuv420p', '-acodec', 'libopus', '-b:a 256k'] }
				)
			)
		}
	}, [])

	return (
		<div>
			<div className={collapse ? 'options-collapse' : 'options'}>
				<label className="pipeline-label">
					<button className='collapse-button' onClick={() => setCollapse(!collapse)}>{collapse ? `-` : `+`}</button>
					GLOBAL OUT :
					<input
						className="input-text"
						type="text"
						value={globalOut?.valueArg ?? 'none'}
						onChange={(event) => dispatch(storeSetGlobalOutValue(id, 0, { valueArg: [event.target.value]}))}
					/>
				</label>
				<label className="pipeline-label">
					FILTER :
					<input
						className="input-text"
						type="text"
						value={filter?.valueArg ?? 'none'}
						onChange={(event) => dispatch(storeSetFilterValue(id, 0, { valueArg: [event.target.value]}))}
					/>
				</label>
				<label className="pipeline-label">
					OUTPUT :
					<input
						className="input-text"
						type="text"
						value={output?.valueArg ?? 'none'}
						onChange={(event) => dispatch(storeSetOutputValue(id, 0, { valueArg: [event.target.value]}))}
					/>
				</label>
			</div>
		</div>
	)
}

export default CustomOutputOptions
