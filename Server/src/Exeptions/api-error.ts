export default class ApiError extends Error {
	public status: number

	public errors: Array<string>
	constructor(status: number, message: string, errors: Array<string> = []) {
		super(message)
		this.status = status
		this.errors = errors
		Object.setPrototypeOf(this, ApiError.prototype)
	}
	public static UnauthorizedError(): ApiError {
		return new ApiError(401, 'Пользователь не авторизован')
	}
	static AccessError() {
		return new ApiError(403, 'Недостаточно прав для выполнения операции')
	}
	static EmailNotVerifiedError() {
		return new ApiError(
			403,
			'Пользователь не подтвердил адрес электронной почты'
		)
	}
	public static BadRequest(
		message: string,
		errors: Array<string> = []
	): ApiError {
		return new ApiError(400, message, errors)
	}
}
