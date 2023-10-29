import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DEVICE_TYPES } from '../../../interface/GenericInterfaces'
import {
	storeSetGlobalInParamArr,
	storeSetInputParams,
	storeSetInputParamArr,
} from '../../../interface/redux/containerActions'
import { RootState } from '../../main'
import { findGpuSettings } from './DecoderSettings/findGpu'

interface IUdpInputProps {
	factoryId: number
}

const UdpInputOptions: React.FC<IUdpInputProps> = (props) => {
	const dispatch = useDispatch()
	const id = props.factoryId
	const [collapse, setCollapse] = useState(false)


	const ip = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].input.paramArgs[0])
	const port = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].input.paramArgs[1])
	const fifoSize = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].input.paramArgs[2])
	const osType = useSelector<RootState, string>(
		(state) => state.ffmpeg[0].deviceTypes[DEVICE_TYPES.GPU_TYPE]?.devices[0]
	)

	useEffect(() => {
		dispatch(storeSetGlobalInParamArr(id, ['-re', '-vsync', '0', ...findGpuSettings(osType)]))
		dispatch(storeSetInputParamArr(id, ['-i udp://{arg0}:{arg1}?fifo_size={arg2}']))
		if (!ip) {
			dispatch(storeSetInputParams(id, 0, 'localhost'))
		}
		if (!port) {
			dispatch(storeSetInputParams(id, 1, '1234'))
		}
		if (!fifoSize) {
			dispatch(storeSetInputParams(id, 2, '49152'))
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
					value={ip}
					onChange={(event) => dispatch(storeSetInputParams(id, 0, event.target.value))}
				/>
			</label>
			<label className="pipeline-label">
				PORT :
				<input
					className="input-text"
					type="text"
					value={port}
					onChange={(event) => dispatch(storeSetInputParams(id, 1, event.target.value))}
				/>
			</label>
			<label className="pipeline-label">
				Buffer Size (fifo) :
				<input
					className="input-text"
					type="text"
					value={fifoSize}
					onChange={(event) => dispatch(storeSetInputParams(id, 2, event.target.value))}
				/>
			</label>
		</div>
	)
}

export default UdpInputOptions
