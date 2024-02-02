import { useInput } from '@hook/useInput'
import { ILoginData } from '@type/Model/aunth-model'
interface LoginProps {
	Login: (data: ILoginData) => Promise<void>
}
const LoginPage = ({ Login }: LoginProps) => {
	const { data, changeText } = useInput<ILoginData>({
		Login: '',
		Password: '',
	})
	const onClickLogin = async () => {
		await Login(data)
	}
	return (
		<div className='login'>
			<label htmlFor='chk' aria-hidden='true'>
				Войти
			</label>
			<input
				type='text'
				name='Login'
				placeholder='Логин'
				onChange={changeText}
				value={data.Login}
			/>
			<input
				type='password'
				name='Password'
				placeholder='Пароль'
				value={data.Password}
				onChange={changeText}
			/>
			<button onClick={onClickLogin}>Войти</button>
		</div>
	)
}

export default LoginPage
