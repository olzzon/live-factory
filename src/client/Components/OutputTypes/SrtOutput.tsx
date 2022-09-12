import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	storeSetGlobalOutParamString,
	storeSetOutputParams,
	storeSetOutputParamString,
} from '../../../interface/redux/containerActions'
import { RootState } from '../../main'
import CodecTypes from './CodecTypes/CodecTypes'
import { ISettings } from '../../../interface/SettingsInterface'

const LOW_LATENCY = '800'
const ULTRA_LOW_LATENCY = '120'

interface ISrtProps {
	factoryId: number
	settings: ISettings
}

const SrtOutputOptions: React.FC<ISrtProps> = (props) => {
	const dispatch = useDispatch()
	const id = props.factoryId
	const [collapse, setCollapse] = useState(false)

	const ip = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].output.paramArgs[0])
	const port = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].output.paramArgs[1])
	const mode = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].output.paramArgs[2])
	const passphrase = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].output.paramArgs[3])
	const latency = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].output.paramArgs[4])
	const protocol = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].output.paramArgs[5])
	const [lowLatencyState, setLowLatencyState] = useState<boolean>(
		latency?.includes(`&latency=${LOW_LATENCY}`) ? true : false
	)

	useEffect(() => {
		//` -re -i srt://0.0.0.0:9998?pkt_size=1316&mode=listener -vcodec copy -acodec copy -strict -2 -y`))
		// MAC M1 :
		//  ` -c:v h264_videotoolbox -b:v {arg0}k -pix_fmt yuv420p -acodec libopus -b:a {arg1}k`
		// CUDA Linux:
		//  ` -c:v h264_nvenc -preset llhq -zerolatency 1 -b:v 6000k -pix_fmt yuv420p `))

		dispatch(storeSetGlobalOutParamString(id, `  `))
		dispatch(
			storeSetOutputParamString(
				id,
				` -adrift_threshold 0.06 -async 8000 -f {arg5} "srt://{arg0}:{arg1}?pkt_size=1316&mode={arg2}&passphrase={arg3}{arg4}" `
			)
		)

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
		if (lowLatencyState) {
			dispatch(storeSetOutputParams(id, 4, '&latency=' + LOW_LATENCY))
			dispatch(storeSetGlobalOutParamString(id, ` -fflags nobuffer -flags low_delay -probesize 32 `))
		} else {
			dispatch(storeSetOutputParams(id, 4, ''))
			dispatch(storeSetGlobalOutParamString(id, `  `))
		}
		if (!protocol) {
			dispatch(storeSetOutputParams(id, 5, 'mpegts'))
		}

	}, [])

	const handleSetLowLatency = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			dispatch(storeSetOutputParams(id, 4, '&latency=' + LOW_LATENCY))
			dispatch(storeSetGlobalOutParamString(id, ` -fflags nobuffer -flags low_delay -probesize 32 `))
			setLowLatencyState(true)
		} else {
			dispatch(storeSetOutputParams(id, 4, ''))
			dispatch(storeSetGlobalOutParamString(id, `  `))
			setLowLatencyState(false)
		}
	}

	return (
		<div>
			<div className={collapse ? "options-collapse" : "options"}>
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
					Passphrase :
					<input
						className="input-text"
						type="text"
						value={passphrase ?? 'none'}
						onChange={(event) => dispatch(storeSetOutputParams(id, 3, event.target.value))}
					/>
				</label>
				<label className="pipeline-label">
					Mode :
					<select
						value={mode ?? 'none'}
						onChange={(event) => dispatch(storeSetOutputParams(id, 2, event.target.value))}
					>
						<option value="listener">Listener</option>
						<option value="caller">Caller</option>
					</select>
				</label>
				<label className="pipeline-label">
					Force Low Latency :
					<input
						className="input-checkbox"
						type="checkbox"
						checked={lowLatencyState}
						onChange={(event) => handleSetLowLatency(event)}
					/>
				</label>
				<label className="pipeline-label">
					Protocol :
					<select
						value={protocol ?? 'mpegts'}
						onChange={(event) => dispatch(storeSetOutputParams(id, 5, event.target.value))}
					>
						<option value="mpegts">Mpeg-Ts</option>
						<option value="matroska">Matroska</option>
					</select>
				</label>
			</div>
			<CodecTypes factoryId={id} settings={props.settings} />
		</div>
	)
}

export default SrtOutputOptions
