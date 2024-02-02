import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import Store from '@store/Store'
import { BrowserRouter } from 'react-router-dom'

const store = new Store()
interface IStore {
	store: Store
}
export const Context = createContext<IStore>({ store })
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<BrowserRouter>
		<Context.Provider value={{ store }}>
			<App />
		</Context.Provider>
	</BrowserRouter>
)
