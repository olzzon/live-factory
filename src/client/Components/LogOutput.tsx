import React from 'react'

import '../styles/app.css'

import { useSelector } from 'react-redux'
import { RootState } from '../main'

export interface IfactoryId {
	factoryId: number
}

const LogOutput: React.FC<IfactoryId> = (props) => {
	const id = props.factoryId

	const logs = useSelector<RootState, string[]>((state) => state.ffmpeg[0].factory[id].log)

	return (
		<div className='logoutput'>
			{logs?.map((logline: string, index: number) => {
					return (
						<div key={index}>
							{logline}
						</div>
					)
				})}
		</div>
	)
}

export default LogOutput
