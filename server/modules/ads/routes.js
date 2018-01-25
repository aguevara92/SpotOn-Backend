import { Router } from 'express';
import * as AdsController from './controller';

const routes = new Router();

routes.get('/ads', AdsController.getAds);
routes.get('/ads/:adId', AdsController.getSingleAd);
routes.post('/ads/new', AdsController.createAd);
routes.post('/ads/:adId/results/new', AdsController.createAdResults);
// routes.get('/ads/:adId/results', AdsController.getAdResults);

export default routes;
