import express from 'express'
import bodyParser from 'body-parser'
import { Router } from 'express'
import * as ResultController from './controller'

const routes = new Router()

routes.post(
	'/results/new',
	bodyParser.json({ limit: '50mb' }),
	ResultController.createResult
)
routes.get('/results', ResultController.getAllResults)
routes.get('/results/:adId', ResultController.getResultsOfAd)

export default routes
