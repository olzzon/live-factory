import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { storeClearGlobalParams, storeClearInputParams, storeSetGlobalParams, storeSetInputParams } from '../../../interface/redux/containerActions'
import { RootState } from '../../main'

interface IFileProps {
	factoryId: number
}

const FileInputOptions: React.FC<IFileProps> = (props) => {
	const dispatch = useDispatch()
	const id = props.factoryId

	useEffect(() => {
		dispatch(storeSetGlobalParams(id, 0, ` -stream_loop `))
		dispatch(storeSetInputParams(id, 0, ` -hwaccel videotoolbox -re -vsync 0 -i `))
	}, [])

	const fileLoop = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].global.params[1])
	const filePath = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].input.params[1])
	const fileName = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].input.params[2])

	return (
		<div className="options">
			<label className='pipeline-label'>
				Path :
				<input
					className="input-text"
					type="text"
					value={filePath ?? '/Users/olzzon/coding/live-factory/media/'}
					onChange={(event) => dispatch(storeSetInputParams(id, 1, event.target.value))}
				/>
			</label>
			<label className='pipeline-label'>
				Filename :
				<input
					className="input-text"
					type="text"
					value={fileName ?? 'HDR10Jazz.mp4'}
					onChange={(event) => dispatch(storeSetInputParams(id, 2, event.target.value))}
				/>
			</label>
			<label className='pipeline-label'>
				File loop (-1 = infinite) :
				<input
					className="input-number"
					type="number"
					value={fileLoop ?? 1}
					onChange={(event) => dispatch(storeSetGlobalParams(id, 1, event.target.value))}
				/>
			</label>
		</div>
	)
}

export default FileInputOptions
