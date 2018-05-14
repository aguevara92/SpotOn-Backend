import KPI from './model'
import { Ad } from '../ads'

export const getKPIs = async (req, res) => {
	try {
		return res.status(200).json({
			KPIs: await Ad.find(
				{ kpis: { $nin: [{}, null, undefined] } },
				{ kpis: 1, _id: 0 }
			)
		})
	} catch (e) {
		return res.status(e.status).json({
			error: true,
			message: 'Error with Ads'
		})
	}
}

export const getKPIsOfCountry = async (req, res) => {
	const { countryName } = req.params

	try {
		return res.status(200).json({
			KPIs: await Ad.find(
				{ country: countryName, kpis: { $nin: [{}, null, undefined] } },
				{ kpis: 1, _id: 0 }
			),
			country: countryName
		})
	} catch (e) {
		return res.status(e.status).json({
			error: true,
			message: 'Error with Ads'
		})
	}
}

export const createKPI = async (req, res) => {
	// Get the Vars from the POST body
	const {
		adname,
		brandRecall,
		adAppeal,
		toneOfVoice,
		emotion,
		uniqueness,
		relevance,
		shareability,
		callToAction,
		messaging,
		brandFit,
		brandRelevance,
		viewerEngagement,
		adMessage,
		total
	} = req.body

	Ad.findOneAndUpdate(
		{ adname: adname },
		{
			$set: {
				kpis: {
					brandRecall,
					adAppeal,
					toneOfVoice,
					emotion,
					uniqueness,
					relevance,
					shareability,
					callToAction,
					messaging,
					brandFit,
					brandRelevance,
					viewerEngagement,
					adMessage,
					total
				}
			}
		},
		{ new: true },
		(err, singleAd) => {
			if (err) return res.status(400)
			res.send(singleAd)
		}
	)
}
