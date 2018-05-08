import { Router } from 'express'
import * as UsersController from './controller'

const routes = new Router()

// The word ADS is blocked by the ad-block
routes.get('/user', UsersController.getUsers)
routes.get('/user/:userID', UsersController.getSingleUser)
routes.post('/user/new', UsersController.createUser)
routes.post('/user/favourites', UsersController.updateFavorites)
routes.get('/user/notFirstTime/:userID', UsersController.updateProfileFirstTime)

export default routes
