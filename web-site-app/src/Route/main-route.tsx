import AunthPage from '@page/(Aunth)/aunth-page'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './protected-route'
import Main from '@page/(Main)/Main'

const MainRoute = () => {
	return (
		<Routes>
			<Route path='/login' element={<AunthPage />} />
			<Route
				path='/menu'
				element={
					<ProtectedRoute redirectPath='/login'>
						<Main />
					</ProtectedRoute>
				}
			></Route>

			<Route path='*' element={<h2>Ресурс не найден</h2>} />
		</Routes>
	)
}

export default MainRoute
