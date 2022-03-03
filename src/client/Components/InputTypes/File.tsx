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
		dispatch(storeClearGlobalParams(id))
		dispatch(storeClearInputParams(id))

		dispatch(storeSetGlobalParams(id, 0, ` -stream_loop `))
		dispatch(storeSetGlobalParams(id, 1, `1 `))
		dispatch(storeSetInputParams(id, 0, `-hwaccel videotoolbox -re -vsync 0 -i `))
		dispatch(storeSetInputParams(id, 1, '/Users/olzzon/coding/live-factory/media/'))
		dispatch(storeSetInputParams(id, 2, 'HDR10Jazz.mp4'))
	}, [])

	const fileLoop = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].global.params[1])
	const filePath = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].input.params[1])
	const fileName = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].input.params[2])

	return (
		<div className="options">
			<label className="">
				Path :
				<input
					className=""
					type="text"
					value={filePath}
					onChange={(event) => dispatch(storeSetInputParams(id, 1, event.target.value))}
				/>
			</label>
			<label className="">
				Filename :
				<input
					className=""
					type="text"
					value={fileName}
					onChange={(event) => dispatch(storeSetInputParams(id, 2, event.target.value))}
				/>
			</label>
			<label className="">
				File loop (-1 = infinite) :
				<input
					className=""
					type="number"
					value={fileLoop}
					onChange={(event) => dispatch(storeSetGlobalParams(id, 1, event.target.value))}
				/>
			</label>
		</div>
	)
}

export default FileInputOptions
