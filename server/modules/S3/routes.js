import { Router } from 'express'
import * as S3Controller from './controller'

const routes = new Router()
routes.get('/getCPA/:adID', S3Controller.getObject)

export default routes
