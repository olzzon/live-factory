import React, { useState } from 'react'

import { INPUT_TYPES, Pipeline, OUTPUT_TYPES } from '../../interface/GenericInterfaces'
import '../styles/app.css'
import FileInputOptions from './InputTypes/File'
import {
	storeClearFilterAudioValue,
	storeClearFilterValue,
	storeClearGlobalInValue,
	storeClearGlobalOutValue,
	storeClearInputValue,
	storeClearOutputValue,
	storeSetContainerName,
	storeSetNodeIndex,
	storeSetFilterAudioValue,
	storeSetFilterValue,
	storeSetGlobalInValue,
	storeSetGlobalOutValue,
	storeSetInputValue,
	storeSetInputType,
	storeSetOutputValue,
	storeSetOutputType,
} from '../../interface/redux/containerActions'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../main'
import ColorbarInputOptions from './InputTypes/ColorBar'
import MpegtsInputOptions from './InputTypes/Mpegts'
import SrtInputOptions from './InputTypes/SrtInput'
import DecklinkInputOptions from './InputTypes/DecklinkInputOptions'
import SrtOutputOptions from './OutputTypes/SrtOutput'
import NdiInputOptions from './InputTypes/NdiInput'
import NdiOutputOptions from './OutputTypes/NdiOutput'
import MpegTsOutputOptions from './OutputTypes/mpeg-tsOutput'
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
import insertArgsToString from '../utils/insertArgs'
import { ISettings, GPU_TYPES } from '../../interface/SettingsInterface'

export interface Transcoder {
	pipelineId: number
	socketClient: any
	settings: ISettings
}

