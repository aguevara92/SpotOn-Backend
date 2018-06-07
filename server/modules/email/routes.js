import { Router } from 'express'
import * as EmailController from './controller'

const routes = new Router()
routes.get('/email/:emailAddress', EmailController.sendEmail)
routes.get('/sendBrazeEmail', EmailController.brazeApiEmail)
routes.get('/braze/syncUsers', EmailController.syncUsersBraze)

export default routes
