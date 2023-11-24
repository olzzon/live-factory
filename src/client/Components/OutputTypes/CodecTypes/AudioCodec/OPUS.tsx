import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	storeSetFilterAudioValue,
	storeSetFilterAudioParamArr,
} from '../../../../../interface/redux/containerActions'
import { RootState } from '../../../../main'
import { ValueArg } from '../../../../../interface/GenericInterfaces'

interface ICodecProps {
	pipelineId: number
}

const OpusCodecOptions: React.FC<ICodecProps> = (props) => {
	const dispatch = useDispatch()
	const id = props.pipelineId

	const aBandwidth = useSelector<RootState, ValueArg>((state) => state.ffmpeg[0].pipeline[id].audioFilter.valueArgs[0])
	const aAudioTracks = useSelector<RootState, ValueArg>((state) => state.ffmpeg[0].pipeline[id].audioFilter.valueArgs[1])

	useEffect(() => {
		dispatch(storeSetFilterAudioParamArr(id, ['-acodec', 'libopus', '-b:a', '{arg0}k']))

		if (!aBandwidth) {
			dispatch(storeSetFilterAudioValue(id, 0, { valueArg: ['256']}))
		}
		if (!aAudioTracks) {
			dispatch(storeSetFilterAudioValue(id, 1, { valueArg: ['2']}))
		}
	}, [])

	// add handler for handling 8 audiotracks with OPUS codec

	return (
		<div className="options">
			<label className="pipeline-label">
				Audio Bandwidth (in kbit/s) :
				<input
					className="input-number"
					type="number"
					value={aBandwidth.valueArg ?? '256'}
					onChange={(event) => dispatch(storeSetFilterAudioValue(id, 0, { valueArg: [event.target.value]}))}
				/>
			</label>
			<label className="pipeline-label">
				Audio Tracks
				<select
					value={aAudioTracks.valueArg || '2'}
					onChange={(e) => dispatch(storeSetFilterAudioValue(id, 1, { valueArg: [e.target.value]}))}
				>
					<option value="2">Stereo</option>
					<option value="4">4-tracks</option>
					<option value="8">8-tracks</option>
				</select>
			</label>
		</div>
	)
}

export default OpusCodecOptions
