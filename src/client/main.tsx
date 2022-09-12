import ReactDOM from 'react-dom'
import React from 'react'

import { store } from '../interface/redux/store'
import { Provider } from 'react-redux'
//@ts-ignore
import logo from './assets/logo_black.png'
import FactoryMain from './Components/FactoryMain'

export type RootState = ReturnType<typeof store.getState>

ReactDOM.render(
	<Provider store={store}>
		<div className="header">
			<hr />
			<img className={'logo'} src={logo} width="110" height="45" />
			LIVE FACTORY
			<hr />
		</div>
		<FactoryMain />
	</Provider>,
	document.getElementById('app-root')
)
