import { Schema, model } from 'mongoose'
import { ITokenShema } from 'src/Types/types'
const TokenSchema = new Schema<ITokenShema>({
	user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	ip: { type: String, required: true },
	refreshToken: { type: String, required: true },
})

export default model('Token', TokenSchema)
