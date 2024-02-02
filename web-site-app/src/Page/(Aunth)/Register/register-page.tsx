import { IRegisterData, IResponseError } from '@type/Model/aunth-model'
import { useInput } from '@hook/useInput'
interface RegisterProps {
	Registration: (data: IRegisterData) => Promise<void | IResponseError>
}
const RegisterPage = ({ Registration }: RegisterProps) => {
	const { data, changeText } = useInput<IRegisterData>({
		Login: '',
		Password: '',
		Email: '',
	})

	const onClickedRegister = async () => {
		const response = await Registration(data)
		console.log(response)
	}
	return (
		<div className='signup'>
			<label htmlFor='chk' aria-hidden='true'>
				Создать
			</label>
			<input
				type='text'
				name='Login'
				placeholder='Логин'
				value={data.Login}
				onChange={changeText}
			/>
			<input
				type='email'
				name='Email'
				value={data.Email}
				placeholder='Емаил'
				onChange={changeText}
			/>
			<input
				type='password'
				name='Password'
				value={data.Password}
				placeholder='Пароль'
				onChange={changeText}
			/>
			<button onClick={onClickedRegister}>Создать</button>
		</div>
	)
}

export default RegisterPage
