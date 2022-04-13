import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	storeSetFilterParams,
	storeSetOutputParams,
} from '../../../interface/redux/containerActions'
import { RootState } from '../../main'

interface ISrtProps {
	factoryId: number
}

const MpegTsOutputOptions: React.FC<ISrtProps> = (props) => {
	const dispatch = useDispatch()
	const id = props.factoryId

	const vCodec = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].filter.params[0])
	const aCodec = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].filter.params[1])
	const ip = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].output.params[1])
	const port = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].output.params[3])


	useEffect(() => {
		//` -re -i srt://0.0.0.0:9998?pkt_size=1316&mode=listener -vcodec copy -acodec copy -strict -2 -y`))
		dispatch(storeSetOutputParams(id, 0, ` -f mpegts "udp://`))
		dispatch(storeSetOutputParams(id, 2, `:`))
		dispatch(storeSetOutputParams(id, 4, `?pkt_size=1316"`))
		if (!ip) {
			dispatch(storeSetOutputParams(id, 1, '0.0.0.0'))
		}
		if (!port) {
			dispatch(storeSetOutputParams(id, 3, '1234'))
		}
		if (!vCodec) {
			// MAC M1 : 
			dispatch(storeSetFilterParams(id, 0, `  -c:v h264_videotoolbox -b:v 22000k -pix_fmt yuv420p `))
			// CUDA Linux:
			// dispatch(storeSetFilterParams(id, 0, `  -c:v h264_nvenc -preset llhq -zerolatency 1 -b:v 6000k -pix_fmt yuv420p `))
		}
		if (!aCodec) {
			dispatch(storeSetFilterParams(id, 1, `   -acodec libopus -b:a 256k `))	
		}
	}, [])

	return (
		<div className="options">
			<label className="pipeline-label">
				Video Codec :
				<input
					className="input-text"
					type="text"
					value={vCodec ?? 'none'}
					onChange={(event) => dispatch(storeSetFilterParams(id, 0, event.target.value))}
				/>
			</label>
			<label className="pipeline-label">
				Audio Codec :
				<input
					className="input-text"
					type="text"
					value={aCodec ?? 'none'}
					onChange={(event) => dispatch(storeSetFilterParams(id, 1, event.target.value))}
				/>
			</label>
			<label className="pipeline-label">
				IP :
				<input
					className="input-text"
					type="text"
					value={ip ?? 'none'}
					onChange={(event) => dispatch(storeSetOutputParams(id, 1, event.target.value))}
				/>
			</label>
			<label className="pipeline-label">
				Port :
				<input
					className="input-text"
					type="text"
					value={port ?? 'none'}
					onChange={(event) => dispatch(storeSetOutputParams(id, 3, event.target.value))}
				/>
			</label>
		</div>
	)
}


/*
interface IMpegTsProps {
factoryId: number
}

const MpegTsOutputOptions: React.FC<IMpegTsProps> = (props) => {
	const [url, setUrl] = useState<string>('-f mpegts -r 25')

	const handleType = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUrl(event.target.value)
		let next = { ...props.cmd }
		next.output.params[0] = event.target.value
		props.setCmd(next)
	}
	return (
		<div className='options'>
			<label className="">
				URL :
				<input className="" type="text" value={url} onChange={(event) => handleType(event)} />
			</label>
		</div>
	)
}

*/

export default MpegTsOutputOptions
