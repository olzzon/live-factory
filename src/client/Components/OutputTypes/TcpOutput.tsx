import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	storeSetGlobalOutParamArr,
	storeSetOutputValue,
	storeSetOutputParamArr,
	storeSetDockerOutputPorts,
} from '../../../interface/redux/containerActions'
import { Settings } from '../../../interface/SettingsInterface'
import { RootState } from '../../main'
import CodecTypes from './CodecTypes/CodecTypes'
import { parseGlobalOutParamsToTranscoder, parseOutputParamsToTranscoder } from '../../utils/parseParamsToTranscoder'
import { OUTPUT_PARAMS, ValueArg } from '../../../interface/GenericInterfaces'

interface ITcpProps {
	pipelineId: number
	settings: Settings
}

const TcpOutputOptions: React.FC<ITcpProps> = (props) => {
	const dispatch = useDispatch()
	const id = props.pipelineId
	const [collapse, setCollapse] = useState(false)

	const ip = useSelector<RootState, ValueArg>((state) => state.ffmpeg[0].pipeline[id].output.valueArgs[0])
	const port = useSelector<RootState, ValueArg>((state) => state.ffmpeg[0].pipeline[id].output.valueArgs[1])
	const mode = useSelector<RootState, ValueArg>((state) => state.ffmpeg[0].pipeline[id].output.valueArgs[2])

	useEffect(() => {
		//` -re -i srt://0.0.0.0:9998?pkt_size=1316&mode=listener -vcodec copy -acodec copy -strict -2 -y`))
		// MAC M1 :
		//  ` -c:v h264_videotoolbox -b:v {arg0}k -pix_fmt yuv420p -acodec libopus -b:a {arg1}k`
		// CUDA Linux:
		//  ` -c:v h264_nvenc -preset llhq -zerolatency 1 -b:v 6000k -pix_fmt yuv420p `))

		dispatch(storeSetGlobalOutParamArr(id, parseGlobalOutParamsToTranscoder(props.settings.outputParams, OUTPUT_PARAMS.TCP)))
		dispatch(storeSetOutputParamArr(id, parseOutputParamsToTranscoder(props.settings.outputParams, OUTPUT_PARAMS.TCP)))


		if (!ip) {
			dispatch(storeSetOutputValue(id, 0, { valueArg: ['0.0.0.0']}))
		}
		if (!port) {
			dispatch(storeSetOutputValue(id, 1, { valueArg: ['9998']}))
			dispatch(storeSetDockerOutputPorts(id, [{ip: '0.0.0.0', port: '9998', protocol: 'tcp'}]))
		}
		if (!mode) {
			dispatch(storeSetOutputValue(id, 2, { valueArg: ['listen']}))
		}
	}, [])

	const handlePortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(storeSetOutputValue(id, 1, { valueArg: [event.target.value]}))
		dispatch(storeSetDockerOutputPorts(id, [{ip: '0.0.0.0', port: event.target.value, protocol: 'tcp'}]))
	}


	return (
		<div>
			<div className={collapse ? 'options-collapse' : 'options'}>
				<label className="pipeline-label">
					<button className='collapse-button' onClick={() => setCollapse(!collapse)}>{collapse ? `-` : `+`}</button>
					IP :
					<input
						className="input-text"
						type="text"
						value={ip?.valueArg ?? 'none'}
						onChange={(event) => dispatch(storeSetOutputValue(id, 0, { valueArg: [event.target.value]}))}
					/>
				</label>
				<label className="pipeline-label">
					Port :
					<input
						className="input-text"
						type="text"
						value={port?.valueArg ?? 'none'}
						onChange={(event) => handlePortChange(event)}
					/>
				</label>
				<label className="pipeline-label">
					Mode (listen or nothing) :
					<input
						className="input-text"
						type="text"
						value={mode?.valueArg ?? 0}
						onChange={(event) => dispatch(storeSetOutputValue(id, 2, { valueArg: [event.target.value]}))}
					/>
				</label>
			</div>
			<CodecTypes pipelineId={id} settings={props.settings} />
		</div>
	)
}

export default TcpOutputOptions
