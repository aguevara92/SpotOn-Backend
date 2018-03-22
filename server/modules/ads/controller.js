import Ad from './model';
import { Result } from '../results';
import { KPI } from '../kpis';

// -----------------
// The function returns a single Ad
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
        const thisResults = await Result.find({ VidDum: adId }); // get the results of this Ad
        const thisKPIs = await KPI.findOne({ adID: adId }); // get the KPIs of this Ad
        return res.status(200).json({
            error: false,
            ad: thisAd[0], // return single ad
            results: thisResults, // return array of results
            kpis: thisKPIs, // return array with KPIs
        });
    } catch (e) {
        return res.status(500).json({
            error: true,
            message: 'Cannot fetch result',
        });
    }
};

// -----------------
// The function returns all Ads in the collection
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

// -----------------
// The function returns all Ads of the same country
export const getCountryAds = async (req, res) => {
    const { countryName } = req.params;
    try {
        return res.status(200).json({
            country: countryName,
            ads: await Ad.find({ country: countryName }),
        });
    } catch (e) {
        return res.status(e.status).json({
            error: true,
            message: 'Error with Ads',
        });
    }
};

// -----------------
// The function creates a new Ad collection
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
        summary,
        mainMessage,
        secondaryMessage,
        tertiaryMessage,
    } = req.body;
    // Create an instance of the Ad class
    const newAd = new Ad({
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
        summary,
        mainMessage,
        secondaryMessage,
        tertiaryMessage,
    });

    newAd.save((err, thisAd) => {
        if (err) {
            // If there is an error, show it
            res.status(500).send(err);
        }
        // If there are no errors, show in the console the Ad created
        res.status(201).send(thisAd);
    });
};

// -----------------
// The function updates an Ad
export const updateAd = async (req, res) => {
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
        summary,
        mainMessage,
        secondaryMessage,
        thirdMessage,
    } = req.body;
    // Create an instance of the Ad class
    const newAd = new Ad({
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
        summary,
        mainMessage,
        secondaryMessage,
        thirdMessage,
    });

    Ad.remove({ adname: req.body.adname }, () => {
        newAd.save((err, thisAd) => {
            if (err) {
                // If there is an error, show it
                res.status(500).send(err);
            }
            // If there are no errors, show in the console the Ad created
            res.status(201).send(thisAd);
        });
    });
};

// -----------------
// The function rmoves an Ad collection
export const removeAd = async (req, res) => {
    Ad.remove({ adname: req.body.adname }, (err) => {
        if (err) {
            // If there is an error, show it
            res.status(500).send(err);
        } else {
            // If there are no errors, show in the console
            res.status(200).json({ error: false, message: 'The Ad was deleted' });
        }
    });
};

// -----------------
// The function creates results for an Ad
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

// -----------------
// The function updates teh Ad collection an adds the number of tone of voices
export const addExtraInfo = async (req, res) => {
    const { adId } = req.params;
    const {
        witty,
        cool,
        trustworthy,
        inspiring,
        friendly,
        youthful,
        funny,
        easyGoing,
        boring,
        generic,
        silly,
        formal,
        shocking,
        aggressive,
        childish,
        pretentious,
        // ====
        excited,
        impressed,
        intrigued,
        entertained,
        informed,
        interested,
        indifferent,
        bored,
        confused,
        offended,
        annoyed,
        irritated,
        // ====
        sampleSize,
    } = req.body;

    Ad.findOneAndUpdate({ adname: adId },
        { $set: {
            toneOfVoice: {
                witty,
                cool,
                trustworthy,
                inspiring,
                friendly,
                youthful,
                funny,
                easyGoing,
                boring,
                generic,
                silly,
                formal,
                shocking,
                aggressive,
                childish,
                pretentious,

            },
            emotion: {
                excited,
                impressed,
                intrigued,
                entertained,
                informed,
                interested,
                indifferent,
                bored,
                confused,
                offended,
                annoyed,
                irritated,
            },
            sampleSize,
        } },
        { new: true },
        (err, singleAd) => {
            if (err) return res.status(400);
            res.send(singleAd);
        }
    );
};
