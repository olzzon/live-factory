import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	storeSetFilterAudioParams,
	storeSetFilterAudioParamString,
} from '../../../../../interface/redux/containerActions'
import { RootState } from '../../../../main'

interface ICodecProps {
	factoryId: number
}

const OpusCodecOptions: React.FC<ICodecProps> = (props) => {
	const dispatch = useDispatch()
	const id = props.factoryId

	const aBandwidth = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].audioFilter.paramArgs[0])

	useEffect(() => {
		dispatch(storeSetFilterAudioParamString(id, ` -acodec libopus -b:a {arg0}k `))

		if (!aBandwidth) {
			dispatch(storeSetFilterAudioParams(id, 0, `256`))	
		}
	}, [])

	return (
		<div className="options">
			<label className="pipeline-label">
				Audio Bandwidth (in kbit/s) :
				<input
					className="input-number"
					type="number"
					value={aBandwidth ?? '256'}
					onChange={(event) => dispatch(storeSetFilterAudioParams(id, 0, event.target.value))}
				/>
			</label>
		</div>
	)
}

export default OpusCodecOptions
