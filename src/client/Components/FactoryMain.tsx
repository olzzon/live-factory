import React, { useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { Pipeline } from '../../interface/GenericInterfaces'
import { RootState } from '../main'

import io from 'socket.io-client'
import * as IO from '../../interface/SocketIOContants'
import { Settings } from '../../interface/SettingsInterface'
import Transcoder from './Transcoder'
import PipelineHandler from './PipelineHandler'
const socketClient = io()

const FactoryMain: React.FC = () => {
	const [selectedEncoder, setSelectedEncoder] = useState(0)
	const [settings, setSettings] = useState<Settings>({
		maxActiveEncoders: 1,
		nodeList: [],
		allowedInputTypes: [],
		allowedOutputTypes: [],
		allowedOutputEncoderTypes: [],
		inputParams: [],
		outputParams: [],
	})
	const pipelines = useSelector<RootState, Pipeline[]>((state) => state.ffmpeg[0].pipeline, shallowEqual)

	socketClient.on(IO.SETTINGS, (settings: Settings) => {
		console.log('settings received :', settings)
		
		setSettings(settings)
	})

	return (
		<div className="factory-handler">
			<PipelineHandler
				selectedPipeline={selectedEncoder < pipelines.length ? selectedEncoder : 0}
				socketClient={socketClient}
				setSelectedPipeline={setSelectedEncoder}
				settings={settings}
			/>
			<Transcoder pipelineId={selectedEncoder < pipelines.length ? selectedEncoder : 0} socketClient={socketClient} settings={settings} />
		</div>
	)
}

export default FactoryMain
