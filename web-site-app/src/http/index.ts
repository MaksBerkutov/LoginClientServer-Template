import { IResponse } from '@type/Model/aunth-model'
import axios from 'axios'
export const API_URL = 'http://localhost:3005/api'
const $api = axios.create({
	withCredentials: true,
	baseURL: API_URL,
})
$api.interceptors.request.use(config => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
	return config
})
$api.interceptors.response.use(
	config => {
		return config
	},
	async (error: any) => {
		try {
			if (axios.isAxiosError(error)) {
				if (error.status == 401) {
					const original = error.config
					const { data } = await axios.get<IResponse>(`${API_URL}/refresh`, {
						withCredentials: true,
					})
					localStorage.setItem('token', data.tokens.accessToken)
					localStorage.setItem('user', JSON.stringify(data.user))
					return original && $api.request(original)
				}
			}
		} catch (e) {
			console.error(e)
			window.location.href = 'http://localhost:3000/login'
		}
	}
)
export default $api
