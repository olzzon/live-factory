import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	storeSetOutputParams,
} from '../../../interface/redux/containerActions'
import { RootState } from '../../main'

interface INdiProps {
	factoryId: number
}

const NdiOutputOptions: React.FC<INdiProps> = (props) => {
	const dispatch = useDispatch()
	const id = props.factoryId

	const outputName = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].output.params[1])


	useEffect(() => {
		dispatch(storeSetOutputParams(id, 0, ` -f libndi_newtek -pix_fmt uyvy422 `))
		if (!outputName) {
			dispatch(storeSetOutputParams(id, 1, `NDI_PIPE${id + 1}`))
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
					onChange={(event) => dispatch(storeSetOutputParams(id, 1, event.target.value))}
				/>
			</label>
		</div>
	)
}

export default NdiOutputOptions
