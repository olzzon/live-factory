import ReactDOM from 'react-dom'
import React from 'react'

import { store } from '../interface/redux/store'
import { Provider } from 'react-redux'
import FactoryHandler from './Components/FactoryHandler'
export type RootState = ReturnType<typeof store.getState>

ReactDOM.render(
    <Provider store={store}>
		<div className="header">
			<hr />
			LIVE FACTORY
			<hr />
		</div>
		<FactoryHandler/>
	</Provider>,
	document.getElementById('app-root')
)
