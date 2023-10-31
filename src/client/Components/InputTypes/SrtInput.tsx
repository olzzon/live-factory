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

interface ISrtProps {
	pipelineId: number
}

const SrtInputOptions: React.FC<ISrtProps> = (props) => {
	const dispatch = useDispatch()
	const id = props.pipelineId
	const [collapse, setCollapse] = useState(false)


	const ip = useSelector<RootState, string>((state) => state.ffmpeg[0].pipeline[id].input.paramArgs[0])
	const port = useSelector<RootState, string>((state) => state.ffmpeg[0].pipeline[id].input.paramArgs[1])
	const mode = useSelector<RootState, string>((state) => state.ffmpeg[0].pipeline[id].input.paramArgs[2])
	const passphrase = useSelector<RootState, string>((state) => state.ffmpeg[0].pipeline[id].input.paramArgs[3])
	const osType = useSelector<RootState, string>(
		(state) => state.ffmpeg[0].deviceTypes[DEVICE_TYPES.GPU_TYPE]?.devices[0]
	)

	useEffect(() => {
		//` -re -i srt://0.0.0.0:9998?pkt_size=1316&mode=listener -vcodec copy -acodec copy -strict -2 -y`))
		dispatch(
			storeSetGlobalInParamArr(id, ['-re', ...findGpuSettings(osType), '-adrift_threshold', '0.06','-async', '8000'])
		)
		if (passphrase?.length < 10) {
			dispatch(storeSetInputParamArr(id, ['-i', 'srt://{arg0}:{arg1}?pkt_size=1316&mode={arg2}']))
		} else {
			dispatch(storeSetInputParamArr(id, ['-i', 'srt://{arg0}:{arg1}?pkt_size=1316&mode={arg2}&passphrase={arg3}']))
		}
		if (!ip) {
			dispatch(storeSetInputParams(id, 0, '0.0.0.0'))
		}
		if (!port) {
			dispatch(storeSetInputParams(id, 1, '9998'))
		}
		if (!mode) {
			dispatch(storeSetInputParams(id, 2, 'caller'))
		}
		if (!passphrase) {
			dispatch(storeSetInputParams(id, 3, ''))
		}
	}, [])

	const handlePassPhrase = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(storeSetInputParams(id, 3, event.target.value))
		if (passphrase.length < 10) {
			dispatch(storeSetInputParamArr(id, ['-i "srt://{arg0}:{arg1}?pkt_size=1316&mode={arg2}"']))
		} else {
			dispatch(storeSetInputParamArr(id, ['-i "srt://{arg0}:{arg1}?pkt_size=1316&mode={arg2}&passphrase={arg3}"']))
		}
	}

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
				Passphrase (min 10 chars):
				<input
					className="input-text"
					type="text"
					value={passphrase ?? 'none'}
					onChange={(event) => handlePassPhrase(event)}
				/>
			</label>
			<label className="pipeline-label">
				Mode (listener or caller) :
				<input
					className="input-text"
					type="text"
					value={mode ?? 0}
					onChange={(event) => dispatch(storeSetInputParams(id, 2, event.target.value))}
				/>
			</label>
		</div>
	)
}

export default SrtInputOptions
