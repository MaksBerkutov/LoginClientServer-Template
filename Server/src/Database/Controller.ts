import mysql from 'mysql2'
import mysqlpromise from 'mysql2/promise'

export default class MainController {
	private options: mysql.ConnectionOptions
	private pool: mysqlpromise.Pool
	constructor(
		host: string,
		user: string,
		passw: string,
		database: string,
		port: number = 3306,
		limit = 15
	) {
		this.options = {
			host: host,
			user: user,
			password: passw,
			database: database,
			port: port,
			queueLimit: limit,
		}
		this.pool = mysqlpromise.createPool(this.options)
	}
	GetConnections(): mysql.Connection {
		return mysql.createConnection(this.options)
	}
	async Handler<T>(
		callback: (connection: mysqlpromise.PoolConnection) => Promise<T>
	) {
		try {
			const connection = await this.pool.getConnection()
			const result = await callback(connection)
			connection.release()
			return result
		} catch (error) {
			console.log(error)
		}
	}
}
