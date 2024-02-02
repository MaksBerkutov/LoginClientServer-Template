import { ObjectId } from 'mongoose'
import { Request } from 'express'
import UserDto from 'src/DTOS/user-dto'

interface IToken {
	accessToken: string
	refreshToken: string
}
interface IUserShema {
	_id: ObjectId
	email: string
	login: string
	passworld: string
	isActiveted: Boolean
	isAdmin: Boolean
	activationLink: string
}
interface ITokenShema {
	_id: ObjectId
	user: ObjectId
	ip: string
	refreshToken: string
}
interface IUserData {
	tokens: IToken
	user: UserDto
}
interface AuthenticatedRequest extends Request {
	user: UserDto
}

export type { IToken, IUserShema, ITokenShema, AuthenticatedRequest, IUserData }
