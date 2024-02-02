import LoginPage from './Login/login-page'
import RegisterPage from './Register/register-page'
import classes from './aunth.module.css'
import './Aunth.css'
import { Context } from '../../index'
import { IUser } from '@type/Model/user-model'
import { Navigate } from 'react-router-dom'

import { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { ILoginData } from '@type/Model/aunth-model'
const AunthPage = () => {
	const { store } = useContext(Context)
	const loginCallback = async (data: ILoginData) => {
		const response = await store.Login(data)
		if (response as IUser) {
			console.log(store.user?.email)
		}
	}
	useEffect(() => {
		store.CheckAunth()
		// eslint-disable-next-line
	}, [])

	if (store.isAunth) {
		return <Navigate to='/menu' />
	}
	if (store.isLoading)
		return (
			<>
				<p>ЗАГРУЗКА</p>
			</>
		)
	return (
		<div className='Aunth'>
			<header className='Aunth-header'>
				<div className={classes.main}>
					<input type='checkbox' id='chk' aria-hidden='true' />

					<RegisterPage Registration={store.Registration} />

					<LoginPage Login={loginCallback} />
				</div>
			</header>
		</div>
	)
}

export default observer(AunthPage)
