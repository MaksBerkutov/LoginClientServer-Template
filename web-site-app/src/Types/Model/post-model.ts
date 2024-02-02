type IPost = {
	title: string
	description: string
	id: string
	star: number
	tags: string[]
	published: Date

	comment: number
	authorName: string
}
type IPostResponse = {
	count: number
	limit: number
	page: number
	isLast: boolean
	data: Array<IPost>
}
export type { IPost, IPostResponse }
