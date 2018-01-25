import Ad from './model';
import { Result } from '../results';

export const getSingleAd = async (req, res) => {
    const { adId } = req.params;

    // Check if there is an ID provided in the URL
    if (!adId) {
        return res.status(400).json({
            error: true,
            message: 'You need to provide an ad ID',
        });
    }

    // Search for see if group exist
    const thisAd = await Ad.find({ adname: adId });

    // If there's no match
    if (!(thisAd.length > 0)) {
        return res.status(400).json({
            error: true,
            message: 'There is no match',
        });
    }

    // If there's a match
    try {
        // get the results of this Ad
        const thisResults = await Result.find({ vidDum: adId });
        return res.status(200).json({
            error: false,
            ad: thisAd[0], // return single ad
            results: thisResults, // return array of results
        });
    } catch (e) {
        return res.status(500).json({
            error: true,
            message: 'Cannot fetch result',
        });
    }
};

export const getAds = async (req, res) => {
    try {
        return res.status(200).json({
            ads: await Ad.find({}),
        });
    } catch (e) {
        return res.status(e.status).json({
            error: true,
            message: 'Error with Ads',
        });
    }
};

export const createAd = async (req, res) => {
    // Get the Vars from the POST body
    const {
        adname,
        shortname,
        videourl,
        industry,
        brand,
        country,
        campaigndate,
        lengthAd,
        channel,
        productionState,
        state,
    } = req.body;
    // Create an instance of the Ad class
    const newAd = new Ad({ adname, shortname, videourl, industry, brand, country, campaigndate, lengthAd, channel, productionState, state });

    newAd.save((err, thisAd) => {
        if (err) {
            // If there is an error, show it
            res.status(500).send(err);
        }
        // If there are no errors, show in the console the Ad created
        res.status(201).send(thisAd);
    });
};

export const createAdResults = async (req, res) => {
    const { title, description } = req.body;
    const { adId } = req.params;

    if (!title) {
        return res.status(400).json({ error: true, message: 'Title must be provided' });
    } else if (typeof title !== 'string') {
        return res.status(400).json({ error: true, message: 'Title must be a string' });
    } else if (title.length < 5) {
        return res.status(400).json({ error: true, message: 'Title is too short' });
    }

    if (!description) {
        return res.status(400).json({ error: true, message: 'Description must be provided' });
    } else if (typeof description !== 'string') {
        return res.status(400).json({ error: true, message: 'Description must be a string' });
    } else if (description.length < 10) {
        return res.status(400).json({ error: true, message: 'Description is too short' });
    }

    if (!adId) {
        return res.status(400).json({ error: true, message: 'adId must be provided' });
    }

    try {
        // group: await newGroup.save()
        const { result, ad } = await Ad.addResult(adId, { title, description });
        // console.log(result);
        return res.status(201).json({
            result,
            ad,
        });
    } catch (e) {
        return res.status(e.status).json({
            error: true,
            message: 'Ad cannot be created',
        });
    }
};
