import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	storeSetFilterParamArr,
	storeSetGlobalOutParamArr,
	storeSetOutputValue,
	storeSetOutputParamArr,
} from '../../../interface/redux/containerActions'
import { DEVICE_TYPES } from '../../../interface/GenericInterfaces'
import { RootState } from '../../main'
import { ISettings } from '../../../interface/SettingsInterface'

interface IDecklinkProps {
	pipelineId: number
	settings: ISettings
}

const DecklinkOutputOptions: React.FC<IDecklinkProps> = (props) => {
	const dispatch = useDispatch()
	const id = props.pipelineId
	const [collapse, setCollapse] = useState(false)

	const outputName = useSelector<RootState, string>((state) => state.ffmpeg[0].pipeline[id].output.paramArgs[0])
	const channels = useSelector<RootState, string>((state) => state.ffmpeg[0].pipeline[id].output.paramArgs[1])
	const devices = useSelector<RootState, string[]>(
		(state) => state.ffmpeg[0].deviceTypes[DEVICE_TYPES.DECKLINK_OUTPUT]?.devices || []
	)

	useEffect(() => {
		dispatch(storeSetGlobalOutParamArr(id, ['-fflags', 'nobuffer', '-flags', 'low_delay', '-probesize', '32']))
		dispatch(storeSetFilterParamArr(id, []))
		dispatch(storeSetOutputParamArr(id, ['-f', 'decklink', '-pix_fmt', 'uyvy422', '{arg0}']))
		if (!outputName) {
			dispatch(storeSetOutputValue(id, 0, `DeckLink Quad (1)`))
		}
		if (!channels) {
			dispatch(storeSetOutputValue(id, 1, `2`))
		}
	}, [])

	const handleSetDecklinkOutput = (event: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(storeSetOutputValue(id, 0, event.target.value))
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
						onChange={(event) => dispatch(storeSetOutputValue(id, 0, event.target.value))}
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
						onChange={(event) => dispatch(storeSetOutputValue(id, 1, event.target.value))}
					/>
				</label>
			</div>
		</div>
	)
}

export default DecklinkOutputOptions
