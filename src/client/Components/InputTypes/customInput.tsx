import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ValueArg } from '../../../interface/GenericInterfaces'
import {
	storeSetGlobalInValue,
	storeSetGlobalInParamArr,
	storeSetInputValue,
	storeSetInputParamArr,
} from '../../../interface/redux/containerActions'
import { RootState } from '../../main'
import { findGpuSettings } from './DecoderSettings/findGpu'
import { GPU_TYPES } from '../../../interface/SettingsInterface'

interface ICustomProps {
	pipelineId: number
}

const CustomInputOptions: React.FC<ICustomProps> = (props) => {
	const dispatch = useDispatch()
	const id = props.pipelineId
	const [collapse, setCollapse] = useState(false)

	const globalIn = useSelector<RootState, ValueArg>((state) => state.ffmpeg[0].pipeline[id].globalInput.valueArgs[0])
	const input = useSelector<RootState, ValueArg>((state) => state.ffmpeg[0].pipeline[id].input.valueArgs[0])
	const hwAccel = useSelector<RootState, GPU_TYPES>((state) => state.ffmpeg[0].pipeline[id].hwaccell)

	useEffect(() => {
		dispatch(storeSetGlobalInParamArr(id, [`{arg0}`]))
		dispatch(storeSetInputParamArr(id, [`{arg0}`]))

		if (!globalIn) {
			dispatch(storeSetGlobalInValue(id, 0, { valueArg: [`-re`, ...findGpuSettings(hwAccel)]}))
		}
		if (!input) {
			dispatch(storeSetInputValue(id, 0, { valueArg: ['-i', '"srt://0.0.0.0:9998?pkt_size=1316&mode=listener"']}))
		}
	}, [])

	return (
		<div className={collapse ? 'options-collapse' : 'options'}>
			<label className="pipeline-label">
				<button className="collapse-button" onClick={() => setCollapse(!collapse)}>
					{collapse ? `-` : `+`}
				</button>
				GLOBAL IN :
				<input
					className="input-text"
					type="text"
					value={globalIn?.valueArg ?? 'none'}
					onChange={(event) => dispatch(storeSetGlobalInValue(id, 0, { valueArg: [event.target.value]}))}
				/>
			</label>
			<label className="pipeline-label">
				INPUT :
				<input
					className="input-text"
					type="text"
					value={input?.valueArg ?? 'none'}
					onChange={(event) => dispatch(storeSetInputValue(id, 0, { valueArg: [event.target.value]}))}
				/>
			</label>
		</div>
	)
}

export default CustomInputOptions
