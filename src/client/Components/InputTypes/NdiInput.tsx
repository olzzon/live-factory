import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DEVICE_TYPES, IDeviceList } from '../../../interface/GenericInterfaces'
import {
	storeSetGlobalInParamString,
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
	const devices = useSelector<RootState, string[]>((state) => state.ffmpeg[0].deviceTypes[DEVICE_TYPES.NDI].devices || [])

	useEffect(() => {
		dispatch(storeSetGlobalInParamString(id, ``))
		dispatch(storeSetInputParamString(id, ` -f libndi_newtek -i "{arg0}"`))
		if (!ndiName) {
			dispatch(storeSetInputParams(id, 0, 'HOSTNAME (NDINAME)'))			
		}
	}, [])

	const handleSetNdiSource = (event: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(storeSetInputParams(id, 0, event.target.value))
	}

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
			<label className="pipeline-label">
					Discovered NDI Sources :
					<select
						onChange={(event) => {
							handleSetNdiSource(event)
						}}
					>
						{devices.map((source, index) => {
							return (
								<option key={index} value={source}>
									{source}
								</option>
							)
						})}
					</select>
				</label>
		</div>
	)
}

export default NdiInputOptions
