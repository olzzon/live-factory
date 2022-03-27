import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	storeSetGlobalInParams,
	storeSetInputParams,
} from '../../../interface/redux/containerActions'
import { RootState } from '../../main'

interface IFileProps {
	factoryId: number
}

const FileInputOptions: React.FC<IFileProps> = (props) => {
	const dispatch = useDispatch()
	const id = props.factoryId

	const fileLoop = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].globalInput.params[1])
	const filePath = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].input.params[1])
	const fileName = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].input.params[2])

	useEffect(() => {
		dispatch(storeSetGlobalInParams(id, 0, ` -stream_loop `))
		dispatch(storeSetInputParams(id, 0, ` -hwaccel videotoolbox -re -vsync 0 -i `))
		if (!fileLoop) {
			dispatch(storeSetGlobalInParams(id, 1, '1'))
		}
		if (!filePath) {
			dispatch(storeSetInputParams(id, 1, '/Users/olzzon/coding/live-factory/media/'))
		}
		if (!fileName) {
			dispatch(storeSetInputParams(id, 2, 'HDR10Jazz.mp4'))
		}
	}, [])

	return (
		<div className="options">
			<label className="pipeline-label">
				Path :
				<input
					className="input-text"
					type="text"
					value={filePath ?? 'none'}
					onChange={(event) => dispatch(storeSetInputParams(id, 1, event.target.value))}
				/>
			</label>
			<label className="pipeline-label">
				Filename :
				<input
					className="input-text"
					type="text"
					value={fileName ?? 'none'}
					onChange={(event) => dispatch(storeSetInputParams(id, 2, event.target.value))}
				/>
			</label>
			<label className="pipeline-label">
				File loop (-1 = infinite) :
				<input
					className="input-number"
					type="number"
					value={fileLoop ?? 0}
					onChange={(event) => dispatch(storeSetGlobalInParams(id, 1, event.target.value))}
				/>
			</label>
		</div>
	)
}

export default FileInputOptions
