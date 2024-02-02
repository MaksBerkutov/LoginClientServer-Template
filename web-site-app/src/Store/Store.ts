import { IUser } from '@type/Model/user-model'
import {
	ILoginData,
	IRegisterData,
	IResponseError,
} from '@type/Model/aunth-model'
import { LoginServer, LogoutServer, RegisterServer } from '@api/aunth'
import { isAxiosError } from 'axios'
import { makeAutoObservable } from 'mobx'
export default class Store {
	public user: IUser | null = null
	public isAunth: Boolean = false
	public isLoading: Boolean = true
	constructor() {
		makeAutoObservable(this)
	}
	private static CheckError(error: any): IResponseError {
		if (isAxiosError(error)) {
			if (error.response) {
				return error.response.data as IResponseError
			}
		}
		console.log(error)
		return {
			message: 'Сервер не отвечает',
			errors: [],
		}
	}
	private static async HandlerError<T>(
		callback: () => Promise<T>
	): Promise<T | IResponseError> {
		try {
			return await callback()
		} catch (error) {
			return Store.CheckError(error)
		}
	}
	public GetAunthStatus(): Boolean {
		return this.isAunth
	}
	public async Login(data: ILoginData) {
		return await Store.HandlerError(async () => {
			const responseData = await LoginServer(data)
			localStorage.setItem('token', responseData.tokens.accessToken)
			localStorage.setItem('user', JSON.stringify(responseData.user))
			this.isAunth = true
			this.user = responseData.user
			return this.user
		})
	}

	public async Registration(data: IRegisterData) {
		return await Store.HandlerError(async () => {
			const responseData = await RegisterServer(data)
			localStorage.setItem('token', responseData.tokens.accessToken)
			localStorage.setItem('user', JSON.stringify(responseData.user))
			this.isAunth = true
			this.user = responseData.user
		})
	}
	public async Logout() {
		return await Store.HandlerError(async () => {
			await LogoutServer()
			localStorage.removeItem('token')
			this.isAunth = false
			this.user = null
		})
	}
	public async Refresh() {
		this.isLoading = true
		this.isLoading = false
	}
	public async CheckAunth() {
		const token = localStorage.getItem('token')
		console.log(token)

		if (!token) return (this.isLoading = false)
		this.isAunth = true
		const user = localStorage.getItem('user')
		if (!user) return this.Refresh()
		this.user = JSON.parse(user)
		this.isLoading = false
	}
}
