import Result from './model'

export const createResult = async (req, res) => {
	// Get the Vars from the POST body
	const { results } = req.body

	try {
		Result.insertMany(results, (error, docs) => {
			return res.status(200).json({
				results: 'Results created'
			})
		})
	} catch (e) {
		console.log(e)
	}
}

export const getAllResults = async (req, res) => {
	try {
		return res.status(200).json({
			results: await Result.find({})
		})
	} catch (e) {
		return res.status(e.status).json({
			error: true,
			message: 'Error with Result'
		})
	}
}

export const getResultsOfAd = async (req, res) => {
	const { adId } = req.params

	// Check if there is an ID provided in the URL
	if (!adId) {
		return res.status(400).json({
			error: true,
			message: 'You need to provide an ad ID'
		})
	}

	// Search
	const thisResults = await Result.find({ VidDum: adId })

	// If there's no match
	if (!(thisResults.length > 0)) {
		return res.status(400).json({
			error: true,
			message: 'There is no match'
		})
	} else {
		// If there's a match
		try {
			return res.status(200).json({
				error: false,
				results: thisResults
			})
		} catch (e) {
			return res.status(500).json({
				error: true,
				message: 'Cannot fetch result'
			})
		}
	}
}

export const getResultsOfVariousAds = async (req, res) => {
	const { adIDs } = req.body

	// Check if there is an ID provided in the URL
	if (!adIDs) {
		return res.status(400).json({
			error: true,
			message: 'You need to provide an ad ID'
		})
	}

	// Search
	const thisResults = await Result.find(
		{
			VidDum: {
				$in: adIDs
			}
		}
	)

	// If there's no match
	if (!(thisResults.length > 0)) {
		return res.status(400).json({
			error: true,
			message: 'There is no match'
		})
	} else {
		// If there's a match
		try {
			return res.status(200).json({
				error: false,
				results: thisResults
			})
		} catch (e) {
			return res.status(500).json({
				error: true,
				message: 'Cannot fetch result'
			})
		}
	}
}
