import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	storeSetFilterValue,
	storeSetFilterParamArr,
} from '../../../../interface/redux/containerActions'
import { RootState } from '../../../main'

interface ICodecProps {
	pipelineId: number
}

const H264NativeCodecOptions: React.FC<ICodecProps> = (props) => {
	const dispatch = useDispatch()
	const id = props.pipelineId

	const vBandwidth = useSelector<RootState, string>((state) => state.ffmpeg[0].pipeline[id].filter.paramArgs[0])
	const quality = useSelector<RootState, string>((state) => state.ffmpeg[0].pipeline[id].filter.paramArgs[2])
	const deInterlace = useSelector<RootState, string>((state) => state.ffmpeg[0].pipeline[id].filter.paramArgs[3])
	const [ deinterlaceState, setDeinterlaceState ] = useState<boolean>((deInterlace === '-vf yadif')? true : false)

	useEffect(() => {
		//` -re -i srt://0.0.0.0:9998?pkt_size=1316&mode=listener -vcodec copy -acodec copy -strict -2 -y`))
		// MAC M1 : 
		//  ` -c:v h264_videotoolbox -b:v {arg0}k -pix_fmt yuv420p -acodec libopus -b:a {arg1}k`
		// CUDA Linux:
		//  ` -c:v h264_nvenc -preset llhq -zerolatency 1 -b:v 6000k -pix_fmt yuv420p `))
		// -c:v libx264 -preset veryfast -b:v 22000k -pix_fmt yuv420p -acodec libopus -b:a 256k
		dispatch(storeSetFilterParamArr(id, ['{arg3}', '-c:v', 'libx264', '-preset', 'veryfast', '-b:v', '{arg0}k', '-pix_fmt', 'yuv420p']))

		if (!vBandwidth) {
			dispatch(storeSetFilterValue(id, 0, `22000`))
		}
		if (!quality) {
			dispatch(storeSetFilterValue(id, 2, `90`))	
		}
		if (!deinterlaceState) {
			dispatch(storeSetFilterValue(id, 3, ` `))
		} else {
			dispatch(storeSetFilterValue(id, 3, `-vf yadif`))
		}
	}, [])

	const handleSetDeInterlace = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			dispatch(storeSetFilterValue(id, 3, '-vf yadif'))
			setDeinterlaceState(true)			
		} else {
			dispatch(storeSetFilterValue(id, 3, ' '))
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
					onChange={(event) => dispatch(storeSetFilterValue(id, 0, event.target.value))}
				/>
			</label>
			<label className="pipeline-label">
				Quality (1-100) :
				<input
					className="input-number"
					type="number"
					value={quality ?? '90'}
					onChange={(event) => dispatch(storeSetFilterValue(id, 2, event.target.value))}
				/>
			</label>
		</div>
	)
}

export default H264NativeCodecOptions
