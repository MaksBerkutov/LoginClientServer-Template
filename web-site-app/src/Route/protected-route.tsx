import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { Context } from '../index'
import { observer } from 'mobx-react-lite'
interface ProtectedRouteProps {
	redirectPath: string
	children: JSX.Element
}
const ProtectedRoute = ({
	redirectPath = '/login',
	children,
}: ProtectedRouteProps) => {
	const { store } = useContext(Context)

	if (!store.GetAunthStatus()) {
		return <Navigate to={redirectPath} replace />
	}

	return children
}

export default observer(ProtectedRoute)
