import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DEVICE_TYPES, INPUT_PARAMS } from '../../../interface/GenericInterfaces'
import {
	storeSetGlobalInParamArr,
	storeSetInputValue,
	storeSetInputParamArr,
} from '../../../interface/redux/containerActions'
import { RootState } from '../../main'
import { findGpuSettings } from './DecoderSettings/findGpu'
import { GPU_TYPES, SettingsInputParam } from '../../../interface/SettingsInterface'
import { parseGlobalInParamsToTranscoder, parseInputParamsToTranscoder } from '../../utils/parseParamsToTranscoder'

interface IMpegtsProps {
	pipelineId: number
	inputParams: SettingsInputParam[]
}

const MpegtsInputOptions: React.FC<IMpegtsProps> = (props) => {
	const dispatch = useDispatch()
	const id = props.pipelineId
	const [collapse, setCollapse] = useState(false)

	const ip = useSelector<RootState, string>((state) => state.ffmpeg[0].pipeline[id].input.paramArgs[0])
	const port = useSelector<RootState, string>((state) => state.ffmpeg[0].pipeline[id].input.paramArgs[1])
	const fifoSize = useSelector<RootState, string>((state) => state.ffmpeg[0].pipeline[id].input.paramArgs[2])
	const hwAccel = useSelector<RootState, GPU_TYPES>((state) => state.ffmpeg[0].pipeline[id].hwaccell)

	useEffect(() => {
		dispatch(storeSetGlobalInParamArr(id, parseGlobalInParamsToTranscoder(props.inputParams, INPUT_PARAMS.MPEG_TS, hwAccel)))
		dispatch(storeSetInputParamArr(id, parseInputParamsToTranscoder(props.inputParams, INPUT_PARAMS.MPEG_TS, hwAccel)))

		if (!ip) {
			dispatch(storeSetInputValue(id, 0, 'localhost'))
		}
		if (!port) {
			dispatch(storeSetInputValue(id, 1, '1234'))
		}
		if (!fifoSize) {
			dispatch(storeSetInputValue(id, 2, '49152'))
		}
	}, [])

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
					value={ip}
					onChange={(event) => dispatch(storeSetInputValue(id, 0, event.target.value))}
				/>
			</label>
			<label className="pipeline-label">
				PORT :
				<input
					className="input-text"
					type="text"
					value={port}
					onChange={(event) => dispatch(storeSetInputValue(id, 1, event.target.value))}
				/>
			</label>
			<label className="pipeline-label">
				Buffer Size (fifo) :
				<input
					className="input-text"
					type="text"
					value={fifoSize}
					onChange={(event) => dispatch(storeSetInputValue(id, 2, event.target.value))}
				/>
			</label>
		</div>
	)
}

export default MpegtsInputOptions
