require('dotenv').config()

import { Request, Response, NextFunction } from 'express'
import userService from '@service/user-service'
import { validationResult } from 'express-validator'
import ApiError from 'src/Exeptions/api-error'
import { AuthenticatedRequest } from 'src/Types/types'
class UserController {
	async Registration(req: Request, res: Response, next: NextFunction) {
		try {
			console.log(req.body)
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return next(
					ApiError.BadRequest(
						'Ошибка при валидации',
						errors.array().map(obj => obj.msg)
					)
				)
			}
			const { Email, Password, Login } = req.body
			const IP: string = req.ip ? req.ip : 'none'
			const userData = await userService.Register(Email, Login, Password, IP)
			res.cookie('refreshToken', userData.tokens.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			})

			return res.json(userData)
		} catch (e) {
			next(e)
		}
	}
	async Login(req: Request, res: Response, next: NextFunction) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return next(
					ApiError.BadRequest(
						'Ошибка при валидации',
						errors.array().map(obj => obj.msg)
					)
				)
			}

			const { Password, Login } = req.body
			const IP: string = req.ip ? req.ip : 'none'

			const userData = await userService.Login(Login, Password, IP)
			res.cookie('refreshToken', userData.tokens.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			})

			res.json(userData)
		} catch (e) {
			next(e)
		}
	}
	async Logout(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshToken } = req.cookies
			const token = await userService.Logout(refreshToken)
			res.clearCookie('refreshToken')
			res.json(token)
		} catch (e) {
			next(e)
		}
	}
	async Activated(req: Request, res: Response, next: NextFunction) {
		try {
			const ActivationLink = req.params.link
			await userService.Activated(ActivationLink)
			return res.redirect(process.env.CLIENT_URL)
		} catch (e) {
			next(e)
		}
	}
	async Refresh(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshToken } = req.cookies
			const IP: string = req.ip ? req.ip : 'none'

			const userData = await userService.Refresh(refreshToken, IP)

			res.cookie('refreshToken', userData.tokens.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			})
		} catch (e) {
			next(e)
		}
	}
	
}
export default new UserController()
