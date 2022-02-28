import React, { useState } from 'react'
import { IFFmpegCommand } from '../../../interface/GenericInterfaces'

interface IMpegTsProps {
	cmd: IFFmpegCommand
	setCmd: React.Dispatch<React.SetStateAction<IFFmpegCommand>>
}

const H264OutputCodec: React.FC<IMpegTsProps> = (props) => {
	const [codec, setCodec] = useState<string>('-vcodec libx264 -preset veryfast -pix_fmt yuv420p -strict -2 -y')

	const handleCodec = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCodec(event.target.value)
		let next = { ...props.cmd }
		next.outputCodec.otherParams[0] = event.target.value
		props.setCmd(next)
	}
	return (
		<div className='options'>
			<label className="">
				Codec :
				<input className="" type="text" value={codec} onChange={(event) => handleCodec(event)} />
			</label>
		</div>
	)
}

export default H264OutputCodec
