import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	storeSetFilterParamString,
	storeSetGlobalOutParamString,
	storeSetOutputParams,
	storeSetOutputParamString,
} from '../../../interface/redux/containerActions'
import { RootState } from '../../main'

interface INdiProps {
	factoryId: number
}

const NdiOutputOptions: React.FC<INdiProps> = (props) => {
	const dispatch = useDispatch()
	const id = props.factoryId

	const outputName = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].output.paramArgs[0])

	useEffect(() => {
		dispatch(storeSetGlobalOutParamString(id, ` -probesize 32 `))
		dispatch(storeSetFilterParamString(id, ` `))
		dispatch(storeSetOutputParamString(id, ` -f libndi_newtek -pix_fmt uyvy422 {arg0}`))
		if (!outputName) {
			dispatch(storeSetOutputParams(id, 0, `NDI_PIPE${id + 1}`))
		}
	}, [])

	return (
		<div className="options">
			<label className="pipeline-label">
				NDI output name :
				<input
					className="input-text"
					type="text"
					value={outputName ?? 'none'}
					onChange={(event) => dispatch(storeSetOutputParams(id, 0, event.target.value))}
				/>
			</label>
		</div>
	)
}

export default NdiOutputOptions
