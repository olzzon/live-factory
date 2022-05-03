import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { storeAddFactory, storePushLog, storeSetContainerState, storeUpdateDevicesList, storeUpdateFullStore } from '../../interface/redux/containerActions'
import { IDeviceList, IFactory } from '../../interface/GenericInterfaces'
import { RootState } from '../main'
import * as IO from '../../interface/SocketIOContants'

import io from 'socket.io-client'
import Transcoder from './Transcoder'
const socketClient = io()

const FactoryHandler: React.FC = () => {
	const dispatch = useDispatch()
	const factories = useSelector<RootState, IFactory[]>((state) => state.ffmpeg[0].factory, shallowEqual)
	const rerender = useSelector<RootState>((state) => state.ffmpeg[0].rerender)
	const [selectedEncoder, setSelectedEncoder] = useState(0)

	useEffect(() => {
		socketClient
			.on(IO.UPDATE_ENCODER_STATE, (index: number, activated: boolean, running: boolean) => {
				console.log('Index ', index, 'Activated :', activated, 'Running :', running)
				dispatch(storeSetContainerState(index, activated, running))
			})
			.on(IO.FULL_STORE, (fullStore: IFactory[]) => {
				if (fullStore.length > 0 ) {
					dispatch(storeUpdateFullStore(fullStore))
					console.log('Full store', fullStore)
				}
			})
			.on(IO.DEVICES_LIST, (devices: IDeviceList[]) => {
				dispatch(storeUpdateDevicesList(devices))
			})
			.on(IO.LOG_PUSH, (factoryIndex: number, logLine: string) => {
				dispatch(storePushLog(factoryIndex, logLine))
			})
	}, [])

	const addFactory = () => {
		dispatch(storeAddFactory())
		setSelectedEncoder(factories.length)
		socketClient.emit(IO.UPDATE_FACTORY, factories.length, factories[factories.length])
	}

	const factoryList = () => {
		return (
			<div className="factory-selector">
				<span className="header">TRANSCODERS :</span>
				{factories.map((factory: IFactory, index: number) => {
					return (
						<div>
							<button
								className="selector-button"
								style={
									selectedEncoder === index
										? { backgroundColor: 'rgb(81, 81, 81)', borderColor: 'rgb(230, 230, 230)', color: 'white' }
										: undefined
								}
								key={index}
								onClick={() => {
									setSelectedEncoder(index)
								}}
							>
								{factory.containerName}
							</button>
							<span style={factory.activated && !factory.running ? { color: 'red' } : { color: 'rgb(101, 41, 41)' }}>
								⬤
							</span>
							<span style={factory.running ? { color: 'green' } : { color: 'rgb(31, 61, 31)' }}>⬤</span>
						</div>
					)
				})}
				<button
					className="button"
					onClick={() => {
						addFactory()
					}}
				>
					ADD PIPELINE
				</button>
			</div>
		)
	}

	return (
		<div className="factory-handler">
			{factoryList()}
			<Transcoder factoryId={(selectedEncoder < factories.length ? selectedEncoder : 0)} socketClient={socketClient} />
		</div>
	)
}

export default FactoryHandler
