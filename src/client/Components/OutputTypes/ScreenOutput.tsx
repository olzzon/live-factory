import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	storeSetFilterParamArr,
	storeSetGlobalOutParamArr,
	storeSetOutputValue,
	storeSetOutputParamArr,
	storeSetDockerOutputPorts,
} from '../../../interface/redux/containerActions'
import { Settings } from '../../../interface/SettingsInterface'
import { RootState } from '../../main'
import { OUTPUT_PARAMS, ValueArg } from '../../../interface/GenericInterfaces'
import { parseGlobalOutParamsToTranscoder, parseOutputParamsToTranscoder } from '../../utils/parseParamsToTranscoder'

interface IOutProps {
	pipelineId: number
	settings: Settings
}

const ScreenOutputOptions: React.FC<IOutProps> = (props) => {
	const dispatch = useDispatch()
	const id = props.pipelineId
	const [collapse, setCollapse] = useState(false)

	const outputName = useSelector<RootState, ValueArg>((state) => state.ffmpeg[0].pipeline[id].output.valueArgs[0])

	useEffect(() => {
		dispatch(storeSetGlobalOutParamArr(id, parseGlobalOutParamsToTranscoder(props.settings.outputParams, OUTPUT_PARAMS.SCREEN)))
		dispatch(storeSetOutputParamArr(id, parseOutputParamsToTranscoder(props.settings.outputParams, OUTPUT_PARAMS.SCREEN)))
		dispatch(storeSetFilterParamArr(id, []))
		dispatch(storeSetDockerOutputPorts(id, []))

	}, [])

	return (
		<div>
			<div className={collapse ? 'options-collapse' : 'options'}>
				<label className="pipeline-label">
					<button className='collapse-button' onClick={() => setCollapse(!collapse)}>{collapse ? `-` : `+`}</button>
					ToDo: Latency + FullScreen options
					<input
						className="input-text"
						type="text"
						value={outputName.valueArg ?? 'none'}
						onChange={(event) => dispatch(storeSetOutputValue(id, 0, { valueArg: [event.target.value]}))}
					/>
				</label>
			</div>
		</div>
	)
}

export default ScreenOutputOptions
