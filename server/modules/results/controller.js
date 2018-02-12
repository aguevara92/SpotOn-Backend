import Result from './model';

export const createResult = async (req, res) => {
    // Get the Vars from the POST body
    const {
        U_id,
        S1_Dummy,
        S2,
        S3,
        S4a,
        S4b,
        VidDum,
        Q1,
        Q2,
        Q3r1,
        Q3r2,
        Q3r3,
        Q3r4,
        Q3r5,
        Q3r6,
        Q3r7,
        Q3r8,
        Q3r9,
        Q3r10,
        Q3r11,
        Q3r12,
        Q3r13,
        Q3r14,
        Q3r15,
        Q3r16,
        Q4r1,
        Q4r2,
        Q4r3,
        Q4r4,
        Q4r5,
        Q4r6,
        Q4r7,
        Q4r8,
        Q4r9,
        Q4r10,
        Q4r11,
        Q4r12,
        Q5o1,
        Q5o2,
        Q5o3,
        Q6,
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
        Q8,
        S5,
    } = req.body;
    // Create an instance of the Ad class
    const newResult = new Result({ U_id, S1_Dummy, S2, S3, S4a, S4b, VidDum, Q1, Q2, Q3r1, Q3r2, Q3r3, Q3r4, Q3r5, Q3r6, Q3r7, Q3r8, Q3r9, Q3r10, Q3r11, Q3r12, Q3r13, Q3r14, Q3r15, Q3r16, Q4r1, Q4r2, Q4r3, Q4r4, Q4r5, Q4r6, Q4r7, Q4r8, Q4r9, Q4r10, Q4r11, Q4r12, Q5o1, Q5o2, Q5o3, Q6, Q7r1, Q7r2, Q7r3, Q7r4, Q7r5, Q7r6, Q7r7, Q7r8, Q7r9, Q7r10, Q8, S5 });

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
