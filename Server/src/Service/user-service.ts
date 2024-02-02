require('dotenv').config()

import userModel from 'src/Model/user-model'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import EmailService from './email-service'
import tokenService from './token-service'
import UserDto from 'src/DTOS/user-dto'
import ApiError from 'src/Exeptions/api-error'
import { IUserShema, IUserData } from 'src/Types/types'

class UserService {
	private async GenerateAndSaveTokens(
		user: IUserShema,
		ip: string
	): Promise<IUserData> {
		const userDto = new UserDto(user)

		const tokens = await tokenService.GenerateToken({ ...userDto })
		await tokenService.SaveToken(userDto.id, tokens.refreshToken, ip)
		return {
			tokens: tokens,
			user: userDto,
		}
	}
	public async Register(
		email: string,
		login: string,
		password: string,
		ip: string
	): Promise<IUserData> {
		const candidate = await userModel.findOne({ login })
		if (candidate)
			throw ApiError.BadRequest(
				'Пользователь с таким логином уже зарегистрирован'
			)
		const hashPassword = await bcrypt.hash(password, 3)
		const activationLink = uuidv4()
		const user: IUserShema = await userModel.create({
			login,
			email,
			passworld: hashPassword,
			activationLink,
		})
		await EmailService.SendActivationMail(
			email,
			`${process.env.API_URL}/api/activated/${activationLink}`
		)
		return await this.GenerateAndSaveTokens(user, ip)
	}
	async Activated(activationLink: string) {
		const user = await userModel.findOne({ activationLink })
		if (!user) throw ApiError.BadRequest('Неккоректная сылка')
		if (user.isActiveted) throw ApiError.BadRequest('Аккаунт уже активирован')
		user.isActiveted = true
		await user.save()
	}
	async Login(login: string, password: string, ip: string): Promise<IUserData> {
		const user = await userModel.findOne({ login })
		if (!user)
			throw ApiError.BadRequest('Пользователь с таким логином не найден')
		const isPassEquals = await bcrypt.compare(password, user.passworld)
		if (!isPassEquals) {
			throw ApiError.BadRequest('Неверный пароль')
		}
		if (!user.isActiveted) throw ApiError.BadRequest('Аккаунт не активирован')
		return await this.GenerateAndSaveTokens(user, ip)
	}

	public async Logout(RefreshToken: string) {
		return await tokenService.RemoveToken(RefreshToken)
	}
	public async Refresh(RefreshToken: string, ip: string): Promise<IUserData> {
		if (!RefreshToken) throw ApiError.UnauthorizedError()
		const userData = tokenService.ValidateRefreshToken(RefreshToken)
		const tokenDb = await tokenService.FindToken(RefreshToken)
		if (!userData || !tokenDb) {
			throw ApiError.UnauthorizedError()
		}
		const user: IUserShema = await userModel.findById(userData.id)
		return await this.GenerateAndSaveTokens(user, ip)
	}
}
export default new UserService()
