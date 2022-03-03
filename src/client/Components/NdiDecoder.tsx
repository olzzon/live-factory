import React, { useState } from 'react'
import io from 'socket.io-client'
import {
	IInputParams,
	INPUT_TYPES,
	OUTPUT_CODEC,
	OUTPUT_CONTAINER,
	OUTPUT_TYPES,
} from '../../interface/GenericInterfaces'
import ColorbarInputOptions from './InputTypes/ColorBar'
import '../styles/app.css'
import * as IO from '../../interface/SocketIOContants'
import MpegTsOutputOptions from './OutputTypes/mpeg-ts'
import FileInputOptions from './InputTypes/File'
import UdpOutputOptions from './OutputContainers/udp'
import H264OutputCodec from './OutputCodecs/h264'
const socketClient = io()

const NdiDecoder = () => {
	/*
	const [inputType, setInputType] = useState<IInputParams>({ type: INPUT_TYPES.NONE, params: [''] })
	const [cmd, setCmd] = useState<IFFmpegCommand>({
		global: { params: [''] },
		input: { type: INPUT_TYPES.NONE, params: [''] },
		filter: { params: [''] },
		output: { type: OUTPUT_TYPES.NONE, params: [''] },
		outputContainer: { type: OUTPUT_CONTAINER.NONE, params: [''] },
		outputCodec: { type: OUTPUT_CODEC.NONE, params: [''] },
	})

	const handleGlobal = (event: React.ChangeEvent<HTMLInputElement>) => {
		let next: IFFmpegCommand = { ...cmd }
		next.global.params = [event.target.value]
		setCmd(next)
	}
	const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		let next: IFFmpegCommand = { ...cmd }
		next.input.params = [event.target.value]
		setCmd(next)
	}

	const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
		let next: IFFmpegCommand = { ...cmd }
		next.filter.params = [event.target.value]
		setCmd(next)
	}

	const handleOutput = (event: React.ChangeEvent<HTMLInputElement>) => {
		let next: IFFmpegCommand = { ...cmd }
		next.output.params = [event.target.value]
		setCmd(next)
	}

	const handlePlayStream = () => {
		socketClient.emit(IO.START_FFPLAY, cmd)
	}
	const handleStartStream = () => {
		socketClient.emit(IO.START_FFMPEG, cmd)
	}

	const handleStartNdi = () => {
		let next: IFFmpegCommand = { ...cmd }
		next.output.type = OUTPUT_TYPES.NDI
		next.global.params[0] =
			'-stream_loop -1 -hwaccel videotoolbox -hwaccel_output_format videotoolbox -re -vsync 0'
		next.outputContainer.params[0] = '-f libndi_newtek -pix_fmt uyvy422 OUTPUT'
		setCmd(next)
		socketClient.emit(IO.START_FFMPEG, cmd)
	}

	const handleSelectInputType = (event: React.ChangeEvent<HTMLSelectElement>) => {
		let next: IFFmpegCommand = { ...cmd }
		next.input.type = event.target.value as unknown as INPUT_TYPES
		setCmd(next)
	}

	const handleSelectOutputType = (event: React.ChangeEvent<HTMLSelectElement>) => {
		let next: IFFmpegCommand = { ...cmd }
		next.output.type = event.target.value as unknown as OUTPUT_TYPES
		setCmd(next)
	}
	const handleSelectOutputContainer = (event: React.ChangeEvent<HTMLSelectElement>) => {
		let next: IFFmpegCommand = { ...cmd }
		next.outputContainer.type = event.target.value as unknown as OUTPUT_CONTAINER
		setCmd(next)
	}
	const handleSelectOutputCodec = (event: React.ChangeEvent<HTMLSelectElement>) => {
		let next: IFFmpegCommand = { ...cmd }
		next.outputCodec.type = event.target.value as unknown as OUTPUT_CODEC
		setCmd(next)
	}
*/
	return (
		null 
	)
		/*
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
				{cmd.input.type === INPUT_TYPES.COLORBAR ? <ColorbarInputOptions cmd={cmd} setCmd={setCmd} /> : null}
				{cmd.input.type === INPUT_TYPES.FILE ? <FileInputOptions cmd={cmd} setCmd={setCmd} /> : null}
				<hr className="horizontal" />
				<label>
					OUTPUT TYPE :
					<select
						value={cmd.output.type}
						onChange={(event) => {
							handleSelectOutputType(event)
						}}
					>
						{Object.keys(OUTPUT_TYPES).map((key, index) => {
							return (
								<option key={index} value={key}>
									{key}
								</option>
							)
						})}
					</select>
				</label>
				{cmd.output.type === OUTPUT_TYPES.MPEG_TS ? <MpegTsOutputOptions cmd={cmd} setCmd={setCmd} /> : null}
				<hr className="horizontal" />
				<label>
					OUTPUT CONTAINER :
					<select
						value={cmd.outputContainer.type}
						onChange={(event) => {
							handleSelectOutputContainer(event)
						}}
					>
						{Object.keys(OUTPUT_CONTAINER).map((key, index) => {
							return (
								<option key={index} value={key}>
									{key}
								</option>
							)
						})}
					</select>
				</label>
				{cmd.outputContainer.type === OUTPUT_CONTAINER.UDP ? <UdpOutputOptions cmd={cmd} setCmd={setCmd} /> : null}
				<hr className="horizontal" />
				<label>
					OUTPUT CODEC :
					<select
						value={cmd.outputCodec.type}
						onChange={(event) => {
							handleSelectOutputCodec(event)
						}}
					>
						{Object.keys(OUTPUT_CODEC).map((key, index) => {
							return (
								<option key={index} value={key}>
									{key}
								</option>
							)
						})}
					</select>
				</label>
				{cmd.outputCodec.type === OUTPUT_CODEC.H264 ? <H264OutputCodec cmd={cmd} setCmd={setCmd} /> : null}
				<hr className="horizontal" />

				<label className="">
					Factory debug :
					{`${cmd.global.params[0]} ${cmd.input.params[0]} ${cmd.filter.params[0]} ${cmd.outputCodec.params[0]} ${cmd.output.params[0]} ${cmd.outputContainer.params[0]}`}
				</label>
				<button className="button" onClick={() => handlePlayStream()}>
					START PLAY
				</button>
				<button className="button" onClick={() => handleStartStream()}>
					START STREAM
				</button>
				<button className="button" onClick={() => handleStartNdi()}>
					START NDI ENCODER
				</button>
			</div>
		</React.Fragment>
	)*/
}

export default NdiDecoder
