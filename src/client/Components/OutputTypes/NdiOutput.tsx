import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	storeSetFilterAudioParamArr,
	storeSetFilterParamArr,
	storeSetGlobalOutParamArr,
	storeSetOutputValue,
	storeSetOutputParamArr,
} from '../../../interface/redux/containerActions'
import { Settings, SettingsOutputParam } from '../../../interface/SettingsInterface'
import { RootState } from '../../main'
import { parseGlobalOutParamsToTranscoder, parseOutputParamsToTranscoder } from '../../utils/parseParamsToTranscoder'
import { OUTPUT_PARAMS } from '../../../interface/GenericInterfaces'

interface NdiProps {
	pipelineId: number
	settings: Settings
}

const NdiOutputOptions: React.FC<NdiProps> = (props) => {
	const dispatch = useDispatch()
	const id = props.pipelineId
	const [collapse, setCollapse] = useState(false)

	const outputName = useSelector<RootState, string>((state) => state.ffmpeg[0].pipeline[id].output.valueArgs[0])

	useEffect(() => {
		dispatch(storeSetGlobalOutParamArr(id, parseGlobalOutParamsToTranscoder(props.settings.outputParams, OUTPUT_PARAMS.NDI)))
		dispatch(storeSetOutputParamArr(id, parseOutputParamsToTranscoder(props.settings.outputParams, OUTPUT_PARAMS.NDI)))
		dispatch(storeSetFilterParamArr(id, []))
		dispatch(storeSetFilterAudioParamArr(id, []))
		if (!outputName) {
			dispatch(storeSetOutputValue(id, 0, `NDI_PIPE${id + 1}`))
		}
	}, [])

	return (
		<div>
			<div className={collapse ? 'options-collapse' : 'options'}>
				<label className="pipeline-label">
					<button className='collapse-button' onClick={() => setCollapse(!collapse)}>{collapse ? `-` : `+`}</button>
					NDI output name :
					<input
						className="input-text"
						type="text"
						value={outputName ?? 'none'}
						onChange={(event) => dispatch(storeSetOutputValue(id, 0, event.target.value))}
					/>
				</label>
			</div>
		</div>
	)
}

export default NdiOutputOptions
