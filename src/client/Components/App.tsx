import React, { useState } from 'react'
import io from 'socket.io-client'
import { IFFmpegCommand, INPUT_TYPES, OUTPUT_TYPES } from '../../interface/GenericInterfaces'
import ColorbarInputOptions from './InputTypes/ColorBar'
import SrtInputOptions from './InputTypes/SrtInput'
import '../styles/app.css'
import * as IO from '../../interface/SocketIOContants'
import MpegTsOutputOptions from './OutputTypes/mpeg-ts'
import FileInputOptions from './InputTypes/File'
const socketClient = io()

const App = () => {
	const [cmd, setCmd] = useState<IFFmpegCommand>({
		global: { otherParams: [''] },
		input: { type: INPUT_TYPES.NONE, otherParams: [''] },
		filter: { otherParams: [''] },
		output: { type: OUTPUT_TYPES.NONE, otherParams: [''] },
	})

	const handleGlobal = (event: React.ChangeEvent<HTMLInputElement>) => {
		let next: IFFmpegCommand = { ...cmd }
		next.global.otherParams = [event.target.value]
		setCmd(next)
	}
	const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		let next: IFFmpegCommand = { ...cmd }
		next.input.otherParams = [event.target.value]
		setCmd(next)
	}

	const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
		let next: IFFmpegCommand = { ...cmd }
		next.filter.otherParams = [event.target.value]
		setCmd(next)
	}

	const handleOutput = (event: React.ChangeEvent<HTMLInputElement>) => {
		let next: IFFmpegCommand = { ...cmd }
		next.output.otherParams = [event.target.value]
		setCmd(next)
	}

	const handlePlayStream = () => {
		socketClient.emit(IO.START_FFPLAY, cmd)
	}
	const handleStartStream = () => {
		socketClient.emit(IO.START_FFMPEG, cmd)
	}

	const handleSelectInputType = (event: React.ChangeEvent<HTMLSelectElement>) => {
		let next: IFFmpegCommand = { ...cmd }
		next.input.type = event.target.value as unknown as INPUT_TYPES
		console.log('SELECTED INPUT : ', next.input.type)
		setCmd(next)
	}

	const handleSelectOutputType = (event: React.ChangeEvent<HTMLSelectElement>) => {
		let next: IFFmpegCommand = { ...cmd }
		next.output.type = event.target.value as unknown as OUTPUT_TYPES
		console.log('SELECTED OUTPUT : ', next.output.type)
		setCmd(next)
	}

	return (
		<React.Fragment>
			<div className="header">
				LIVE FACTORY
				<hr />
			</div>
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
					<hr />
				</label>
				{cmd.input.type === (INPUT_TYPES.SRT) ? <SrtInputOptions {...cmd.input} /> : null}
				{cmd.input.type === (INPUT_TYPES.COLORBAR) ? <ColorbarInputOptions cmd={cmd} setCmd={setCmd} /> : null}
				{cmd.input.type === (INPUT_TYPES.FILE) ? <FileInputOptions cmd={cmd} setCmd={setCmd} /> : null}

				<label className="">
					FFMPEG global :
					<input className="" type="text" value={cmd.global.otherParams[0]} onChange={(event) => handleGlobal(event)} />
				</label>

				<label className="">
					FFMPEG input :
					<input className="" type="text" value={cmd.input.otherParams[0]} onChange={(event) => handleInput(event)} />
				</label>
				<label className="">
					FFMPEG filter :
					<input className="" type="text" value={cmd.filter.otherParams[0]} onChange={(event) => handleFilter(event)} />
				</label>
				<label>
					<hr/>
					SELECT OUTPUT TYPE :
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
					<hr />
				</label>
				{cmd.output.type === (OUTPUT_TYPES.MPEG_TS) ? <MpegTsOutputOptions cmd={cmd} setCmd={setCmd} /> : null}
				<label className="">
					FFMPEG output :
					<input className="" type="text" value={cmd.output.otherParams[0]} onChange={(event) => handleOutput(event)} />
				</label>
				<button className="button" onClick={() => handlePlayStream()}>
					START PLAY
				</button>
				<button className="button" onClick={() => handleStartStream()}>
					START STREAM
				</button>
			</div>
		</React.Fragment>
	)
}

export default App
