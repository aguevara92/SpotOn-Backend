import { Router } from 'express'
import * as ResultController from './controller'

const routes = new Router()

routes.post('/results/new', ResultController.createResult)
routes.get('/results', ResultController.getAllResults)
routes.get('/results/:adId', ResultController.getResultsOfAd)

export default routes
