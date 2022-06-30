import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { storeSetFilterParams, storeSetFilterParamString } from '../../../../interface/redux/containerActions'
import { RootState } from '../../../main'

interface ICodecProps {
	factoryId: number
}

const H264NvidiaCodecOptions: React.FC<ICodecProps> = (props) => {
	const dispatch = useDispatch()
	const id = props.factoryId

	
	
	const vBandwidth = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].filter.paramArgs[0])
	const quality = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].filter.paramArgs[2])
	const deInterlace = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].filter.paramArgs[3])
	const [ deinterlaceState, setDeinterlaceState ] = useState<boolean>((deInterlace === '-vf yadif_videotoolbox')? true : false)
	
	useEffect(() => {
		//` -re -i srt://0.0.0.0:9998?pkt_size=1316&mode=listener -vcodec copy -acodec copy -strict -2 -y`))
		// MAC M1 :
		//  ` -c:v h264_videotoolbox -b:v {arg0}k -pix_fmt yuv420p -acodec libopus -b:a {arg1}k`
		// CUDA Linux:
		//  ` -c:v h264_nvenc -preset llhq -zerolatency 1 -b:v 6000k -pix_fmt yuv420p `))

		dispatch(
			storeSetFilterParamString(
				id,
				` {arg3} -c:v h264_nvenc -preset llhq -b:v {arg0}k -cbr true -zerolatency true -pix_fmt yuv420p `
				)
				)
				//`  -c:v hevc_videotoolbox -b:v {arg0}k -pix_fmt yuv422p -realtime true -q:v {arg2} -acodec libopus -b:a {arg1}k `

		if (!vBandwidth) {
			dispatch(storeSetFilterParams(id, 0, `22000`))
		}
		if (!quality) {
			dispatch(storeSetFilterParams(id, 2, `90`))
		}
		if (!deinterlaceState) {
			dispatch(storeSetFilterParams(id, 3, ` `))
		} else {
			dispatch(storeSetFilterParams(id, 3, `-vf yadif_videotoolbox`))
		}
	}, [])

	const handleSetDeInterlace = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			dispatch(storeSetFilterParams(id, 3, '-vf yadif_videotoolbox'))
			setDeinterlaceState(true)			
		} else {
			dispatch(storeSetFilterParams(id, 3, ' '))
			setDeinterlaceState(false)			
		}
	}

	return (
		<div className="options">
			<label className="pipeline-label">
				De-interlace :
				<input
					className="input-checkbox"
					type="checkbox"
					checked={deinterlaceState}
					onChange={(event) => handleSetDeInterlace(event)}
				/>
			</label>
			<label className="pipeline-label">
				Video Bandwidth (in kbit/s) :
				<input
					className="input-number"
					type="number"
					value={vBandwidth ?? '22000'}
					onChange={(event) => dispatch(storeSetFilterParams(id, 0, event.target.value))}
				/>
			</label>
			<label className="pipeline-label">
				Quality (1-100) :
				<input
					className="input-number"
					type="number"
					value={quality ?? '90'}
					onChange={(event) => dispatch(storeSetFilterParams(id, 2, event.target.value))}
				/>
			</label>
		</div>
	)
}

export default H264NvidiaCodecOptions
