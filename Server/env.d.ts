declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DB_CONN_STR: string
			PORT: number
			SMTP_PORT: number
			JWT_REFRESH_SECRET: string
			JWT_ACCESS_SECRET: string
			SMTP_HOST: string
			SMPT_USER: string
			SMPT_PASSWORLD: string
			API_URL: string
			CLIENT_URL: string
		}
	}
}


export {}
