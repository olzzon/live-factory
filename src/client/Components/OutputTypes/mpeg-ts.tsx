import React, { useState } from 'react'
import { IFFmpegCommand } from '../../../interface/GenericInterfaces'

interface IMpegTsProps {
	cmd: IFFmpegCommand
	setCmd: React.Dispatch<React.SetStateAction<IFFmpegCommand>>
}

const MpegTsOutputOptions: React.FC<IMpegTsProps> = (props) => {
	const [url, setUrl] = useState<string>('-f mpegts -r 25')

	const handleType = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUrl(event.target.value)
		let next = { ...props.cmd }
		next.outputType.otherParams[0] = event.target.value
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

export default MpegTsOutputOptions
