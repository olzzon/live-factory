import React from 'react'

import '../styles/app.css'

import { useSelector } from 'react-redux'
import { RootState } from '../main'

export interface PipelineIdProps {
	pipelineId: number
}

const LogOutput: React.FC<PipelineIdProps> = (props) => {
	const id = props.pipelineId

	const logs = useSelector<RootState, string[]>((state) => state.ffmpeg[0].pipeline[id].log)

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
