import React, { useState } from 'react'
import { IFFmpegCommand } from '../../../interface/GenericInterfaces'

interface IColorBarProps {
	cmd: IFFmpegCommand
	setCmd: React.Dispatch<React.SetStateAction<IFFmpegCommand>>
}

const ColorbarInputOptions: React.FC<IColorBarProps> = (props) => {
	const [resolution, setResolution] = useState<string>('1920x1080')

	const handleResolution = (event: React.ChangeEvent<HTMLInputElement>) => {
		setResolution(event.target.value)
		let next = { ...props.cmd }
		next.input.params[0] = '-i smptehdbars=' + event.target.value
		next.global.params[0] = '-f lavfi'
		props.setCmd(next)
	}
	return (
		<div className='options'>
			<label className="">
				Color bar Size :
				<input className="" type="text" value={resolution} onChange={(event) => handleResolution(event)} />
			</label>
		</div>
	)
}

export default ColorbarInputOptions
