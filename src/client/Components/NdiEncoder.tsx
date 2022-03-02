import React, { useState } from 'react'
import io from 'socket.io-client'
import {
	IFFmpegCommand,
	INPUT_TYPES,
	OUTPUT_CODEC,
	OUTPUT_CONTAINER,
	OUTPUT_TYPES,
} from '../../interface/GenericInterfaces'
import ColorbarInputOptions from './InputTypes/ColorBar'
import '../styles/app.css'
import * as IO from '../../interface/SocketIOContants'
import FileInputOptions from './InputTypes/File'
import MpegTsOutputOptions from './OutputTypes/mpeg-ts'
const socketClient = io()

const NdiEncoder = () => {
	const [ndiName, setNdiName] = useState<string>('OUTPUT')
	const [cmd, setCmd] = useState<IFFmpegCommand>({
		global: { otherParams: [''] },
		input: { type: INPUT_TYPES.NONE, params: [''] },
		filter: { params: [''] },
		outputType: { type: OUTPUT_TYPES.NONE, params: [''] },
		outputContainer: { type: OUTPUT_CONTAINER.NONE, params: [''] },
		outputCodec: { type: OUTPUT_CODEC.NONE, params: [''] },
	})

	const handleStartNdi = () => {
		socketClient.emit(IO.START_FFMPEG, cmd)
	}

	const handleSelectInputType = (event: React.ChangeEvent<HTMLSelectElement>) => {
		let next: IFFmpegCommand = { ...cmd }
		next.input.type = event.target.value as unknown as INPUT_TYPES
		setCmd(next)
	}

	const handleNdiName = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNdiName(event.target.value)
		let next: IFFmpegCommand = { ...cmd }
		next.outputType.type = OUTPUT_TYPES.NDI
		next.outputContainer.params[0] = `-f libndi_newtek -pix_fmt uyvy422 ${event.target.value}`
		setCmd(next)
	}

	return (
		<React.Fragment>
			<div className="pipeline">
				<label>
					SELECT INPUT TYPE :
					<select
						value={cmd.input.type}
						onChange={(event) => {
							handleSelectInputType(event)
						}}
					>
						{Object.keys(INPUT_TYPES).map((key, index) => {
							return (
								<option key={index} value={key}>
									{key}
								</option>
							)
						})}
					</select>
				</label>
				{cmd.input.type === INPUT_TYPES.MPEG_TS ? <MpegTsOutputOptions cmd={cmd} setCmd={setCmd} /> : null}
				{cmd.input.type === INPUT_TYPES.COLORBAR ? <ColorbarInputOptions cmd={cmd} setCmd={setCmd} /> : null}
				{cmd.input.type === INPUT_TYPES.FILE ? <FileInputOptions cmd={cmd} setCmd={setCmd} /> : null}
				<hr className="horizontal" />
				<label>
					NDI Name :
					<input className="" type="text" value={ndiName} onChange={(event) => handleNdiName(event)} />
				</label>

				<button className="button" onClick={() => handleStartNdi()}>
					START NDI ENCODER
				</button>
				<label className="debugger">
					Factory debug :
					{`${cmd.global.otherParams[0]} ${cmd.input.params[0]} ${cmd.filter.params[0]} ${cmd.outputCodec.params[0]} ${cmd.outputType.params[0]} ${cmd.outputContainer.params[0]}`}
				</label>
			</div>
		</React.Fragment>
	)
}

export default NdiEncoder
