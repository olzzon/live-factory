import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { INPUT_PARAMS, ValueArg } from '../../../interface/GenericInterfaces'
import {
	storeSetGlobalInValue,
	storeSetGlobalInParamArr,
	storeSetInputValue,
	storeSetInputParamArr,
	storeSetDockerInputPorts,
} from '../../../interface/redux/containerActions'
import { RootState } from '../../main'
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


	const fileLoop = useSelector<RootState, ValueArg>((state) => state.ffmpeg[0].pipeline[id].globalInput.valueArgs[0])
	const filePath = useSelector<RootState, ValueArg>((state) => state.ffmpeg[0].pipeline[id].input.valueArgs[0])
	const fileName = useSelector<RootState, ValueArg>((state) => state.ffmpeg[0].pipeline[id].input.valueArgs[1])
	const hwAccel = useSelector<RootState, GPU_TYPES>((state) => state.ffmpeg[0].pipeline[id].hwaccell)


	useEffect(() => {
		dispatch(storeSetGlobalInParamArr(id, parseGlobalInParamsToTranscoder(props.inputParams, INPUT_PARAMS.FILE, hwAccel)))
		dispatch(storeSetInputParamArr(id, parseInputParamsToTranscoder(props.inputParams, INPUT_PARAMS.FILE, hwAccel)))
		dispatch(storeSetDockerInputPorts(id, []))

		if (!fileLoop) {
			dispatch(storeSetGlobalInValue(id, 0, { valueArg: ['1']}))
		}
		if (!filePath) {
			dispatch(storeSetInputValue(id, 0, { valueArg: ['/Users/olzzon/coding/live-factory/media/']}))
		}
		if (!fileName) {
			dispatch(storeSetInputValue(id, 1, { valueArg: ['HDR10Jazz.mp4']}))
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
					value={filePath?.valueArg ?? 'none'}
					onChange={(event) => dispatch(storeSetInputValue(id, 0, { valueArg: [event.target.value]}))}
				/>
			</label>
			<label className="pipeline-label">
				Filename :
				<input
					className="input-text"
					type="text"
					value={fileName?.valueArg ?? 'none'}
					onChange={(event) => dispatch(storeSetInputValue(id, 1, { valueArg: [event.target.value]}))}
				/>
			</label>
			<label className="pipeline-label">
				File loop (-1 = infinite) :
				<input
					className="input-number"
					type="number"
					value={fileLoop?.valueArg ?? 0}
					onChange={(event) => dispatch(storeSetGlobalInValue(id, 0, { valueArg: [event.target.value]}))}
				/>
			</label>
		</div>
	)
}

export default FileInputOptions
