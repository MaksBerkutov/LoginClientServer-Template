import ApiError from '@exeptions/api-error'
import tokenService from '@service/token-service'
import { Response, NextFunction } from 'express'
import { AuthenticatedRequest, IUserShema } from '@type/types'
import UserDto from '@dtos/user-dto'

export default function (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
) {
	try {
		const authorizationHeader = req.headers.authorization
		if (!authorizationHeader) {
			return next(ApiError.UnauthorizedError())
		}
		const token = authorizationHeader.split(' ')[1]
		if (!token) {
			return next(ApiError.UnauthorizedError())
		}
		const userData: UserDto = tokenService.ValidateAccessToken(token)
		if (!userData) {
			return next(ApiError.UnauthorizedError())
		}
		if (userData.isActivated) {
			return next(ApiError.EmailNotVerifiedError())
		}
		req.user = userData
		next()
	} catch (error) {
		return next(ApiError.UnauthorizedError())
	}
}
