import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	storeSetFilterParamString,
	storeSetGlobalOutParamString,
	storeSetOutputParams,
	storeSetOutputParamString,
} from '../../../interface/redux/containerActions'
import { DEVICE_TYPES } from '../../../interface/GenericInterfaces'
import { RootState } from '../../main'

interface IDecklinkProps {
	factoryId: number
}

const DecklinkOutputOptions: React.FC<IDecklinkProps> = (props) => {
	const dispatch = useDispatch()
	const id = props.factoryId
	const [collapse, setCollapse] = useState(false)

	const outputName = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].output.paramArgs[0])
	const channels = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].output.paramArgs[1])
	const devices = useSelector<RootState, string[]>(
		(state) => state.ffmpeg[0].deviceTypes[DEVICE_TYPES.DECKLINK_OUTPUT]?.devices || []
	)

	useEffect(() => {
		dispatch(storeSetGlobalOutParamString(id, ` -fflags nobuffer -flags low_delay -probesize 32 `))
		dispatch(storeSetFilterParamString(id, ` `))
		dispatch(storeSetOutputParamString(id, ` -f decklink -pix_fmt uyvy422 '{arg0}'`))
		if (!outputName) {
			dispatch(storeSetOutputParams(id, 0, `DeckLink Quad (1)`))
		}
		if (!channels) {
			dispatch(storeSetOutputParams(id, 1, `2`))
		}
	}, [])

	const handleSetDecklinkOutput = (event: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(storeSetOutputParams(id, 0, event.target.value))
	}

	return (
		<div>
			<div className={collapse ? 'options-collapse' : 'options'}>
				<label className="pipeline-label">
					<button className='collapse-button' onClick={() => setCollapse(!collapse)}>{collapse ? `-` : `+`}</button>
					Decklink output :
					<input
						className="input-text"
						type="text"
						value={outputName ?? 'none'}
						onChange={(event) => dispatch(storeSetOutputParams(id, 0, event.target.value))}
					/>
				</label>
				<label className="pipeline-label">
					<select
						onChange={(event) => {
							handleSetDecklinkOutput(event)
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
				<label className="pipeline-label">
					Audiochannels (2-16) :
					<input
						className="input-number"
						type="number"
						value={channels ?? 2}
						onChange={(event) => dispatch(storeSetOutputParams(id, 1, event.target.value))}
					/>
				</label>
			</div>
		</div>
	)
}

export default DecklinkOutputOptions
