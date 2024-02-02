require('dotenv').config()

import jsonwebtoken from 'jsonwebtoken'
import tokenModel from 'src/Model/token-model'
import { IToken } from 'src/Types/types'
import UserDto from 'src/DTOS/user-dto'
import { ObjectId } from 'mongoose'
class TokenService {
	async GenerateToken(payload: object): Promise<IToken> {
		const accessToken = jsonwebtoken.sign(
			payload,
			process.env.JWT_ACCESS_SECRET as string,
			{
				expiresIn: '30m',
			}
		)

		const refreshToken = jsonwebtoken.sign(
			payload,
			process.env.JWT_REFRESH_SECRET as string,
			{
				expiresIn: '30d',
			}
		)
		return { ...{ accessToken, refreshToken } }
	}
	async SaveToken(userId: ObjectId, refreshToken: string, ip: string) {
		const tokenData = await tokenModel.findOne({ user: userId, ip })
		if (tokenData) {
			tokenData.refreshToken = refreshToken
			return await tokenData.save()
		}
		return await tokenModel.create({ user: userId, ip, refreshToken })
	}
	async RemoveToken(refreshToken: string) {
		const tokenData = await tokenModel.deleteOne({ refreshToken })
		return tokenData
	}
	async FindToken(refreshToken: string) {
		const tokenData = await tokenModel.findOne({ refreshToken })
		return tokenData
	}

	ValidateAccessToken(token: string) {
		try {
			const userData = jsonwebtoken.verify(
				token,
				process.env.JWT_ACCESS_SECRET as string
			)

			return userData as UserDto
		} catch (error) {
			return null
		}
	}

	ValidateRefreshToken(token: string) {
		try {
			const userData = jsonwebtoken.verify(
				token,
				process.env.JWT_REFRESH_SECRET as string
			)
			return userData as UserDto
		} catch (error) {
			return null
		}
	}
}

export default new TokenService()
