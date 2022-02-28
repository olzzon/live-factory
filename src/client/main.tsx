import ReactDOM from 'react-dom'
import React from 'react'
import Transcoder from './Components/Transcoder'
import NdiDecoder from './Components/NdiDecoder'
import NdiEncoder from './Components/NdiEncoder'

const urlParams = new URLSearchParams(window.location.search)
const viewId: string | null = urlParams.get('view')

ReactDOM.render(
	<div>
		<div className="header">
			LIVE FACTORY
			<hr />
		</div>
		{viewId === 'transcoder' ? <Transcoder /> : null }
		{viewId === 'ndidecoder' ? <NdiDecoder /> : null }
		{viewId === 'ndiencoder' ? <NdiEncoder /> : null }
        {viewId === null ? <div>ADD /?view='transcoder', 'ndiencoder' or 'ndidecoder' </div> : null }
	</div>,
	document.getElementById('app-root')
)
