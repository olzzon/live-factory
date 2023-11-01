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

interface SrtProps {
	pipelineId: number
	settings: Settings
}

const MpegTsOutputOptions: React.FC<SrtProps> = (props) => {
	const dispatch = useDispatch()
	const id = props.pipelineId
	const [collapse, setCollapse] = useState(false)

	const ip = useSelector<RootState, string>((state) => state.ffmpeg[0].pipeline[id].output.valueArgs[0])
	const port = useSelector<RootState, string>((state) => state.ffmpeg[0].pipeline[id].output.valueArgs[1])

	useEffect(() => {
		dispatch(storeSetGlobalOutParamArr(id, parseGlobalOutParamsToTranscoder(props.settings.outputParams, OUTPUT_PARAMS.MPEG_TS)))
		dispatch(storeSetOutputParamArr(id, parseOutputParamsToTranscoder(props.settings.outputParams, OUTPUT_PARAMS.MPEG_TS)))
		if (!ip) {
			dispatch(storeSetOutputValue(id, 0, '0.0.0.0'))
		}
		if (!port) {
			dispatch(storeSetOutputValue(id, 1, '1234'))
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

/*
interface IMpegTsProps {
factoryId: number
}

const MpegTsOutputOptions: React.FC<IMpegTsProps> = (props) => {
	const [url, setUrl] = useState<string>('-f mpegts -r 25')

	const handleType = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUrl(event.target.value)
		let next = { ...props.cmd }
		next.output.params[0] = event.target.value
		props.setCmd(next)
	}
	return (
		<div className='options'>
			<label className="">
				URL :
				<input className="" type="text" value={url} onChange={(event) => handleType(event)} />
			</label>
		</div>
	)
}

*/

export default MpegTsOutputOptions
