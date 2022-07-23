import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	storeSetFilterParamString,
	storeSetGlobalOutParamString,
	storeSetOutputParams,
	storeSetOutputParamString,
} from '../../../interface/redux/containerActions'
import { RootState } from '../../main'

interface IOutProps {
	factoryId: number
}

const ScreenOutputOptions: React.FC<IOutProps> = (props) => {
	const dispatch = useDispatch()
	const id = props.factoryId
	const [collapse, setCollapse] = useState(false)

	const outputName = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].output.paramArgs[0])

	useEffect(() => {
		dispatch(storeSetGlobalOutParamString(id, ` `))
		dispatch(storeSetFilterParamString(id, ` `))
		dispatch(storeSetOutputParamString(id, ` -pix_fmt yuv420p -f sdl "Live Factory" `))
	}, [])

	return (
		<div>
			<div className={collapse ? 'options-collapse' : 'options'}>
				<label className="pipeline-label">
					<button onClick={() => setCollapse(!collapse)}>{collapse ? `-` : `+`}</button>
					ToDo: Latency + FullScreen options
					<input
						className="input-text"
						type="text"
						value={outputName ?? 'none'}
						onChange={(event) => dispatch(storeSetOutputParams(id, 0, event.target.value))}
					/>
				</label>
			</div>
		</div>
	)
}

export default ScreenOutputOptions
