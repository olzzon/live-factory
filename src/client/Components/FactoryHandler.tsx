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
		
	return (
		<React.Fragment>
			<div>
				{factories.map((factory: IFactory, index: number) => (
					<div key={index}>
						Factory Name : {factory.containerName}
						<NdiEncoder factoryId={index} />
					</div>
				))}
			</div>
			<button
				onClick={() => {
					dispatch(storeAddFactory())
				}}
			>
				ADD FACTORY
			</button>
		</React.Fragment>
	)
}

export default FactoryHandler
