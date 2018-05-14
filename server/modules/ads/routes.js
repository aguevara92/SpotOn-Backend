import { Router } from 'express'
import * as AdsController from './controller'

const routes = new Router()

// The word ADS is blocked by the ad-block
routes.get('/spot', AdsController.getAds)
routes.get('/spot/country/:countryName', AdsController.getCountryAds)
routes.get('/spot/:adId', AdsController.getSingleAd)
routes.post('/spot/new', AdsController.createAd)
routes.post('/spot/update', AdsController.updateAd)
routes.post('/spot/remove', AdsController.removeAd)

routes.post('/spot/addExtraInfo/:adId', AdsController.addExtraInfo)
// routes.get('/ads/:adId/results', AdsController.getAdResults);

export default routes