const Transcoder: React.FC<Transcoder> = (props) => {
	const id = props.pipelineId
	const nodeList = props.settings.nodeList

	const dispatch = useDispatch()

	const pipelineName = useSelector<RootState, string>((state) => state.ffmpeg[0].pipeline[id].containerName)
	const inputType = useSelector<RootState, INPUT_TYPES>((state) => state.ffmpeg[0].pipeline[id].input.type)
	const pipeline = useSelector<RootState, Pipeline>((state) => state.ffmpeg[0].pipeline[id])
	const outputType = useSelector<RootState, OUTPUT_TYPES>((state) => state.ffmpeg[0].pipeline[id].output.type)
	const nodeIndex = useSelector<RootState, number>((state) => state.ffmpeg[0].pipeline[id].nodeIndex)

	const handleSetPipelineType = (event: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(storeSetNodeIndex(id, parseInt(event.target.value)))
	}

	const handleSetInputType = (event: React.ChangeEvent<HTMLSelectElement>) => {
		if ((event.target.value as INPUT_TYPES) !== INPUT_TYPES.CUSTOM) {
			dispatch(storeClearGlobalInValue(id))
			dispatch(storeClearInputValue(id))
		} else {
			dispatch(storeSetGlobalInValue(id, 0, insertArgsToString(pipeline.globalInput.param, pipeline.globalInput.paramArgs)))
			dispatch(storeSetInputValue(id, 0, insertArgsToString(pipeline.input.param, pipeline.input.paramArgs)))
		}
		dispatch(storeSetInputType(id, event.target.value as INPUT_TYPES))
	}

	const handleSetOutputType = (event: React.ChangeEvent<HTMLSelectElement>) => {
		// ToDo: Better clearing of values:
		if ((event.target.value as OUTPUT_TYPES) !== OUTPUT_TYPES.CUSTOM) {
			dispatch(storeClearFilterValue(id))
			dispatch(storeClearFilterAudioValue(id))
			dispatch(storeClearGlobalOutValue(id))
			dispatch(storeClearOutputValue(id))
		} else {
			dispatch(storeSetFilterValue(id, 0, insertArgsToString(pipeline.filter.param, pipeline.filter.paramArgs)))
			dispatch(storeSetFilterAudioValue(id, 0, insertArgsToString(pipeline.audioFilter.param, pipeline.audioFilter.paramArgs)))
			dispatch(storeSetGlobalOutValue(id, 0, insertArgsToString(pipeline.globalOutput.param, pipeline.globalOutput.paramArgs)))
			dispatch(storeSetOutputValue(id, 0, insertArgsToString(pipeline.output.param, pipeline.output.paramArgs)))
		}
		dispatch(storeSetOutputType(id, event.target.value as OUTPUT_TYPES))
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
						{props.settings.allowedInputTypes.map((type, index) => {
							return (
								<option key={index} value={type.value}>
									{type.label}
								</option>
							)
						})}
					</select>
				</label>
				<hr className="horizontal" />

				{inputType === INPUT_TYPES.FILE ? <FileInputOptions pipelineId={id} /> : null}
				{inputType === INPUT_TYPES.COLORBAR ? <ColorbarInputOptions pipelineId={id} /> : null}
				{inputType === INPUT_TYPES.MPEG_TS ? <MpegtsInputOptions pipelineId={id} /> : null}
				{inputType === INPUT_TYPES.UDP ? <UdpInputOptions pipelineId={id} /> : null}
				{inputType === INPUT_TYPES.TCP ? <TcpInputOptions pipelineId={id} /> : null}
				{inputType === INPUT_TYPES.RTP ? <RtpInputOptions pipelineId={id} /> : null}
				{inputType === INPUT_TYPES.SRT ? <SrtInputOptions pipelineId={id} /> : null}
				{inputType === INPUT_TYPES.DECKLINK ? <DecklinkInputOptions pipelineId={id} /> : null}
				{inputType === INPUT_TYPES.NDI ? <NdiInputOptions pipelineId={id} /> : null}
				{inputType === INPUT_TYPES.CUSTOM ? <CustomInputOptions pipelineId={id} /> : null}
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
						{props.settings.allowedOutputTypes.map((type, index) => {
							return (
								<option key={index} value={type.value}>
									{type.label}
								</option>
							)
						})}
					</select>
				</label>
				<hr className="horizontal" />
				{outputType === OUTPUT_TYPES.DECKLINK ? <DecklinkOutputOptions pipelineId={id} settings={props.settings} /> : null}
				{outputType === OUTPUT_TYPES.SRT ? <SrtOutputOptions pipelineId={id} settings={props.settings} /> : null}
				{outputType === OUTPUT_TYPES.MPEG_TS ? <MpegTsOutputOptions pipelineId={id} settings={props.settings} /> : null}
				{outputType === OUTPUT_TYPES.TCP ? <TcpOutputOptions pipelineId={id} settings={props.settings} /> : null}
				{outputType === OUTPUT_TYPES.RTP ? <RtpOutputOptions pipelineId={id} settings={props.settings} /> : null}
				{outputType === OUTPUT_TYPES.NDI ? <NdiOutputOptions pipelineId={id} settings={props.settings} /> : null}
				{outputType === OUTPUT_TYPES.SCREEN ? <ScreenOutputOptions pipelineId={id} settings={props.settings} /> : null}
				{outputType === OUTPUT_TYPES.CUSTOM ? <CustomOutputOptions pipelineId={id} /> : null}
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
						value={pipelineName ?? ''}
						onChange={(event) => dispatch(storeSetContainerName(id, event.target.value))}
					/>
				</label>
				<label className="pipeline-label">
					FFMpeg Node :
					<select
						value={nodeIndex}
						onChange={(event) => {
							handleSetPipelineType(event)
						}}
					>
						{nodeList?.map((pipelineType, index) => {
							return (
								<option key={index} value={index}>
									{pipelineType.name}
								</option>
							)
						})}
					</select>
				</label>
			</div>
			<div className="pipeline-box">
				<DecoderSide />
				<EncoderSide />
			</div>
			<LogOutput pipelineId={props.pipelineId} />
		</div>
	)
}

export default Transcoder
