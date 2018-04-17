import { Router } from 'express'
import * as KPIsController from './controller'

const routes = new Router()
// routes.get('/kpi/:adId', KPIsController.getSingleAd);
routes.get('/kpi', KPIsController.getKPIs)
routes.get('/kpi/country/:countryName', KPIsController.getKPIsOfCountry)
routes.post('/kpi/new', KPIsController.createKPI)

export default routes
