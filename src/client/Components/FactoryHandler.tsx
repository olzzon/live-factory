import React, { useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { storeAddFactory } from '../../interface/redux/containerActions'
import { IFactory } from '../../interface/redux/containersReducer'
import { RootState } from '../main'
import NdiEncoder from './NdiEncoder'

const urlParams = new URLSearchParams(window.location.search)
const viewId: string | null = urlParams.get('view')

const FactoryHandler: React.FC = () => {
	const dispatch = useDispatch()
	const factories = useSelector<RootState, IFactory[]>((state) => state.ffmpeg[0].factory, shallowEqual)
	const [selectedEncoder, setSelectedEncoder] = useState(0)

	return (
		<div className="factory-handler">
			<div className="factory-selector">
				{factories.map((factory: IFactory, index: number) => (
					<button
						className="button"
						key={index}
						onClick={() => {
							setSelectedEncoder(index)
						}}
					>
						{factory.containerName}
					</button>
				))}
				<button
					className="button"
					onClick={() => {
						dispatch(storeAddFactory())
					}}
				>
					ADD FACTORY
				</button>
			</div>
			<NdiEncoder factoryId={selectedEncoder} />
		</div>
	)
}

export default FactoryHandler
