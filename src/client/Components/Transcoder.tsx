import React from 'react'

import { INPUT_TYPES, IFactory, OUTPUT_TYPES, DEVICE_TYPES } from '../../interface/GenericInterfaces'
import '../styles/app.css'
import * as IO from '../../interface/SocketIOContants'
import FileInputOptions from './InputTypes/File'
import {
	storeClearFilterParams,
	storeClearGlobalInParams,
	storeClearGlobalOutParams,
	storeClearInputParams,
	storeClearOutputParams,
	storeSetContainerName,
	storeSetFilterParams,
	storeSetGlobalInParams,
	storeSetGlobalOutParams,
	storeSetInputParams,
	storeSetInputType,
	storeSetOutputParams,
	storeSetOutputType,
} from '../../interface/redux/containerActions'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { RootState } from '../main'
import ColorbarInputOptions from './InputTypes/ColorBar'
import MpegtsInputOptions from './InputTypes/Mpegts'
import SrtInputOptions from './InputTypes/SrtInput'
import DecklinkInputOptions from './InputTypes/DecklinkInputOptions'
import SrtOutputOptions from './OutputTypes/SrtOutput'
import NdiInputOptions from './InputTypes/NdiInput'
import NdiOutputOptions from './OutputTypes/NdiOutput'
import MpegTsOutputOptions from './OutputTypes/mpeg-tsOutput'
import RistInputOptions from './InputTypes/RistInput'
import RistOutputOptions from './OutputTypes/RistOutput'
import UdpInputOptions from './InputTypes/UDPinput'
import CustomOutputOptions from './OutputTypes/customOutput'
import TcpInputOptions from './InputTypes/TcpInput'
import TcpOutputOptions from './OutputTypes/TcpOutput'
import CustomInputOptions from './InputTypes/customInput'
import DecklinkOutputOptions from './OutputTypes/DecklinkOutputOptions'
import RtpOutputOptions from './OutputTypes/RtpOutput'
import RtpInputOptions from './InputTypes/RtpInput'
import ScreenOutputOptions from './OutputTypes/ScreenOutput'
import LogOutput from './LogOutput'
import { findGpuSettings } from './InputTypes/DecoderSettings/findGpu'
import insertArgs from '../utils/insertArgs'
import { IFFmpegReducer } from '../../interface/redux/containersReducer'

export interface IfactoryId {
	factoryId: number
	socketClient: any
}

