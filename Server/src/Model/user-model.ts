import { Schema, model } from 'mongoose'
import { IUserShema } from 'src/Types/types'
const UserSchema = new Schema<IUserShema>({
	email: { type: String, required: true },
	login: { type: String, unique: true, required: true },
	passworld: { type: String, required: true },
	isActiveted: { type: Boolean, default: false },
	isAdmin: { type: Boolean, default: false },
	activationLink: { type: String },
})

export default model('User', UserSchema)
