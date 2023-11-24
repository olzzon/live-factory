import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	storeSetGlobalOutParamArr,
	storeSetOutputValue,
	storeSetOutputParamArr,
	storeSetDockerOutputPorts,
} from '../../../interface/redux/containerActions'
import { RootState } from '../../main'
import CodecTypes from './CodecTypes/CodecTypes'
import { Settings } from '../../../interface/SettingsInterface'
import { parseGlobalOutParamsToTranscoder, parseOutputParamsToTranscoder } from '../../utils/parseParamsToTranscoder'
import { OUTPUT_PARAMS, ValueArg } from '../../../interface/GenericInterfaces'

const LOW_LATENCY = '800'
const ULTRA_LOW_LATENCY = '120'

interface ISrtProps {
	pipelineId: number
	settings: Settings
}

const SrtOutputOptions: React.FC<ISrtProps> = (props) => {
	const dispatch = useDispatch()
	const id = props.pipelineId
	const [collapse, setCollapse] = useState(false)

	const ip = useSelector<RootState, ValueArg>((state) => state.ffmpeg[0].pipeline[id].output.valueArgs[0])
	const port = useSelector<RootState, ValueArg>((state) => state.ffmpeg[0].pipeline[id].output.valueArgs[1])
	const mode = useSelector<RootState, ValueArg>((state) => state.ffmpeg[0].pipeline[id].output.valueArgs[2])
	const passphrase = useSelector<RootState, ValueArg>((state) => state.ffmpeg[0].pipeline[id].output.valueArgs[3])
	const latency = useSelector<RootState, ValueArg>((state) => state.ffmpeg[0].pipeline[id].output.valueArgs[4])
	const protocol = useSelector<RootState, ValueArg>((state) => state.ffmpeg[0].pipeline[id].output.valueArgs[5])
	const [lowLatencyState, setLowLatencyState] = useState<boolean>(
		latency?.valueArg.includes(`&latency=${LOW_LATENCY}`) ? true : false
	)

	useEffect(() => {
		//` -re -i srt://0.0.0.0:9998?pkt_size=1316&mode=listener -vcodec copy -acodec copy -strict -2 -y`))
		// MAC M1 :
		//  ` -c:v h264_videotoolbox -b:v {arg0}k -pix_fmt yuv420p -acodec libopus -b:a {arg1}k`
		// CUDA Linux:
		//  ` -c:v h264_nvenc -preset llhq -zerolatency 1 -b:v 6000k -pix_fmt yuv420p `))

		dispatch(storeSetGlobalOutParamArr(id, parseGlobalOutParamsToTranscoder(props.settings.outputParams, OUTPUT_PARAMS.SRT)))
		dispatch(storeSetOutputParamArr(id, parseOutputParamsToTranscoder(props.settings.outputParams, OUTPUT_PARAMS.SRT)))


		if (!ip) {
			dispatch(storeSetOutputValue(id, 0, { valueArg: ['0.0.0.0']}))
		}
		if (!port) {
			dispatch(storeSetOutputValue(id, 1, { valueArg: ['9998']}))
			dispatch(storeSetDockerOutputPorts(id, [{ip: '0.0.0.0', port: '9998', protocol: 'tcp'}]))
		}
		if (!mode) {
			dispatch(storeSetOutputValue(id, 2, { valueArg: ['listener']}))
		}
		if (!passphrase) {
			dispatch(storeSetOutputValue(id, 3, { valueArg: []}))
		}
		if (lowLatencyState) {
			dispatch(storeSetOutputValue(id, 4, { valueArg: ['&latency=' + LOW_LATENCY]}))
			dispatch(storeSetGlobalOutParamArr(id, ['-fflags nobuffer', '-flags low_delay', '-probesize 32']))
		} else {
			dispatch(storeSetOutputValue(id, 4, { valueArg: []}))
			dispatch(storeSetGlobalOutParamArr(id, []))
		}
		if (!protocol) {
			dispatch(storeSetOutputValue(id, 5, { valueArg: ['mpegts']}))
		}

	}, [])

	const handlePortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(storeSetOutputValue(id, 1, { valueArg: [event.target.value]}))
		dispatch(storeSetDockerOutputPorts(id, [{ip: '0.0.0.0', port: event.target.value, protocol: 'tcp'}]))
	}

	const handleSetLowLatency = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			dispatch(storeSetOutputValue(id, 4, { valueArg: ['&latency=' + LOW_LATENCY]}))
			dispatch(storeSetGlobalOutParamArr(id, ['-fflags nobuffer', '-flags low_delay', '-probesize 32']))
			setLowLatencyState(true)
		} else {
			dispatch(storeSetOutputValue(id, 4, { valueArg: []}))
			dispatch(storeSetGlobalOutParamArr(id, []))
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
						value={ip.valueArg ?? 'none'}
						onChange={(event) => dispatch(storeSetOutputValue(id, 0, { valueArg: [event.target.value]}))}
					/>
				</label>
				<label className="pipeline-label">
					Port :
					<input
						className="input-text"
						type="text"
						value={port.valueArg ?? 'none'}
						onChange={(event) => handlePortChange(event)}
					/>
				</label>
				<label className="pipeline-label">
					Passphrase :
					<input
						className="input-text"
						type="text"
						value={passphrase.valueArg ?? 'none'}
						onChange={(event) => dispatch(storeSetOutputValue(id, 3, { valueArg: [event.target.value]}))}
					/>
				</label>
				<label className="pipeline-label">
					Mode :
					<select
						value={mode.valueArg ?? 'none'}
						onChange={(event) => dispatch(storeSetOutputValue(id, 2, { valueArg: [event.target.value]}))}
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
						value={protocol.valueArg ?? 'mpegts'}
						onChange={(event) => dispatch(storeSetOutputValue(id, 5, { valueArg: [event.target.value]}))}
					>
						<option value="mpegts">Mpeg-Ts</option>
						<option value="matroska">Matroska</option>
					</select>
				</label>
			</div>
			<CodecTypes pipelineId={id} settings={props.settings} />
		</div>
	)
}

export default SrtOutputOptions
