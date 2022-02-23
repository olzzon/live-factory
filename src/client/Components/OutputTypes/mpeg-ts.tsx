import React, { useState } from 'react'
import { IFFmpegCommand } from '../../../interface/GenericInterfaces'

interface IMpegTsProps {
	cmd: IFFmpegCommand
	setCmd: React.Dispatch<React.SetStateAction<IFFmpegCommand>>
}

const MpegTsOutputOptions: React.FC<IMpegTsProps> = (props) => {
	const [url, setUrl] = useState<string>('-vcodec libx264 -preset veryfast -pix_fmt yuv420p -strict -2 -y -f mpegts -r 25 udp://localhost:1234?pkt_size=1316')

	const handleResolution = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUrl(event.target.value)
		let next = { ...props.cmd }
		next.output.otherParams[0] = event.target.value
		props.setCmd(next)
	}
	return (
		<div>
			<label className="">
				Color bar Size :
				<input className="" type="text" value={url} onChange={(event) => handleResolution(event)} />
			</label>
			<hr />
		</div>
	)
}

export default MpegTsOutputOptions
