import React from 'react'

import { OUTPUT_ENCODER } from '../../../../interface/GenericInterfaces'
import '../../../styles/app.css'
import { storeClearFilterParams, storeSetFilterType } from '../../../../interface/redux/containerActions'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../main'
import H264MacCodecOptions from './H264_MAC'
import H264NativeCodecOptions from './H264_NATIVE'
import HevcMacCodecOptions from './HEVC_MAC'
import HevcNvidiaCodecOptions from './HEVC_NVIDIA'
import H264NvidiaCodecOptions from './H264_NVIDIA'

export interface IfactoryId {
	factoryId: number
}

const CodecTypes: React.FC<IfactoryId> = (props) => {
	const id = props.factoryId
	const dispatch = useDispatch()

	const outputType = useSelector<RootState, OUTPUT_ENCODER>((state) => state.ffmpeg[0].factory[id].filter.type)

	const handleSetCodecType = (event: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(storeClearFilterParams(id))
		dispatch(storeSetFilterType(id, event.target.value as OUTPUT_ENCODER))
	}

	return (
		<div className="pipeline-codec">
			<hr className="horizontal" />
			<label className="pipeline-label">
				Output Codec :
				<select
					value={outputType}
					onChange={(event) => {
						handleSetCodecType(event)
					}}
				>
					{Object.keys(OUTPUT_ENCODER).map((key, index) => {
						return (
							<option key={index} value={key}>
								{key}
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

export default CodecTypes
