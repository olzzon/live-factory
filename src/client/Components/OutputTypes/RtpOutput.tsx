import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	storeSetGlobalOutParamString,
	storeSetOutputParams,
	storeSetOutputParamString,
} from '../../../interface/redux/containerActions'
import { RootState } from '../../main'
import CodecTypes from './CodecTypes/CodecTypes'

interface ITcpProps {
	factoryId: number
}

const RtpOutputOptions: React.FC<ITcpProps> = (props) => {
	const dispatch = useDispatch()
	const id = props.factoryId
	const [collapse, setCollapse] = useState(false)

	const ip = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].output.paramArgs[0])
	const port = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].output.paramArgs[1])

	useEffect(() => {
		dispatch(storeSetGlobalOutParamString(id, ` `))
		dispatch(storeSetOutputParamString(id, ` -f rtp "rtp://{arg0}:{arg1}" `))

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
			<CodecTypes factoryId={id} />
		</div>
	)
}

export default RtpOutputOptions
