import ReactDOM from 'react-dom'
import React from 'react'
import NdiDecoder from './Components/NdiDecoder'
import NdiEncoder from './Components/NdiEncoder'

import { store, state } from '../interface/redux/store'
import { Provider } from 'react-redux'
export type RootState = ReturnType<typeof store.getState>

console.log('Store:', store)
console.log('State:', state)

const urlParams = new URLSearchParams(window.location.search)
const viewId: string | null = urlParams.get('view')

ReactDOM.render(
    <Provider store={store}>
		<div className="header">
			LIVE FACTORY
			<hr />
		</div>
		{viewId === 'ndidecoder' ? <NdiDecoder /> : null }
		{viewId === 'ndiencoder' ? <NdiEncoder /> : null }
        {viewId === null ? <div>ADD /?view='transcoder', 'ndiencoder' or 'ndidecoder' </div> : null }
	</Provider>,
	document.getElementById('app-root')
)
