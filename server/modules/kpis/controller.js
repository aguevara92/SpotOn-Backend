import KPI from './model';
import { Ad } from '../ads';

export const getKPIs = async (req, res) => {
    try {
        return res.status(200).json({
            KPIs: await KPI.find({}),
        });
    } catch (e) {
        return res.status(e.status).json({
            error: true,
            message: 'Error with Ads',
        });
    }
};

export const getKPIsOfCountry = async (req, res) => {
    const { countryName } = req.params;
    try {
        // Get Ads of Single Country
        let ads = await Ad.find({ country: countryName });
        ads = ads.map(a => a.adname);

        // Get All KPIs
        const allKPIs = await KPI.find({});

        // Get Kpis of single country
        let countryKPIs = ads.map(a => {
            const rr = allKPIs.filter(k => {
                return k.adID === a;
            });
            return rr;
        });
        countryKPIs = [].concat(...countryKPIs); // Flaten array

        return res.status(200).json({
            country: countryName,
            KPIs: countryKPIs,
        });
    } catch (e) {
        return res.status(e.status).json({
            error: true,
            message: 'Error with Ads',
        });
    }
};

export const createKPI = async (req, res) => {
    // Get the Vars from the POST body
    const {
        adID,
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
        total,
    } = req.body;

    // Create an instance of the Ad class
    const newKPI = new KPI({
        adID,
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
        total });

    newKPI.save((err, thisKPI) => {
        if (err) {
            // If there is an error, show it
            res.status(500).send(err);
        }
        // If there are no errors, show in the console the Ad created
        res.status(201).send(thisKPI);
    });
};
