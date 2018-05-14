import bodyParser from 'body-parser'
import morgan from 'morgan'

export default app => {
	app.use(bodyParser.json({ limit: '50mb' }))
	app.use(
		bodyParser.urlencoded({
			limit: '50mb',
			extended: true,
			parameterLimit: 50000
		})
	)
	app.use(morgan('dev'))
}
