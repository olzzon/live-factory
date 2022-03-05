import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	storeClearGlobalParams,
	storeClearInputParams,
	storeSetGlobalParams,
	storeSetInputParams,
} from '../../../interface/redux/containerActions'
import { RootState } from '../../main'

interface IColorBarProps {
	factoryId: number
}

const ColorbarInputOptions: React.FC<IColorBarProps> = (props) => {
	const dispatch = useDispatch()
	const id = props.factoryId

	useEffect(() => {
		dispatch(storeClearGlobalParams(id))
		dispatch(storeClearInputParams(id))

		dispatch(storeSetGlobalParams(id, 0, '-f lavfi '))
		dispatch(storeSetInputParams(id, 0, '-i smptehdbars='))
		dispatch(storeSetInputParams(id, 1, '1920x1080 '))
	}, [])

	const resolution = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].input.params[1])

	return (
		<div className="options">
			<label className="pipeline-label">
				Color bar Size :
				<input
					className="input-text"
					type="text"
					value={resolution}
					onChange={(event) => dispatch(storeSetInputParams(id, 1, event.target.value))}
				/>
			</label>
		</div>
	)
}

export default ColorbarInputOptions
