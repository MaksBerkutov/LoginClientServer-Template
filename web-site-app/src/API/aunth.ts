import {
	ILoginData,
	IRegisterData,
	IResponse,
} from '@type/Model/aunth-model'
import $api from '@http/index'

export async function LoginServer(LoginParams: ILoginData): Promise<IResponse> {
	const response = await $api.post<IResponse>(`/login`, {
		...LoginParams,
	})
	return response.data
}

export async function RegisterServer(
	RegisterParams: IRegisterData
): Promise<IResponse> {
	const response = await $api.post<IResponse>(`/registration`, {
		...RegisterParams,
	})
	return response.data as IResponse
}
export async function LogoutServer(): Promise<void> {
	await $api.get(`/logout`)
}
