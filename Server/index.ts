require('dotenv').config()

import express from 'express'
import api from 'src/API/API'
import bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import errorMiddleware from '@middlware/error-middleware'
const app = express()
const port = process.env.PORT || 3005
app.use(bodyParser.json())
app.use(
	cors({
		credentials: true,
		origin: process.env.CLIENT_URL,
	})
)
app.use(cookieParser())
//app.use('public')
app.use('/api', api)
app.use(errorMiddleware)

app.get('/', (req, res) => {
	res.status(200).json({ message: 'JSON response' })
})

const start = async () => {
	try {
		await mongoose.connect(process.env.DB_CONN_STR as string, {
			serverApi: { version: '1', strict: true, deprecationErrors: true },
		})
		app.listen(port, () => {
			console.log(`Server is running at http://localhost:${port}`)
		})
	} catch (e) {
		console.error(e)
	}
}
start()
