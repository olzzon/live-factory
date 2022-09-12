import React, { useEffect } from 'react'
import { useStore, shallowEqual, useDispatch, useSelector } from 'react-redux'
import {
	storeAddFactory,
	storeDuplicateFactory,
	storePushLog,
	storeSetContainerState,
	storeUpdateDevicesList,
	storeUpdateFullStore,
} from '../../interface/redux/containerActions'
import { IDeviceList, IFactory } from '../../interface/GenericInterfaces'
import { RootState } from '../main'
import * as IO from '../../interface/SocketIOContants'
import { ISettings } from '../../interface/SettingsInterface'

interface IfactoryId {
	selectedEncoder: number
	socketClient: any
	setSelectedEncoder: any
	settings: ISettings
}

const FactoryHandler: React.FC<IfactoryId> = (props) => {
	const store = useStore()
	const dispatch = useDispatch()
	const factories = useSelector<RootState, IFactory[]>((state) => state.ffmpeg[0].factory, shallowEqual)
	const rerender = useSelector<RootState>((state) => state.ffmpeg[0].rerender)

	useEffect(() => {
		props.socketClient
			.on(IO.UPDATE_ENCODER_STATE, (index: number, activated: boolean, running: boolean) => {
				console.log('Index ', index, 'Activated :', activated, 'Running :', running)
				dispatch(storeSetContainerState(index, activated, running))
			})
			.on(IO.FULL_STORE, (fullStore: IFactory[]) => {
				if (fullStore.length > 0) {
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

	const calculateNumberOfActiveEncoders = () => {
		let activeEncoders = 0
		factories.forEach((factory) => {
			if (factory.activated) {
				activeEncoders++
			}
		})
		return activeEncoders
	}
	
	const addFactory = () => {
		dispatch(storeAddFactory())
		props.setSelectedEncoder(factories.length)
		props.socketClient.emit(IO.UPDATE_FACTORY, factories.length, factories[factories.length])
	}

	const duplicateFactory = () => {
		dispatch(storeDuplicateFactory(props.selectedEncoder))
		props.setSelectedEncoder(factories.length)
		let state = store.getState()
		props.socketClient.emit(IO.UPDATE_FACTORY, factories.length, state.ffmpeg[0].factory[factories.length])
	}

	const handleDeleteEncoder = () => {
		if (window.confirm('Are you sure you want to delete the selected encoder ?')) {
			console.log('Delete encoder index :', props.selectedEncoder)
			props.socketClient.emit(IO.DELETE_FACTORY, props.selectedEncoder)
		}
	}

	const handleStartEncoder = () => {
		if (calculateNumberOfActiveEncoders() < props.settings.maxActiveEncoders) {
			console.log('starting encoder index :', props.selectedEncoder)
			props.socketClient.emit(IO.START_ENCODER, props.selectedEncoder, factories[props.selectedEncoder])
		} else {
			alert('You have reached the maximum number of active encoders')
		}
	}

	const handleStopEncoder = () => {
		if (window.confirm('Are you sure you want to stop the selected encoder ?')) {
			console.log('stopping encoder index :', props.selectedEncoder)
			props.socketClient.emit(IO.UPDATE_FACTORY, props.selectedEncoder, factories[props.selectedEncoder])
			props.socketClient.emit(IO.STOP_ENCODER, props.selectedEncoder)
		}
	}

	return (
		<div className="factory-selector">
			<span className="header">TRANSCODERS :</span>
			{factories.map((factory: IFactory, index: number) => {
				return (
					<div>
						<button
							className="selector-button"
							style={
								props.selectedEncoder === index
									? { backgroundColor: 'rgb(81, 81, 81)', borderColor: 'rgb(230, 230, 230)', color: 'white' }
									: undefined
							}
							key={index}
							onClick={() => {
								props.setSelectedEncoder(index)
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
			<hr className="factory-horizontal" />
			<button
				className="button"
				onClick={() => {
					addFactory()
				}}
			>
				NEW PIPELINE
			</button>
			<button
				className="button"
				onClick={() => {
					duplicateFactory()
				}}
			>
				DUPLICATE
			</button>
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
	)
}

export default FactoryHandler
