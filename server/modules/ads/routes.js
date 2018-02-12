import { Router } from 'express';
import * as AdsController from './controller';

const routes = new Router();

// The word ADS is blocked by the ad-block
routes.get('/single', AdsController.getAds);
routes.get('/single/:adId', AdsController.getSingleAd);
routes.post('/single/new', AdsController.createAd);
routes.post('/single/update', AdsController.updateAd);
routes.post('/single/remove', AdsController.removeAd);
routes.post('/single/:adId/results/new', AdsController.createAdResults);
// routes.get('/ads/:adId/results', AdsController.getAdResults);

export default routes;
