import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { INPUT_PARAMS, ValueArg } from '../../../interface/GenericInterfaces'
import {
	storeSetGlobalInParamArr,
	storeSetInputValue,
	storeSetInputParamArr,
	storeSetDockerInputPorts,
} from '../../../interface/redux/containerActions'
import { RootState } from '../../main'
import { findGpuSettings } from './DecoderSettings/findGpu'
import { GPU_TYPES, SettingsInputParam } from '../../../interface/SettingsInterface'
import { parseGlobalInParamsToTranscoder, parseInputParamsToTranscoder } from '../../utils/parseParamsToTranscoder'

interface RistProps {
	pipelineId: number
	inputParams: SettingsInputParam[]
}

const RistInputOptions: React.FC<RistProps> = (props) => {
	const dispatch = useDispatch()
	const id = props.pipelineId
	const [collapse, setCollapse] = useState(false)


	const ip = useSelector<RootState, ValueArg>((state) => state.ffmpeg[0].pipeline[id].input.valueArgs[0])
	const port = useSelector<RootState, ValueArg>((state) => state.ffmpeg[0].pipeline[id].input.valueArgs[1])
	const cname = useSelector<RootState, ValueArg>((state) => state.ffmpeg[0].pipeline[id].input.valueArgs[2])
	const hwAccel = useSelector<RootState, GPU_TYPES>((state) => state.ffmpeg[0].pipeline[id].hwaccell)


	useEffect(() => {
		dispatch(storeSetInputParamArr(id, parseInputParamsToTranscoder(props.inputParams, INPUT_PARAMS.RIST, hwAccel)))
		dispatch(storeSetGlobalInParamArr(id, parseGlobalInParamsToTranscoder(props.inputParams, INPUT_PARAMS.RIST, hwAccel)))

		// 'rist://@123.123.123.123:8200?cname=RECEIVER01&bandwidth=2560000'
		//` -re -i srt://0.0.0.0:9998?pkt_size=1316&mode=listener -vcodec copy -acodec copy -strict -2 -y`))
		//dispatch(storeSetGlobalInParamArr(id, ['-re', ...findGpuSettings(hwAccel)]))
		//dispatch(storeSetInputParamArr(id, ['-i "rist://{arg0}:{arg1}?cname={arg2}"']))

		if (!ip) {
			dispatch(storeSetInputValue(id, 0, { valueArg: ['0.0.0.0']}))
		}
		if (!port) {
			dispatch(storeSetInputValue(id, 1, { valueArg: ['9998']}))
			dispatch(storeSetDockerInputPorts(id, [{ip: '0.0.0.0', port: "1234", protocol: 'tcp'}]))
		}
		if (!cname) {
			dispatch(storeSetInputValue(id, 2, { valueArg: ['RECEIVER01']}))
		}
	}, [])

	const handlePortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(storeSetInputValue(id, 1, { valueArg: [event.target.value]}))
		dispatch(storeSetDockerInputPorts(id, [{ip: '0.0.0.0', port: event.target.value, protocol: 'tcp'}]))
	}

	return (
		<div className={collapse ? 'options-collapse' : 'options'}>
			<label className="pipeline-label">
				<button className="collapse-button" onClick={() => setCollapse(!collapse)}>
					{collapse ? `-` : `+`}
				</button>
				IP :
				<input
					className="input-text"
					type="text"
					value={ip?.valueArg ?? 'none'}
					onChange={(event) => dispatch(storeSetInputValue(id, 0, { valueArg: [event.target.value]}))}
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
					onChange={(event) => dispatch(storeSetInputValue(id, 2, { valueArg: [event.target.value]}))}
				/>
			</label>
		</div>
	)
}

export default RistInputOptions
