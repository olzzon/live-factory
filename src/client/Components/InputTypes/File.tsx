import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DEVICE_TYPES, INPUT_PARAMS } from '../../../interface/GenericInterfaces'
import {
	storeSetGlobalInValue,
	storeSetGlobalInParamArr,
	storeSetInputValue,
	storeSetInputParamArr,
} from '../../../interface/redux/containerActions'
import { RootState } from '../../main'
import { findGpuSettings } from './DecoderSettings/findGpu'
import { GPU_TYPES, SettingsInputParam } from '../../../interface/SettingsInterface'
import { parseGlobalInParamsToTranscoder, parseInputParamsToTranscoder } from '../../utils/parseParamsToTranscoder'

interface IFileProps {
	pipelineId: number
	inputParams: SettingsInputParam[]
}

const FileInputOptions: React.FC<IFileProps> = (props) => {
	const dispatch = useDispatch()
	const id = props.pipelineId
	const [collapse, setCollapse] = useState(false)


	const fileLoop = useSelector<RootState, string>((state) => state.ffmpeg[0].pipeline[id].globalInput.valueArgs[0])
	const filePath = useSelector<RootState, string>((state) => state.ffmpeg[0].pipeline[id].input.valueArgs[0])
	const fileName = useSelector<RootState, string>((state) => state.ffmpeg[0].pipeline[id].input.valueArgs[1])
	const hwAccel = useSelector<RootState, GPU_TYPES>((state) => state.ffmpeg[0].pipeline[id].hwaccell)


	useEffect(() => {
		dispatch(storeSetGlobalInParamArr(id, parseGlobalInParamsToTranscoder(props.inputParams, INPUT_PARAMS.FILE, hwAccel)))
		dispatch(storeSetInputParamArr(id, parseInputParamsToTranscoder(props.inputParams, INPUT_PARAMS.FILE, hwAccel)))

		if (!fileLoop) {
			dispatch(storeSetGlobalInValue(id, 0, '1'))
		}
		if (!filePath) {
			dispatch(storeSetInputValue(id, 0, '/Users/olzzon/coding/live-factory/media/'))
		}
		if (!fileName) {
			dispatch(storeSetInputValue(id, 1, 'HDR10Jazz.mp4'))
		}
	}, [])

	return (
		<div className={collapse ? 'options-collapse' : 'options'}>
			<label className="pipeline-label">
				<button className="collapse-button" onClick={() => setCollapse(!collapse)}>
					{collapse ? `-` : `+`}
				</button>
				Path :
				<input
					className="input-text"
					type="text"
					value={filePath ?? 'none'}
					onChange={(event) => dispatch(storeSetInputValue(id, 0, event.target.value))}
				/>
			</label>
			<label className="pipeline-label">
				Filename :
				<input
					className="input-text"
					type="text"
					value={fileName ?? 'none'}
					onChange={(event) => dispatch(storeSetInputValue(id, 1, event.target.value))}
				/>
			</label>
			<label className="pipeline-label">
				File loop (-1 = infinite) :
				<input
					className="input-number"
					type="number"
					value={fileLoop ?? 0}
					onChange={(event) => dispatch(storeSetGlobalInValue(id, 0, event.target.value))}
				/>
			</label>
		</div>
	)
}

export default FileInputOptions
