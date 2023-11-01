import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	storeSetGlobalOutParamArr,
	storeSetOutputValue,
	storeSetOutputParamArr,
} from '../../../interface/redux/containerActions'
import { Settings, SettingsOutputParam } from '../../../interface/SettingsInterface'
import { RootState } from '../../main'
import CodecTypes from './CodecTypes/CodecTypes'
import { parseGlobalOutParamsToTranscoder, parseOutputParamsToTranscoder } from '../../utils/parseParamsToTranscoder'
import { OUTPUT_PARAMS } from '../../../interface/GenericInterfaces'

interface RistProps {
	pipelineId: number
	settings: Settings
}

const RistOutputOptions: React.FC<RistProps> = (props) => {
	const dispatch = useDispatch()
	const id = props.pipelineId
	const [collapse, setCollapse] = useState(false)

	const ip = useSelector<RootState, string>((state) => state.ffmpeg[0].pipeline[id].output.paramArgs[0])
	const port = useSelector<RootState, string>((state) => state.ffmpeg[0].pipeline[id].output.paramArgs[1])
	const cname = useSelector<RootState, string>((state) => state.ffmpeg[0].pipeline[id].output.paramArgs[2])

	useEffect(() => {
		dispatch(storeSetGlobalOutParamArr(id, parseGlobalOutParamsToTranscoder(props.settings.outputParams, OUTPUT_PARAMS.RIST)))
		dispatch(storeSetOutputParamArr(id, parseOutputParamsToTranscoder(props.settings.outputParams, OUTPUT_PARAMS.RIST)))

		if (!ip) {
			dispatch(storeSetOutputValue(id, 0, '0.0.0.0'))
		}
		if (!port) {
			dispatch(storeSetOutputValue(id, 1, '9998'))
		}
		if (!cname) {
			dispatch(storeSetOutputValue(id, 2, 'SENDER01'))
		}
	}, [])

	return (
		<div>
			<div className={collapse ? 'options-collapse' : 'options'}>
				<label className="pipeline-label">
					<button className='collapse-button' onClick={() => setCollapse(!collapse)}>{collapse ? `-` : `+`}</button>
					IP :
					<input
						className="input-text"
						type="text"
						value={ip ?? 'none'}
						onChange={(event) => dispatch(storeSetOutputValue(id, 0, event.target.value))}
					/>
				</label>
				<label className="pipeline-label">
					Port :
					<input
						className="input-text"
						type="text"
						value={port ?? 'none'}
						onChange={(event) => dispatch(storeSetOutputValue(id, 1, event.target.value))}
					/>
				</label>
				<label className="pipeline-label">
					Cname :
					<input
						className="input-text"
						type="text"
						value={cname ?? 0}
						onChange={(event) => dispatch(storeSetOutputValue(id, 2, event.target.value))}
					/>
				</label>
			</div>
			<CodecTypes pipelineId={id} settings={props.settings} />
		</div>
	)
}

export default RistOutputOptions
