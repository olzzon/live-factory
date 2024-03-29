import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	storeSetFilterParamArr,
	storeSetGlobalOutParamArr,
	storeSetOutputValue,
	storeSetOutputParamArr,
	storeSetDockerOutputPorts,
} from '../../../interface/redux/containerActions'
import { DEVICE_TYPES, OUTPUT_PARAMS, ValueArg } from '../../../interface/GenericInterfaces'
import { RootState } from '../../main'
import { Settings } from '../../../interface/SettingsInterface'
import { parseGlobalOutParamsToTranscoder, parseOutputParamsToTranscoder } from '../../utils/parseParamsToTranscoder'

interface DecklinkProps {
	pipelineId: number
	settings: Settings
}

const DecklinkOutputOptions: React.FC<DecklinkProps> = (props) => {
	const dispatch = useDispatch()
	const id = props.pipelineId
	const [collapse, setCollapse] = useState(false)

	const outputName = useSelector<RootState, ValueArg>((state) => state.ffmpeg[0].pipeline[id].output.valueArgs[0])
	const channels = useSelector<RootState, ValueArg>((state) => state.ffmpeg[0].pipeline[id].output.valueArgs[1])
	const devices = useSelector<RootState, string[]>(
		(state) => state.ffmpeg[0].deviceTypes[DEVICE_TYPES.DECKLINK_OUTPUT]?.devices || []
	)

	useEffect(() => {
		dispatch(storeSetGlobalOutParamArr(id, parseGlobalOutParamsToTranscoder(props.settings.outputParams, OUTPUT_PARAMS.DECKLINK)))
		dispatch(storeSetOutputParamArr(id, parseOutputParamsToTranscoder(props.settings.outputParams, OUTPUT_PARAMS.DECKLINK)))
		dispatch(storeSetDockerOutputPorts(id, []))

		dispatch(storeSetFilterParamArr(id, []))
		if (!outputName) {
			dispatch(storeSetOutputValue(id, 0, { valueArg: ['DeckLink Quad (1)']}))
		}
		if (!channels) {
			dispatch(storeSetOutputValue(id, 1, { valueArg: ['2']}))
		}
	}, [])

	const handleSetDecklinkOutput = (event: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(storeSetOutputValue(id, 0, { valueArg: [event.target.value]}))
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
						value={outputName?.valueArg ?? 'none'}
						onChange={(event) => dispatch(storeSetOutputValue(id, 0, { valueArg: [event.target.value]}))}
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
						value={channels?.valueArg ?? 2}
						onChange={(event) => dispatch(storeSetOutputValue(id, 1, { valueArg: [event.target.value]}))}
					/>
				</label>
			</div>
		</div>
	)
}

export default DecklinkOutputOptions
