import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	storeSetGlobalInParamArr,
	storeSetInputParamArr,
	storeSetInputValue
} from '../../../interface/redux/containerActions'
import { RootState } from '../../main'
import { GPU_TYPES, SettingsInputParam } from '../../../interface/SettingsInterface'
import { INPUT_PARAMS } from '../../../interface/GenericInterfaces'
import { parseGlobalInParamsToTranscoder, parseInputParamsToTranscoder } from '../../utils/parseParamsToTranscoder'

interface ColorBarProps {
	pipelineId: number
	inputParams: SettingsInputParam[]
}

const ColorbarInputOptions: React.FC<ColorBarProps> = (props) => {
	const dispatch = useDispatch()
	const id = props.pipelineId
	const [collapse, setCollapse] = useState(false)

	const resolution = useSelector<RootState, string>((state) => state.ffmpeg[0].pipeline[id].input.paramArgs[0])
	const hwAccel = useSelector<RootState, GPU_TYPES>((state) => state.ffmpeg[0].pipeline[id].hwaccell)

	useEffect(() => {
		dispatch(storeSetGlobalInParamArr(id, parseGlobalInParamsToTranscoder(props.inputParams, INPUT_PARAMS.COLORBAR, hwAccel)))
		dispatch(storeSetInputParamArr(id, parseInputParamsToTranscoder(props.inputParams, INPUT_PARAMS.COLORBAR, hwAccel)))

		if (!resolution) {
			dispatch(storeSetInputValue(id, 0, '1920x1080'))
		}
	}, [])

	return (
		<div className={collapse ? 'options-collapse' : 'options'}>
			<label className="pipeline-label">
				<button className="collapse-button" onClick={() => setCollapse(!collapse)}>
					{collapse ? `-` : `+`}
				</button>
				Color bar Size :
				<input
					className="input-text"
					type="text"
					value={resolution ?? 'none'}
					onChange={(event) => dispatch(storeSetInputValue(id, 0, event.target.value))}
				/>
			</label>
		</div>
	)
}

export default ColorbarInputOptions
