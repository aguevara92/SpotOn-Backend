import express from 'express'
import dbConfig from './config/db'
import middlewareConfig from './config/middleware'
import {
	AdsRoutes,
	ResultRoutes,
	KPIsRoutes,
	UsersRoutes,
	EmailRoutes,
	S3Routes
} from './modules'

const app = express()
const cors = require('cors')

/* Database */
dbConfig()

/* Middleware */
middlewareConfig(app)

// Solve the CORS error
// include before other routes
app.options('*', cors())
app.use(cors())

app.use('/api', [
	AdsRoutes,
	ResultRoutes,
	KPIsRoutes,
	UsersRoutes,
	EmailRoutes,
	S3Routes
])

// const PORT = process.env.MONGODB_PORT || 4000;
const PORT = process.env.PORT || 4000
console.log(`the port is ${PORT}`)

app.listen(PORT, err => {
	if (err) {
		console.log(err)
	} else {
		console.log(`App listen to port: ${PORT}`)
	}
})
