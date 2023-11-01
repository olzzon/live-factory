import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DEVICE_TYPES, INPUT_PARAMS } from '../../../interface/GenericInterfaces'
import {
	storeSetGlobalInParamArr,
	storeSetInputValue,
	storeSetInputParamArr,
} from '../../../interface/redux/containerActions'
import { RootState } from '../../main'
import { GPU_TYPES, SettingsInputParam } from '../../../interface/SettingsInterface'
import { parseGlobalInParamsToTranscoder, parseInputParamsToTranscoder } from '../../utils/parseParamsToTranscoder'

interface IFileProps {
	pipelineId: number
	inputParams: SettingsInputParam[]
}

const NdiInputOptions: React.FC<IFileProps> = (props) => {
	const dispatch = useDispatch()
	const id = props.pipelineId
	const [collapse, setCollapse] = useState(false)


	const ndiName = useSelector<RootState, string>((state) => state.ffmpeg[0].pipeline[id].input.valueArgs[0])
	const devices = useSelector<RootState, string[]>(
		(state) => state.ffmpeg[0].deviceTypes[DEVICE_TYPES.NDI]?.devices || []
	)
	const hwAccel = useSelector<RootState, GPU_TYPES>((state) => state.ffmpeg[0].pipeline[id].hwaccell)

	useEffect(() => {
		dispatch(storeSetGlobalInParamArr(id, parseGlobalInParamsToTranscoder(props.inputParams, INPUT_PARAMS.COLORBAR, hwAccel)))
		dispatch(storeSetInputParamArr(id, parseInputParamsToTranscoder(props.inputParams, INPUT_PARAMS.COLORBAR, hwAccel)))

		if (!ndiName) {
			dispatch(storeSetInputValue(id, 0, 'HOSTNAME (NDINAME)'))
		}
	}, [])

	const handleSetNdiSource = (event: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(storeSetInputValue(id, 0, event.target.value))
	}

	return (
		<div className={collapse ? 'options-collapse' : 'options'}>
			<label className="pipeline-label">
				<button className="collapse-button" onClick={() => setCollapse(!collapse)}>
					{collapse ? `-` : `+`}
				</button>
				NDI Source name :
				<input
					className="input-text"
					type="text"
					value={ndiName ?? 'none'}
					onChange={(event) => dispatch(storeSetInputValue(id, 0, event.target.value))}
				/>
			</label>
			<label className="pipeline-label">
				<select
					onChange={(event) => {
						handleSetNdiSource(event)
					}}
				>
					{devices.map((source, index) => {
						return (
							<option key={index} value={source}>
								{source}
							</option>
						)
					})}
				</select>
			</label>
		</div>
	)
}

export default NdiInputOptions
