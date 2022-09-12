import React, { useState } from 'react'

import { OUTPUT_AUDIO_ENCODER, OUTPUT_ENCODER } from '../../../../interface/GenericInterfaces'
import '../../../styles/app.css'
import {
	storeClearFilterAudioParams,
	storeClearFilterParams,
	storeSetFilterAudioType,
	storeSetFilterType,
} from '../../../../interface/redux/containerActions'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../main'
import H264MacCodecOptions from './H264_MAC'
import H264NativeCodecOptions from './H264_NATIVE'
import HevcMacCodecOptions from './HEVC_MAC'
import HevcNvidiaCodecOptions from './HEVC_NVIDIA'
import H264NvidiaCodecOptions from './H264_NVIDIA'
import OpusCodecOptions from './AudioCodec/OPUS'
import { ISettings } from '../../../../interface/SettingsInterface'

export interface IfactoryId {
	factoryId: number
	settings: ISettings
}

const CodecTypes: React.FC<IfactoryId> = (props) => {
	const id = props.factoryId
	const dispatch = useDispatch()
	const [collapseVideo, setCollapseVideo] = useState(false)
	const [collapseAudio, setCollapseAudio] = useState(false)

	const outputType = useSelector<RootState, OUTPUT_ENCODER>((state) => state.ffmpeg[0].factory[id].filter.type)
	const audioOutputType = useSelector<RootState, OUTPUT_AUDIO_ENCODER>(
		(state) => state.ffmpeg[0].factory[id].audioFilter?.type
	)

	const handleSetCodecType = (event: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(storeClearFilterParams(id))
		dispatch(storeSetFilterType(id, event.target.value as OUTPUT_ENCODER))
	}

	const handleSetAudioCodecType = (event: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(storeClearFilterAudioParams(id))
		dispatch(storeSetFilterAudioType(id, event.target.value as OUTPUT_AUDIO_ENCODER))
	}

	const VideoCodec = () => {
		return (
			<div className={collapseVideo ? 'pipeline-codec-collapse' : 'pipeline-codec'}>
				<hr className="horizontal" />
				<label className="pipeline-label">
					<button className='collapse-button' onClick={() => setCollapseVideo(!collapseVideo)}>{collapseVideo ? `-` : `+`}</button>
					Video Codec :
					<select
						value={outputType}
						onChange={(event) => {
							handleSetCodecType(event)
						}}
					>
						{props.settings?.allowedOutputEncoderTypes.map((type, index) => {
							return (
								<option key={index} value={type.value}>
									{type.label}
								</option>
							)
						})}
					</select>
				</label>
				{outputType === OUTPUT_ENCODER.H264_MAC ? <H264MacCodecOptions factoryId={id} /> : null}
				{outputType === OUTPUT_ENCODER.HEVC_MAC ? <HevcMacCodecOptions factoryId={id} /> : null}
				{outputType === OUTPUT_ENCODER.H264_NATIVE ? <H264NativeCodecOptions factoryId={id} /> : null}
				{outputType === OUTPUT_ENCODER.HEVC_NVIDIA ? <HevcNvidiaCodecOptions factoryId={id} /> : null}
				{outputType === OUTPUT_ENCODER.H264_NVIDIA ? <H264NvidiaCodecOptions factoryId={id} /> : null}
			</div>
		)
	}

	const AudioCodec = () => {
		return (
			<div className={collapseAudio ? 'pipeline-codec-collapse' : 'pipeline-codec'}>
				<hr className="horizontal" />
				<label className="pipeline-label">
					<button className='collapse-button' onClick={() => setCollapseAudio(!collapseAudio)}>{collapseAudio ? `-` : `+`}</button>
					Audio Codec :
					<select
						value={audioOutputType}
						onChange={(event) => {
							handleSetAudioCodecType(event)
						}}
					>
						{Object.keys(OUTPUT_AUDIO_ENCODER).map((key, index) => {
							return (
								<option key={index} value={key}>
									{key}
								</option>
							)
						})}
					</select>
				</label>
				{audioOutputType === OUTPUT_AUDIO_ENCODER.OPUS ? <OpusCodecOptions factoryId={id} /> : null}
			</div>
		)
	}

	return (
		<div>
			<VideoCodec />
			<AudioCodec />
		</div>
	)
}

export default CodecTypes
