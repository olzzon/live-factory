import React, { useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { IFactory } from '../../interface/GenericInterfaces'
import { RootState } from '../main'

import io from 'socket.io-client'
import Transcoder from './Transcoder'
import FactoryHandler from './FactoryHandler'
const socketClient = io()

const FactorySelector: React.FC = () => {
	const dispatch = useDispatch()
	const [selectedEncoder, setSelectedEncoder] = useState(0)
	const factories = useSelector<RootState, IFactory[]>((state) => state.ffmpeg[0].factory, shallowEqual)

	return (
		<div className="factory-handler">
			<FactoryHandler selectedEncoder={(selectedEncoder < factories.length ? selectedEncoder : 0)} socketClient={socketClient} setSelectedEncoder={setSelectedEncoder}/>
			<Transcoder factoryId={(selectedEncoder < factories.length ? selectedEncoder : 0)} socketClient={socketClient} />
		</div>
	)
}

export default FactorySelector
