import Menu from '@component/Menu/Menu'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { MenuItems as Items, IndexLogo } from 'src/Config/menu-config'
import './main.css'
const Main = () => {
	return (
		<div className=''>
			<div>
				<Menu {...{ Items, IndexLogo }} />
			</div>

			<div id='main' className='flexbox-col'>
				<Outlet />
			</div>
		</div>
	)
}

export default Main
