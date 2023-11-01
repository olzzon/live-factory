import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	storeSetGlobalOutParamArr,
	storeSetOutputValue,
	storeSetOutputParamArr,
} from '../../../interface/redux/containerActions'
import { Settings } from '../../../interface/SettingsInterface'
import { RootState } from '../../main'
import CodecTypes from './CodecTypes/CodecTypes'
import { parseGlobalOutParamsToTranscoder, parseOutputParamsToTranscoder } from '../../utils/parseParamsToTranscoder'
import { OUTPUT_PARAMS } from '../../../interface/GenericInterfaces'

interface TcpProps {
	pipelineId: number
	settings: Settings
}

const RtpOutputOptions: React.FC<TcpProps> = (props) => {
	const dispatch = useDispatch()
	const id = props.pipelineId
	const [collapse, setCollapse] = useState(false)

	const ip = useSelector<RootState, string>((state) => state.ffmpeg[0].pipeline[id].output.valueArgs[0])
	const port = useSelector<RootState, string>((state) => state.ffmpeg[0].pipeline[id].output.valueArgs[1])

	useEffect(() => {
		dispatch(storeSetGlobalOutParamArr(id, parseGlobalOutParamsToTranscoder(props.settings.outputParams, OUTPUT_PARAMS.RTP)))
		dispatch(storeSetOutputParamArr(id, parseOutputParamsToTranscoder(props.settings.outputParams, OUTPUT_PARAMS.RTP)))

		if (!ip) {
			dispatch(storeSetOutputValue(id, 0, '0.0.0.0'))
		}
		if (!port) {
			dispatch(storeSetOutputValue(id, 1, '9998'))
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
			</div>
			<CodecTypes pipelineId={id} settings={props.settings} />
		</div>
	)
}

export default RtpOutputOptions
