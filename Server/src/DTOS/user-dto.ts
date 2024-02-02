import { IUserShema } from 'src/Types/types'
import { ObjectId } from 'mongoose'

export default class UserDto {
	public email: string
	public id: ObjectId
	public isActivated: Boolean
	public isAdmin: Boolean
	constructor(model: IUserShema) {
		this.email = model.email
		this.id = model._id
		this.isActivated = model.isActiveted
		this.isAdmin = model.isAdmin
	}
}
