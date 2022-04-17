import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	storeSetGlobalInParams,
	storeSetGlobalInParamString,
	storeSetInputParams,
	storeSetInputParamString,
} from '../../../interface/redux/containerActions'
import { RootState } from '../../main'

interface ICustomProps {
	factoryId: number
}

const CustomInputOptions: React.FC<ICustomProps> = (props) => {
	const dispatch = useDispatch()
	const id = props.factoryId

	const globalIn = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].globalInput.paramArgs[0])
	const input = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].input.paramArgs[0])

	useEffect(() => {
		dispatch(storeSetGlobalInParamString(id, `{arg0}`))
		dispatch(storeSetInputParamString(id, `{arg0}`))

		if (!globalIn) {
			dispatch(storeSetGlobalInParams(id, 0, `  -hwaccel videotoolbox `))
		}
		if (!input) {
			dispatch(storeSetInputParams(id, 0, `  -i "srt://0.0.0.0:9998?pkt_size=1316&mode=listener" `))
		}
	}, [])

	return (
		<div className="options">
			<label className="pipeline-label">
				GLOBAL IN :
				<input
					className="input-text"
					type="text"
					value={globalIn ?? 'none'}
					onChange={(event) => dispatch(storeSetGlobalInParams(id, 0, event.target.value))}
				/>
			</label>
			<label className="pipeline-label">
				INPUT :
				<input
					className="input-text"
					type="text"
					value={input ?? 'none'}
					onChange={(event) => dispatch(storeSetInputParams(id, 0, event.target.value))}
				/>
			</label>
		</div>
	)
}

export default CustomInputOptions