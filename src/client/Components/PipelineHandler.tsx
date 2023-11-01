import React, { useEffect } from 'react'
import { useStore, shallowEqual, useDispatch, useSelector } from 'react-redux'
import {
	storeAddPipeline,
	storeDuplicatePipeline,
	storePushLog,
	storeSetContainerState,
	storeSetGpuType,
	storeUpdateDevicesList,
	storeUpdateFullStore,
} from '../../interface/redux/containerActions'
import { DeviceList, Pipeline } from '../../interface/GenericInterfaces'
import { RootState } from '../main'
import * as IO from '../../interface/SocketIOContants'
import { Settings } from '../../interface/SettingsInterface'

interface PipelineProps {
	selectedPipeline: number
	socketClient: any
	setSelectedPipeline: any
	settings: Settings
}

const PipelineHandler: React.FC<PipelineProps> = (props) => {
	const store = useStore()
	const dispatch = useDispatch()
	const pipelines = useSelector<RootState, Pipeline[]>((state) => state.ffmpeg[0].pipeline, shallowEqual)
	const rerender = useSelector<RootState>((state) => state.ffmpeg[0].rerender)

	useEffect(() => {
		props.socketClient
			.on(IO.UPDATE_ENCODER_STATE, (index: number, activated: boolean, running: boolean) => {
				console.log('Index ', index, 'Activated :', activated, 'Running :', running)
				dispatch(storeSetContainerState(index, activated, running))
			})
			.on(IO.FULL_STORE, (fullStore: Pipeline[]) => {
				if (fullStore.length > 0) {
					dispatch(storeUpdateFullStore(fullStore))
					console.log('Full store', fullStore)
				}
			})
			.on(IO.DEVICES_LIST, (devices: DeviceList[]) => {
				dispatch(storeUpdateDevicesList(devices))
			})
			.on(IO.LOG_PUSH, (pipelineIndex: number, logLine: string) => {
				dispatch(storePushLog(pipelineIndex, logLine))
			})
	}, [])

	const calculateNumberOfActiveEncoders = () => {
		let activeEncoders = 0
		pipelines.forEach((pipeline) => {
			if (pipeline.activated) {
				activeEncoders++
			}
		})
		return activeEncoders
	}
	
	const addFactory = () => {
		dispatch(storeAddPipeline())
		dispatch(storeSetGpuType(pipelines.length, props.settings.nodeList[0].hwaccel))
		props.setSelectedPipeline(pipelines.length)
		props.socketClient.emit(IO.UPDATE_PIPELINE, pipelines.length, pipelines[pipelines.length])
	}

	const duplicateFactory = () => {
		dispatch(storeDuplicatePipeline(props.selectedPipeline))
		props.setSelectedPipeline(pipelines.length)
		let state = store.getState()
		props.socketClient.emit(IO.UPDATE_PIPELINE, pipelines.length, state.ffmpeg[0].pipeline[pipelines.length])
	}

	const handleDeleteEncoder = () => {
		if (window.confirm('Are you sure you want to delete the selected encoder ?')) {
			console.log('Delete encoder index :', props.selectedPipeline)
			props.socketClient.emit(IO.DELETE_PIPELINE, props.selectedPipeline)
		}
	}

	const handleStartEncoder = () => {
		if (calculateNumberOfActiveEncoders() < props.settings.maxActiveEncoders) {
			console.log('starting encoder index :', props.selectedPipeline)
			props.socketClient.emit(IO.START_ENCODER, props.selectedPipeline, pipelines[props.selectedPipeline])
		} else {
			alert('You have reached the maximum number of active encoders')
		}
	}

	const handleStopEncoder = () => {
		if (window.confirm('Are you sure you want to stop the selected encoder ?')) {
			console.log('stopping encoder index :', props.selectedPipeline)
			props.socketClient.emit(IO.UPDATE_PIPELINE, props.selectedPipeline, pipelines[props.selectedPipeline])
			props.socketClient.emit(IO.STOP_ENCODER, props.selectedPipeline)
		}
	}

	return (
		<div className="factory-selector">
			<span className="header">TRANSCODERS :</span>
			{pipelines.map((pipeline: Pipeline, index: number) => {
				return (
					<div>
						<button
							className="selector-button"
							style={
								props.selectedPipeline === index
									? { backgroundColor: 'rgb(81, 81, 81)', borderColor: 'rgb(230, 230, 230)', color: 'white' }
									: undefined
							}
							key={index}
							onClick={() => {
								props.setSelectedPipeline(index)
							}}
						>
							{pipeline.containerName}
						</button>
						<span style={pipeline.activated && !pipeline.running ? { color: 'red' } : { color: 'rgb(101, 41, 41)' }}>
							⬤
						</span>
						<span style={pipeline.running ? { color: 'green' } : { color: 'rgb(31, 61, 31)' }}>⬤</span>
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

export default PipelineHandler
