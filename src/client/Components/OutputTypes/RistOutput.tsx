import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	storeSetGlobalOutParamArr,
	storeSetOutputValue,
	storeSetOutputParamArr,
	storeSetDockerOutputPorts,
} from '../../../interface/redux/containerActions'
import { Settings, SettingsOutputParam } from '../../../interface/SettingsInterface'
import { RootState } from '../../main'
import CodecTypes from './CodecTypes/CodecTypes'
import { parseGlobalOutParamsToTranscoder, parseOutputParamsToTranscoder } from '../../utils/parseParamsToTranscoder'
import { OUTPUT_PARAMS, ValueArg } from '../../../interface/GenericInterfaces'

interface RistProps {
	pipelineId: number
	settings: Settings
}

const RistOutputOptions: React.FC<RistProps> = (props) => {
	const dispatch = useDispatch()
	const id = props.pipelineId
	const [collapse, setCollapse] = useState(false)

	const ip = useSelector<RootState, ValueArg>((state) => state.ffmpeg[0].pipeline[id].output.valueArgs[0])
	const port = useSelector<RootState, ValueArg>((state) => state.ffmpeg[0].pipeline[id].output.valueArgs[1])
	const cname = useSelector<RootState, ValueArg>((state) => state.ffmpeg[0].pipeline[id].output.valueArgs[2])

	useEffect(() => {
		dispatch(storeSetGlobalOutParamArr(id, parseGlobalOutParamsToTranscoder(props.settings.outputParams, OUTPUT_PARAMS.RIST)))
		dispatch(storeSetOutputParamArr(id, parseOutputParamsToTranscoder(props.settings.outputParams, OUTPUT_PARAMS.RIST)))

		if (!ip) {
			dispatch(storeSetOutputValue(id, 0, { valueArg: ['0.0.0.0']}))
		}
		if (!port) {
			dispatch(storeSetOutputValue(id, 1, { valueArg: ['9998']}))
			dispatch(storeSetDockerOutputPorts(id, [{ip: '0.0.0.0', port: '9998', protocol: 'tcp'}]))
		}
		if (!cname) {
			dispatch(storeSetOutputValue(id, 2, { valueArg: ['SENDER01']}))
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
					Cname :
					<input
						className="input-text"
						type="text"
						value={cname?.valueArg ?? 0}
						onChange={(event) => dispatch(storeSetOutputValue(id, 2, { valueArg: [event.target.value]}))}
					/>
				</label>
			</div>
			<CodecTypes pipelineId={id} settings={props.settings} />
		</div>
	)
}

export default RistOutputOptions
