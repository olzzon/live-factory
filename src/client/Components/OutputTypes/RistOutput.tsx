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

interface IRistProps {
	pipelineId: number
	settings: ISettings
}

const RistOutputOptions: React.FC<IRistProps> = (props) => {
	const dispatch = useDispatch()
	const id = props.pipelineId
	const [collapse, setCollapse] = useState(false)

	const ip = useSelector<RootState, string>((state) => state.ffmpeg[0].pipeline[id].output.paramArgs[0])
	const port = useSelector<RootState, string>((state) => state.ffmpeg[0].pipeline[id].output.paramArgs[1])
	const cname = useSelector<RootState, string>((state) => state.ffmpeg[0].pipeline[id].output.paramArgs[2])

	useEffect(() => {
		//` -re -i srt://0.0.0.0:9998?pkt_size=1316&mode=listener -vcodec copy -acodec copy -strict -2 -y`))
		// MAC M1 :
		//  ` -c:v h264_videotoolbox -b:v {arg0}k -pix_fmt yuv420p -acodec libopus -b:a {arg1}k`
		// CUDA Linux:
		//  ` -c:v h264_nvenc -preset llhq -zerolatency 1 -b:v 6000k -pix_fmt yuv420p `))
		// 'rist://123.123.123.123:8200?cname=SENDER01&bandwidth=2560000'

		dispatch(storeSetGlobalOutParamArr(id, []))
		dispatch(storeSetOutputParamArr(id, ['-f', 'matroska', 'rist://{arg0}:{arg1}?pkt_size=1316&cname={arg2}']))

		if (!ip) {
			dispatch(storeSetOutputParams(id, 0, '0.0.0.0'))
		}
		if (!port) {
			dispatch(storeSetOutputParams(id, 1, '9998'))
		}
		if (!cname) {
			dispatch(storeSetOutputParams(id, 2, 'SENDER01'))
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
				<label className="pipeline-label">
					Cname :
					<input
						className="input-text"
						type="text"
						value={cname ?? 0}
						onChange={(event) => dispatch(storeSetOutputParams(id, 2, event.target.value))}
					/>
				</label>
			</div>
			<CodecTypes pipelineId={id} settings={props.settings} />
		</div>
	)
}

export default RistOutputOptions
