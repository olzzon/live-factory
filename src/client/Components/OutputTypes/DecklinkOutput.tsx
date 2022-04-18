import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	storeSetFilterParamString,
	storeSetGlobalOutParamString,
	storeSetOutputParams,
	storeSetOutputParamString,
} from '../../../interface/redux/containerActions'
import { RootState } from '../../main'

interface IDecklinkProps {
	factoryId: number
}

const DecklinkOutputOptions: React.FC<IDecklinkProps> = (props) => {
	const dispatch = useDispatch()
	const id = props.factoryId

	const outputName = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].output.paramArgs[0])
// -f decklink 'DeckLink Quad ('$1')'
	useEffect(() => {
		dispatch(storeSetGlobalOutParamString(id, ` -re `))
		dispatch(storeSetFilterParamString(id, ` `))
		dispatch(storeSetOutputParamString(id, ` -f decklink '{arg0}'`))
		if (!outputName) {
			dispatch(storeSetOutputParams(id, 0, `DeckLink Quad (1)`))
		}
	}, [])

	return (
		<div className="options">
			<label className="pipeline-label">
				Decklink output :
				<input
					className="input-text"
					type="text"
					value={outputName ?? 'none'}
					onChange={(event) => dispatch(storeSetOutputParams(id, 0, event.target.value))}
				/>
			</label>
		</div>
	)
}

export default DecklinkOutputOptions
