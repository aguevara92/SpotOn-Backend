import Result from './model';

export const createResult = async (req, res) => {
    // Get the Vars from the POST body
    const {
        U_id,
        S1_Dummy,
        S2,
        S3,
        vidDum,
        Q5r1,
        Q6r1,
        Q6r2,
        Q6r3,
        Q6r4,
        Q6r5,
        Q6r6,
        Q6r7,
        Q6r8,
        Q6r9,
        Q6r10,
        Q6r11,
        Q6r12,
        Q6r13,
        Q6r14,
        Q6r15,
        Q6r16,
        Q6r17,
        Q6r18,
        Q6r19,
        Q7r1,
        Q7r2,
        Q7r3,
        Q7r4,
        Q7r5,
        Q7r6,
        Q7r7,
        Q7r8,
        Q7r9,
        Q7r10,
        Q7r11,
        Q8r1,
        Q8r2,
        Q8r3,
        Q8r4,
        Q8r5,
        Q9,
        Q10ar1,
        Q10br1,
        Q11,
        S5,
        S6,
        S7,
        S8,
        S9,
    } = req.body;
    // Create an instance of the Ad class
    const newResult = new Result({ U_id, S1_Dummy, S2, S3, vidDum, Q5r1, Q6r1, Q6r2, Q6r3, Q6r4, Q6r5, Q6r6, Q6r7, Q6r8, Q6r9, Q6r10, Q6r11, Q6r12, Q6r13, Q6r14, Q6r15, Q6r16, Q6r17, Q6r18, Q6r19, Q7r1, Q7r2, Q7r3, Q7r4, Q7r5, Q7r6, Q7r7, Q7r8, Q7r9, Q7r10, Q7r11, Q8r1, Q8r2, Q8r3, Q8r4, Q8r5, Q9, Q10ar1, Q10br1, Q11, S5, S6, S7, S8, S9 });

    newResult.save((err, thisResult) => {
        if (err) {
            // If there is an error, show it
            res.status(500).send(err);
        }
        // If there are no errors, show in the console the Result created
        res.status(201).send(thisResult);
    });
};

export const getAllResults = async (req, res) => {
    try {
        return res.status(200).json({
            results: await Result.find({}),
        });
    } catch (e) {
        return res.status(e.status).json({
            error: true,
            message: 'Error with Result',
        });
    }
};

export const getResultsOfAd = async (req, res) => {
    const { adId } = req.params;

    // Check if there is an ID provided in the URL
    if (!adId) {
        return res.status(400).json({
            error: true,
            message: 'You need to provide an ad ID',
        });
    }

    // Search for see if group exist
    const thisResults = await Result.find({ vidDum: adId });

    // If there's no match
    if (!(thisResults.length > 0)) {
        return res.status(400).json({
            error: true,
            message: 'There is no match',
        });
    }

    // If there's a match
    try {
        return res.status(200).json({
            error: false,
            results: thisResults,
        });
    } catch (e) {
        return res.status(500).json({
            error: true,
            message: 'Cannot fetch result',
        });
    }
};
