import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DEVICE_TYPES } from '../../../interface/GenericInterfaces'
import {
	storeSetGlobalInParamString,
	storeSetInputParams,
	storeSetInputParamString,
} from '../../../interface/redux/containerActions'
import { RootState } from '../../main'
import { findGpuSettings } from './DecoderSettings/findGpu'

interface IRistProps {
	factoryId: number
}

const RistInputOptions: React.FC<IRistProps> = (props) => {
	const dispatch = useDispatch()
	const id = props.factoryId
	const [collapse, setCollapse] = useState(false)


	const ip = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].input.paramArgs[0])
	const port = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].input.paramArgs[1])
	const cname = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].input.paramArgs[2])
	const osType = useSelector<RootState, string>(
		(state) => state.ffmpeg[0].deviceTypes[DEVICE_TYPES.GPU_TYPE]?.devices[0]
	)

	useEffect(() => {
		// 'rist://@123.123.123.123:8200?cname=RECEIVER01&bandwidth=2560000'
		//` -re -i srt://0.0.0.0:9998?pkt_size=1316&mode=listener -vcodec copy -acodec copy -strict -2 -y`))
		dispatch(storeSetGlobalInParamString(id, ` -re ` + findGpuSettings(osType)))
		dispatch(storeSetInputParamString(id, `  -i "rist://{arg0}:{arg1}?cname={arg2}"`))
		if (!ip) {
			dispatch(storeSetInputParams(id, 0, '0.0.0.0'))
		}
		if (!port) {
			dispatch(storeSetInputParams(id, 1, '9998'))
		}
		if (!cname) {
			dispatch(storeSetInputParams(id, 2, 'RECEIVER01'))
		}
	}, [])

	return (
		<div className={collapse ? 'options-collapse' : 'options'}>
			<label className="pipeline-label">
				<button className="collapse-button" onClick={() => setCollapse(!collapse)}>
					{collapse ? `-` : `+`}
				</button>
				IP :
				<input
					className="input-text"
					type="text"
					value={ip ?? 'none'}
					onChange={(event) => dispatch(storeSetInputParams(id, 0, event.target.value))}
				/>
			</label>
			<label className="pipeline-label">
				Port :
				<input
					className="input-text"
					type="text"
					value={port ?? 'none'}
					onChange={(event) => dispatch(storeSetInputParams(id, 1, event.target.value))}
				/>
			</label>
			<label className="pipeline-label">
				Cname :
				<input
					className="input-text"
					type="text"
					value={cname ?? 0}
					onChange={(event) => dispatch(storeSetInputParams(id, 2, event.target.value))}
				/>
			</label>
		</div>
	)
}

export default RistInputOptions
