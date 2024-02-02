import ApiError from 'src/Exeptions/api-error'
import tokenService from '@service/token-service'
import { Response, NextFunction } from 'express'
import { AuthenticatedRequest, IUserShema } from 'src/Types/types'
import UserDto from 'src/DTOS/user-dto'

export default function (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
) {
	try {
		const user = req.user
		if (!user) {
			return next(ApiError.UnauthorizedError())
		}
		if (!user.isAdmin) {
			return next(ApiError.AccessError())
		}
		next()
	} catch (error) {
		return next(ApiError.AccessError())
	}
}
