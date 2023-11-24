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

interface ISrtProps {
	pipelineId: number
	inputParams: SettingsInputParam[]
}

const SrtInputOptions: React.FC<ISrtProps> = (props) => {
	const dispatch = useDispatch()
	const id = props.pipelineId
	const [collapse, setCollapse] = useState(false)


	const ip = useSelector<RootState, ValueArg>((state) => state.ffmpeg[0].pipeline[id].input.valueArgs[0])
	const port = useSelector<RootState, ValueArg>((state) => state.ffmpeg[0].pipeline[id].input.valueArgs[1])
	const mode = useSelector<RootState, ValueArg>((state) => state.ffmpeg[0].pipeline[id].input.valueArgs[2])
	const passphrase = useSelector<RootState, ValueArg>((state) => state.ffmpeg[0].pipeline[id].input.valueArgs[3])
	const hwAccel = useSelector<RootState, GPU_TYPES>((state) => state.ffmpeg[0].pipeline[id].hwaccell)

	useEffect(() => {
		dispatch(storeSetGlobalInParamArr(id, parseGlobalInParamsToTranscoder(props.inputParams, INPUT_PARAMS.SRT, hwAccel)))
		dispatch(storeSetInputParamArr(id, parseInputParamsToTranscoder(props.inputParams, INPUT_PARAMS.SRT, hwAccel)))

		if (!ip) {
			dispatch(storeSetInputValue(id, 0, { valueArg: ['0.0.0.0']}))
		}
		if (!port) {
			dispatch(storeSetInputValue(id, 1, { valueArg: ['9998']}))
			dispatch(storeSetDockerInputPorts(id, [{ip: '0.0.0.0', port: '9998', protocol: 'tcp'}]))
		}
		if (!mode) {
			dispatch(storeSetInputValue(id, 2, { valueArg: ['caller']}))
		}
		if (!passphrase) {
			dispatch(storeSetInputValue(id, 3, { valueArg: ['1234567890']}))
		}
	}, [])

	const handlePortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(storeSetInputValue(id, 1, { valueArg: [event.target.value]}))
		dispatch(storeSetDockerInputPorts(id, [{ip: '0.0.0.0', port: event.target.value, protocol: 'tcp'}]))
	}

	const handlePassPhrase = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(storeSetInputValue(id, 3, { valueArg: [event.target.value]}))
		if (passphrase.valueArg.length < 10) {
			dispatch(storeSetInputParamArr(id, ['-i "srt://{arg0}:{arg1}?pkt_size=1316&mode={arg2}"']))
		} else {
			dispatch(storeSetInputParamArr(id, ['-i "srt://{arg0}:{arg1}?pkt_size=1316&mode={arg2}&passphrase={arg3}"']))
		}
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
				Passphrase (min 10 chars):
				<input
					className="input-text"
					type="text"
					value={passphrase?.valueArg ?? 'none'}
					onChange={(event) => handlePassPhrase(event)}
				/>
			</label>
			<label className="pipeline-label">
				Mode (listener or caller) :
				<input
					className="input-text"
					type="text"
					value={mode?.valueArg ?? 0}
					onChange={(event) => dispatch(storeSetInputValue(id, 2, { valueArg: [event.target.value]}))}
				/>
			</label>
		</div>
	)
}

export default SrtInputOptions
