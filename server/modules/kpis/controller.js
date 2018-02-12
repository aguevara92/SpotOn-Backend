import KPI from './model';

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
