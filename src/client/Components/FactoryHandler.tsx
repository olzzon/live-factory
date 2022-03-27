import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { storeAddFactory, storeSetContainerState, storeUpdateFullStore } from '../../interface/redux/containerActions'
import { IFactory, TRANSCODER_TYPE } from '../../interface/GenericInterfaces'
import { RootState } from '../main'
import * as IO from '../../interface/SocketIOContants'

import NdiEncoder from './NdiEncoder'

import io from 'socket.io-client'
import NdiDecoder from './NdiDecoder'
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
				dispatch(storeUpdateFullStore(fullStore))
				console.log('Full store', fullStore)
			})
	}, [])

	const factoryList = (type: TRANSCODER_TYPE) => {
		return (
			<div className="factory-selector">
				{factories.map((factory: IFactory, index: number) => {
					if (factory.transcoderType === type) {
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
					}
				})}
				<button
					className="button"
					onClick={() => {
						setSelectedEncoder(factories.length)
						dispatch(storeAddFactory(type))
					}}
				>
					ADD PIPELINE
				</button>
			</div>
		)
	}

	return (
		<div className="factory-handler">
			{factoryList(TRANSCODER_TYPE.ENC)}

			{factories[selectedEncoder].transcoderType === TRANSCODER_TYPE.ENC ? (
				<NdiEncoder factoryId={selectedEncoder} socketClient={socketClient} />
			) : (
				<NdiDecoder factoryId={selectedEncoder} socketClient={socketClient} />
			)}
			{factoryList(TRANSCODER_TYPE.DEC)}
		</div>
	)
}

export default FactoryHandler
