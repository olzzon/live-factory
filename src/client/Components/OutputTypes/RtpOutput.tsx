import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	storeSetGlobalOutParamArr,
	storeSetOutputParams,
	storeSetOutputParamArr,
} from '../../../interface/redux/containerActions'
import { ISettings } from '../../../interface/SettingsInterface'
import { RootState } from '../../main'
import CodecTypes from './CodecTypes/CodecTypes'

interface ITcpProps {
	pipelineId: number
	settings: ISettings
}

const RtpOutputOptions: React.FC<ITcpProps> = (props) => {
	const dispatch = useDispatch()
	const id = props.pipelineId
	const [collapse, setCollapse] = useState(false)

	const ip = useSelector<RootState, string>((state) => state.ffmpeg[0].pipeline[id].output.paramArgs[0])
	const port = useSelector<RootState, string>((state) => state.ffmpeg[0].pipeline[id].output.paramArgs[1])

	useEffect(() => {
		dispatch(storeSetGlobalOutParamArr(id, []))
		dispatch(storeSetOutputParamArr(id, ['-f', 'rtp', 'rtp://{arg0}:{arg1}']))

		if (!ip) {
			dispatch(storeSetOutputParams(id, 0, '0.0.0.0'))
		}
		if (!port) {
			dispatch(storeSetOutputParams(id, 1, '9998'))
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
						onChange={(event) => dispatch(storeSetOutputParams(id, 0, event.target.value))}
					/>
				</label>
				<label className="pipeline-label">
					Port :
					<input
						className="input-text"
						type="text"
						value={port ?? 'none'}
						onChange={(event) => dispatch(storeSetOutputParams(id, 1, event.target.value))}
					/>
				</label>
			</div>
			<CodecTypes pipelineId={id} settings={props.settings} />
		</div>
	)
}

export default RtpOutputOptions
