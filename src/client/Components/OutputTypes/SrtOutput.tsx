import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	storeSetGlobalOutParamString,
	storeSetOutputParams,
	storeSetOutputParamString,
} from '../../../interface/redux/containerActions'
import { RootState } from '../../main'
import CodecTypes from './CodecTypes/CodecTypes'

const LOW_LATENCY = '800'
const ULTRA_LOW_LATENCY = '120'

interface ISrtProps {
	factoryId: number
}

const SrtOutputOptions: React.FC<ISrtProps> = (props) => {
	const dispatch = useDispatch()
	const id = props.factoryId

	const ip = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].output.paramArgs[0])
	const port = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].output.paramArgs[1])
	const mode = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].output.paramArgs[2])
	const passphrase = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].output.paramArgs[3])
	const latency = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].output.paramArgs[4])
	const [ ultraLowLatencyState, setUltraLowLatencyState ] = useState<boolean>(latency?.includes(`&latency=${ULTRA_LOW_LATENCY}`)? true : false)
	const [ lowLatencyState, setLowLatencyState ] = useState<boolean>(latency?.includes(`&latency=${LOW_LATENCY}`)? true : false)


	useEffect(() => {
		//` -re -i srt://0.0.0.0:9998?pkt_size=1316&mode=listener -vcodec copy -acodec copy -strict -2 -y`))
		// MAC M1 : 
		//  ` -c:v h264_videotoolbox -b:v {arg0}k -pix_fmt yuv420p -acodec libopus -b:a {arg1}k`
		// CUDA Linux:
		//  ` -c:v h264_nvenc -preset llhq -zerolatency 1 -b:v 6000k -pix_fmt yuv420p `))

		dispatch(storeSetGlobalOutParamString(id, ` `))
		dispatch(storeSetOutputParamString(id, ` -adrift_threshold 0.06 -async 8000 -f matroska "srt://{arg0}:{arg1}?pkt_size=1316&mode={arg2}&passphrase={arg3}{arg4}" `))

		if (!ip) {
			dispatch(storeSetOutputParams(id, 0, '0.0.0.0'))
		}
		if (!port) {
			dispatch(storeSetOutputParams(id, 1, '9998'))
		}
		if (!mode) {
			dispatch(storeSetOutputParams(id, 2, 'listener'))
		}
		if (!passphrase) {
			dispatch(storeSetOutputParams(id, 3, ''))
		}
		if (ultraLowLatencyState) {
			dispatch(storeSetOutputParams(id, 4, '&latency='+ULTRA_LOW_LATENCY))
		} else 		if (lowLatencyState) {
			dispatch(storeSetOutputParams(id, 4, '&latency='+LOW_LATENCY))
		} else {
			dispatch(storeSetOutputParams(id, 4, ''))
		}
	}, [])

	const handleSetUltraLowLatency = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			dispatch(storeSetOutputParams(id, 4, '&latency='+ULTRA_LOW_LATENCY))
			setUltraLowLatencyState(true)	
			setLowLatencyState(false)					
		} else {
			dispatch(storeSetOutputParams(id, 4, ''))
			setUltraLowLatencyState(false)			
		}
	}

	const handleSetLowLatency = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			dispatch(storeSetOutputParams(id, 4, '&latency='+LOW_LATENCY))
			setLowLatencyState(true)
			setUltraLowLatencyState(false)						
		} else {
			dispatch(storeSetOutputParams(id, 4, ''))
			setLowLatencyState(false)			
		}
	}

	return (
		<div className="options">
			<label className="pipeline-label">
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
				Passphrase :
				<input
					className="input-text"
					type="text"
					value={passphrase ?? 'none'}
					onChange={(event) => dispatch(storeSetOutputParams(id, 3, event.target.value))}
				/>
			</label>
			<label className="pipeline-label">
				Mode (listener or caller) :
				<input
					className="input-text"
					type="text"
					value={mode ?? 0}
					onChange={(event) => dispatch(storeSetOutputParams(id, 2, event.target.value))}
				/>
			</label>
			<label className="pipeline-label">
				Low Latency :
				<input
					className="input-checkbox"
					type="checkbox"
					checked={lowLatencyState}
					onChange={(event) => handleSetLowLatency(event)}
				/>
			</label>
			<label className="pipeline-label">
				Ultralow Latency :
				<input
					className="input-checkbox"
					type="checkbox"
					checked={ultraLowLatencyState}
					onChange={(event) => handleSetUltraLowLatency(event)}
				/>
			</label>
			<CodecTypes factoryId={id}/>
		</div>
	)
}

export default SrtOutputOptions
