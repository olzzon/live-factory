import React, { useState } from 'react'
import { IFFmpegCommand } from '../../../interface/GenericInterfaces'

interface IMpegtsProps {
	cmd: IFFmpegCommand
	setCmd: React.Dispatch<React.SetStateAction<IFFmpegCommand>>
}

const MpegtsInputOptions: React.FC<IMpegtsProps> = (props) => {
	const [fileLoop, setFileLoop] = useState<number>(1)
	const [fileName, setFileName] = useState<string>('HDR10Jazz.mp4')
	const [filePath, setFilePath] = useState<string>('/Users/olzzon/coding/live-factory/media/')

	const handleFileLoop = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFileLoop(parseInt(event.target.value))
		let next = { ...props.cmd }
		next.input.params[0] = `-stream_loop ${event.target.value} -hwaccel videotoolbox -hwaccel_output_format videotoolbox -re -vsync 0 -i ${filePath}${fileName}`
		props.setCmd(next)
	}

	const handleFileName = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFileName(event.target.value)
		let next = { ...props.cmd }
		next.input.params[0] = `-stream_loop ${fileLoop} -hwaccel videotoolbox -hwaccel_output_format videotoolbox -re -vsync 0 -i ${filePath}${event.target.value}`
		props.setCmd(next)
	}

	const handleFilePath = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFilePath(event.target.value)
		let next = { ...props.cmd }
		next.input.params[0] = `-stream_loop ${fileLoop} -hwaccel videotoolbox -hwaccel_output_format videotoolbox -re -vsync 0 -i ${event.target.value}${fileName}`
		props.setCmd(next)
	}

	return (
		<div className='options'>
			<label className="">
				Path :
				<input className="" type="text" value={filePath} onChange={(event) => handleFilePath(event)} />
			</label>
			<label className="">
				Filename :
				<input className="" type="text" value={fileName} onChange={(event) => handleFileName(event)} />
			</label>
			<label className="">
				File loop (-1 = infinite) :
				<input className="" type="number" value={fileLoop} onChange={(event) => handleFileLoop(event)} />
			</label>
		</div>
	)
}

export default MpegtsInputOptions
