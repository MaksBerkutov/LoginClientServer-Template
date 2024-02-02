import { IUser } from './user-model'
type ILoginData = {
	Login: string
	Password: string
}
type IRegisterData = {
	Login: string
	Email: string
	Password: string
}
type IResponse = {
	user: IUser
	tokens: {
		accessToken: string
		refreshToken: string
	}
}
type IResponseError = {
	message: string
	errors: Array<string> | undefined
}
type Nullabel<T> = T | null

export type { ILoginData, IResponse, IRegisterData, IResponseError, Nullabel }
