import React, { useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { IFactory } from '../../interface/GenericInterfaces'
import { RootState } from '../main'

import io from 'socket.io-client'
import * as IO from '../../interface/SocketIOContants'
import { ISettings } from '../../interface/SettingsInterface'
import Transcoder from './Transcoder'
import FactoryHandler from './FactoryHandler'
const socketClient = io()

const FactoryMain: React.FC = () => {
	const dispatch = useDispatch()
	const [selectedEncoder, setSelectedEncoder] = useState(0)
	const [settings, setSettings] = useState<ISettings>({
		maxActiveEncoders: 1,
		nodeList: [],
		allowedInputTypes: [],
		allowedOutputTypes: [],
		allowedOutputEncoderTypes: [],
	})
	const factories = useSelector<RootState, IFactory[]>((state) => state.ffmpeg[0].factory, shallowEqual)

	socketClient.on(IO.SETTINGS, (settings: ISettings) => {
		console.log('settings received :', settings)
		
		setSettings(settings)
	})

	return (
		<div className="factory-handler">
			<FactoryHandler
				selectedEncoder={selectedEncoder < factories.length ? selectedEncoder : 0}
				socketClient={socketClient}
				setSelectedEncoder={setSelectedEncoder}
				settings={settings}
			/>
			<Transcoder factoryId={selectedEncoder < factories.length ? selectedEncoder : 0} socketClient={socketClient} settings={settings} />
		</div>
	)
}

export default FactoryMain
