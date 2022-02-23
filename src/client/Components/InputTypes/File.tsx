import React, { useState } from 'react'
import { IFFmpegCommand } from '../../../interface/GenericInterfaces'

interface IFileProps {
	cmd: IFFmpegCommand
	setCmd: React.Dispatch<React.SetStateAction<IFFmpegCommand>>
}

const FileInputOptions: React.FC<IFileProps> = (props) => {
	const [fileLoop, setFileLoop] = useState<number>(1)
	const [fileName, setFileName] = useState<string>('smpte.mp4')

	const handleFileLoop = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFileLoop(parseInt(event.target.value))
		let next = { ...props.cmd }
		next.input.otherParams[0] = `-stream_loop ${event.target.value} -i ${fileName}`
		props.setCmd(next)
	}

	const handleFileName = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFileName(event.target.value)
		let next = { ...props.cmd }
		next.input.otherParams[0] = `-stream_loop ${fileLoop} -i ${event.target.value}`
		props.setCmd(next)
	}

	return (
		<div>
			<label className="">
				Filename :
				<input className="" type="text" value={fileName} onChange={(event) => handleFileName(event)} />
			</label>
			<label className="">
				File loop (-1 = infinite) :
				<input className="" type="number" value={fileLoop} onChange={(event) => handleFileLoop(event)} />
			</label>
			<hr />
		</div>
	)
}

export default FileInputOptions
