import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	storeSetFilterAudioValue,
	storeSetFilterAudioParamArr,
} from '../../../../../interface/redux/containerActions'
import { RootState } from '../../../../main'

interface ICodecProps {
	pipelineId: number
}

const OpusCodecOptions: React.FC<ICodecProps> = (props) => {
	const dispatch = useDispatch()
	const id = props.pipelineId

	const aBandwidth = useSelector<RootState, string>((state) => state.ffmpeg[0].pipeline[id].audioFilter.valueArgs[0])
	const aAudioTracks = useSelector<RootState, string>((state) => state.ffmpeg[0].pipeline[id].audioFilter.valueArgs[1])

	useEffect(() => {
		dispatch(storeSetFilterAudioParamArr(id, ['-acodec', 'libopus', '-b:a', '{arg0}k']))

		if (!aBandwidth) {
			dispatch(storeSetFilterAudioValue(id, 0, `256`))
		}
		if (!aAudioTracks) {
			dispatch(storeSetFilterAudioValue(id, 1, `2`))
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
					value={aBandwidth ?? '256'}
					onChange={(event) => dispatch(storeSetFilterAudioValue(id, 0, event.target.value))}
				/>
			</label>
			<label className="pipeline-label">
				Audio Tracks
				<select
					value={aAudioTracks || '2'}
					onChange={(e) => dispatch(storeSetFilterAudioValue(id, 1, e.target.value))}
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
