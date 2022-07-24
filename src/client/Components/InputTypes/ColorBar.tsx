import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	storeSetGlobalInParamString,
	storeSetInputParams,
	storeSetInputParamString,
} from '../../../interface/redux/containerActions'
import { RootState } from '../../main'

interface IColorBarProps {
	factoryId: number
}

const ColorbarInputOptions: React.FC<IColorBarProps> = (props) => {
	const dispatch = useDispatch()
	const id = props.factoryId
	const [collapse, setCollapse] = useState(false)

	const resolution = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].input.paramArgs[0])

	useEffect(() => {
		dispatch(storeSetGlobalInParamString(id, '-f lavfi '))
		dispatch(storeSetInputParamString(id, '-i smptehdbars={arg0} '))
		if (!resolution) {
			dispatch(storeSetInputParams(id, 0, '1920x1080'))
		}
	}, [])

	return (
		<div className={collapse ? 'options-collapse' : 'options'}>
			<label className="pipeline-label">
				<button className="collapse-button" onClick={() => setCollapse(!collapse)}>
					{collapse ? `-` : `+`}
				</button>
				Color bar Size :
				<input
					className="input-text"
					type="text"
					value={resolution ?? 'none'}
					onChange={(event) => dispatch(storeSetInputParams(id, 0, event.target.value))}
				/>
			</label>
		</div>
	)
}

export default ColorbarInputOptions
