import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { storeClearGlobalParams, storeClearInputParams, storeSetInputParams } from '../../../interface/redux/containerActions'
import { RootState } from '../../main'

interface IMpegtsProps {
	factoryId: number
}

const MpegtsInputOptions: React.FC<IMpegtsProps> = (props) => {
	const dispatch = useDispatch()
	const id = props.factoryId

	useEffect(() => {
		dispatch(storeClearGlobalParams(id))
		dispatch(storeClearInputParams(id))

		dispatch(storeSetInputParams(id, 0, ' -i udp://'))
		dispatch(storeSetInputParams(id, 1, 'localhost:1234'))
	}, [])

	const url = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].input.params[1])


	return (
		<div className='options'>
			<label className="">
				URL :
				<input className="" type="text" value={url} onChange={(event) => dispatch(storeSetInputParams(id, 1, event.target.value))} />
			</label>
		</div>
	)
}

export default MpegtsInputOptions
