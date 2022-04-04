import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	storeSetGlobalInParams,
	storeSetInputParams,
} from '../../../interface/redux/containerActions'
import { RootState } from '../../main'

interface IFileProps {
	factoryId: number
}

const NdiInputOptions: React.FC<IFileProps> = (props) => {
	const dispatch = useDispatch()
	const id = props.factoryId

	const ndiName = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].input.params[1])

	useEffect(() => {
		dispatch(storeSetInputParams(id, 0, ` -f libndi_newtek -i "`))
		dispatch(storeSetInputParams(id, 2, `"`))
		if (!ndiName) {
			dispatch(storeSetInputParams(id, 1, `CASPARCG (CCG Ch2)`))			
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
					onChange={(event) => dispatch(storeSetInputParams(id, 1, event.target.value))}
				/>
			</label>
		</div>
	)
}

export default NdiInputOptions
