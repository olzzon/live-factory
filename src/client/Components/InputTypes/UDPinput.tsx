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
import { GPU_TYPES, SettingsInputParam } from '../../../interface/SettingsInterface'
import { parseGlobalInParamsToTranscoder, parseInputParamsToTranscoder } from '../../utils/parseParamsToTranscoder'

interface IUdpInputProps {
	pipelineId: number
	inputParams: SettingsInputParam[]
}

const UdpInputOptions: React.FC<IUdpInputProps> = (props) => {
	const dispatch = useDispatch()
	const id = props.pipelineId
	const [collapse, setCollapse] = useState(false)


	const ip = useSelector<RootState, ValueArg>((state) => state.ffmpeg[0].pipeline[id].input.valueArgs[0])
	const port = useSelector<RootState, ValueArg>((state) => state.ffmpeg[0].pipeline[id].input.valueArgs[1])
	const fifoSize = useSelector<RootState, ValueArg>((state) => state.ffmpeg[0].pipeline[id].input.valueArgs[2])
	const hwAccel = useSelector<RootState, GPU_TYPES>((state) => state.ffmpeg[0].pipeline[id].hwaccell)


	useEffect(() => {
		dispatch(storeSetGlobalInParamArr(id, parseGlobalInParamsToTranscoder(props.inputParams, INPUT_PARAMS.UDP, hwAccel)))
		dispatch(storeSetInputParamArr(id, parseInputParamsToTranscoder(props.inputParams, INPUT_PARAMS.UDP, hwAccel)))
		if (!ip) {
			dispatch(storeSetInputValue(id, 0, { valueArg: ['localhost']}))
		}
		if (!port) {
			dispatch(storeSetInputValue(id, 1, { valueArg: ['1234']}))
			dispatch(storeSetDockerInputPorts(id, [{ip: '0.0.0.0', port: '1234', protocol: 'udp'}]))
		}
		if (!fifoSize) {
			dispatch(storeSetInputValue(id, 2, { valueArg: ['49152']}))
		}
	}, [])

	const handlePortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(storeSetInputValue(id, 1, { valueArg: [event.target.value]}))
		dispatch(storeSetDockerInputPorts(id, [{ip: '0.0.0.0', port: event.target.value, protocol: 'udp'}]))
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
					value={ip.valueArg}
					onChange={(event) => dispatch(storeSetInputValue(id, 0, { valueArg: [event.target.value]}))}
				/>
			</label>
			<label className="pipeline-label">
				PORT :
				<input
					className="input-text"
					type="text"
					value={port.valueArg}
					onChange={(event) => dispatch(storeSetInputValue(id, 1, { valueArg: [event.target.value]}))}
				/>
			</label>
			<label className="pipeline-label">
				Buffer Size (fifo) :
				<input
					className="input-text"
					type="text"
					value={fifoSize.valueArg}
					onChange={(event) => dispatch(storeSetInputValue(id, 2, { valueArg: [event.target.value]}))}
				/>
			</label>
		</div>
	)
}

export default UdpInputOptions
