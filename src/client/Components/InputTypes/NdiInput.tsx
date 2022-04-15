import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	storeSetInputParams,
	storeSetInputParamString,
} from '../../../interface/redux/containerActions'
import { RootState } from '../../main'

interface IFileProps {
	factoryId: number
}

const NdiInputOptions: React.FC<IFileProps> = (props) => {
	const dispatch = useDispatch()
	const id = props.factoryId

	const ndiName = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].input.paramArgs[0])

	useEffect(() => {
		dispatch(storeSetInputParamString(id, ` -f libndi_newtek -i "{arg0}`))
		if (!ndiName) {
			dispatch(storeSetInputParams(id, 0, `CASPARCG (CCG Ch2)`))			
		}
	}, [])

	return (
		<div className="options">
			<label className="pipeline-label">
				NDI Source name :
				<input
					className="input-text"
					type="text"
					value={ndiName ?? 'none'}
					onChange={(event) => dispatch(storeSetInputParams(id, 0, event.target.value))}
				/>
			</label>
		</div>
	)
}

export default NdiInputOptions