const Transcoder: React.FC<IfactoryId> = (props) => {
	const id = props.factoryId
	const dispatch = useDispatch()

	const factoryName = useSelector<RootState, string>((state) => state.ffmpeg[0].factory[id].containerName)
	const inputType = useSelector<RootState, INPUT_TYPES>((state) => state.ffmpeg[0].factory[id].input.type)
	const factory = useSelector<RootState, IFactory>((state) => state.ffmpeg[0].factory[id])
	const outputType = useSelector<RootState, OUTPUT_TYPES>((state) => state.ffmpeg[0].factory[id].output.type)
	const osType = useSelector<RootState, string>(
		(state) => state.ffmpeg[0].deviceTypes[DEVICE_TYPES.GPU_TYPE]?.devices[0]
	)

	const handleSetInputType = (event: React.ChangeEvent<HTMLSelectElement>) => {
		if ((event.target.value as INPUT_TYPES) !== INPUT_TYPES.CUSTOM) {
			dispatch(storeClearGlobalInParams(id))
			dispatch(storeClearInputParams(id))
		} else {
			dispatch(storeSetGlobalInParams(id, 0, insertArgs(factory.globalInput.param, factory.globalInput.paramArgs)))
			dispatch(storeSetInputParams(id, 0, insertArgs(factory.input.param, factory.input.paramArgs)))
		}
		dispatch(storeSetInputType(id, event.target.value as INPUT_TYPES))
	}

	const handleSetOutputType = (event: React.ChangeEvent<HTMLSelectElement>) => {
		if ((event.target.value as OUTPUT_TYPES) !== OUTPUT_TYPES.CUSTOM) {
			dispatch(storeClearFilterParams(id))
			dispatch(storeClearGlobalOutParams(id))
			dispatch(storeClearOutputParams(id))
		} else {
			dispatch(storeSetFilterParams(id, 0, insertArgs(factory.filter.param, factory.filter.paramArgs)))
			dispatch(storeSetGlobalOutParams(id, 0, insertArgs(factory.globalOutput.param, factory.globalOutput.paramArgs)))
			dispatch(storeSetOutputParams(id, 0, insertArgs(factory.output.param, factory.output.paramArgs)))
		}
		dispatch(storeSetOutputType(id, event.target.value as OUTPUT_TYPES))
	}

	const handleDeleteEncoder = () => {
		console.log('Delete encoder index :', id)
		props.socketClient.emit(IO.DELETE_FACTORY, id)
	}

	const handleStartEncoder = () => {
		console.log('starting encoder index :', id)
		props.socketClient.emit(IO.START_ENCODER, id, factory)
	}

	const handleStopEncoder = () => {
		props.socketClient.emit(IO.UPDATE_FACTORY, id, factory)
		props.socketClient.emit(IO.STOP_ENCODER, id)
	}

	const DecoderSide = () => {
		return (
			<div className="pipeline">
				<label className="pipeline-label">
					Input Type :
					<select
						value={inputType}
						onChange={(event) => {
							handleSetInputType(event)
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
				<hr className="horizontal" />

				{inputType === INPUT_TYPES.FILE ? <FileInputOptions factoryId={id} /> : null}
				{inputType === INPUT_TYPES.COLORBAR ? <ColorbarInputOptions factoryId={id} /> : null}
				{inputType === INPUT_TYPES.MPEG_TS ? <MpegtsInputOptions factoryId={id} /> : null}
				{inputType === INPUT_TYPES.UDP ? <UdpInputOptions factoryId={id} /> : null}
				{inputType === INPUT_TYPES.TCP ? <TcpInputOptions factoryId={id} /> : null}
				{inputType === INPUT_TYPES.RTP ? <RtpInputOptions factoryId={id} /> : null}
				{inputType === INPUT_TYPES.SRT ? <SrtInputOptions factoryId={id} /> : null}
				{inputType === INPUT_TYPES.DECKLINK ? <DecklinkInputOptions factoryId={id} /> : null}
				{inputType === INPUT_TYPES.NDI ? <NdiInputOptions factoryId={id} /> : null}
				{inputType === INPUT_TYPES.CUSTOM ? <CustomInputOptions factoryId={id} /> : null}
			</div>
		)
	}

	const EncoderSide = () => {
		return (
			<div className="pipeline">
				<label className="pipeline-label">
					Output Type :
					<select
						value={outputType}
						onChange={(event) => {
							handleSetOutputType(event)
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
				<hr className="horizontal" />
				{outputType === OUTPUT_TYPES.DECKLINK ? <DecklinkOutputOptions factoryId={id} /> : null}
				{outputType === OUTPUT_TYPES.SRT ? <SrtOutputOptions factoryId={id} /> : null}
				{outputType === OUTPUT_TYPES.MPEG_TS ? <MpegTsOutputOptions factoryId={id} /> : null}
				{outputType === OUTPUT_TYPES.TCP ? <TcpOutputOptions factoryId={id} /> : null}
				{outputType === OUTPUT_TYPES.RTP ? <RtpOutputOptions factoryId={id} /> : null}
				{outputType === OUTPUT_TYPES.NDI ? <NdiOutputOptions factoryId={id} /> : null}
				{outputType === OUTPUT_TYPES.SCREEN ? <ScreenOutputOptions factoryId={id} /> : null}
				{outputType === OUTPUT_TYPES.CUSTOM ? <CustomOutputOptions factoryId={id} /> : null}
			</div>
		)
	}

	return (
		<div className="pipeline-group">
			<div className="pipeline-header">
				<label className="pipeline-label">
					Pipeline Name :
					<input
						className="input-text"
						type="text"
						value={factoryName ?? ''}
						onChange={(event) => dispatch(storeSetContainerName(id, event.target.value))}
					/>
				</label>
			</div>
			<div className="pipeline-box">
				<DecoderSide />
				<EncoderSide />
			</div>
			<LogOutput factoryId={props.factoryId} />
			<div className="pipeline-footer">
				<button className="button" onClick={() => handleDeleteEncoder()}>
					DELETE
				</button>

				<button className="button" onClick={() => handleStopEncoder()}>
					STOP
				</button>
				<button className="button" onClick={() => handleStartEncoder()}>
					START
				</button>
			</div>
		</div>
	)
}

export default Transcoder
