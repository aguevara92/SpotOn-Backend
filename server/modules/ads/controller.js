import Ad from './model'
import { KPI } from '../kpis'
import { sendEmail } from '../email'

// -----------------
// The function returns a single Ad
export const getSingleAd = async (req, res) => {
	const { adId } = req.params

	// Check if there is an ID provided in the URL
	if (!adId) {
		return res.status(400).json({
			error: true,
			message: 'You need to provide an ad ID'
		})
	}

	// Search for see if group exist
	const thisAd = await Ad.findOne({ adname: adId })

	// If there's no match
	if (!thisAd) {
		return res.status(400).json({
			error: true,
			message: 'There is no match'
		})
	} else {
		return res.status(200).json({
			error: false,
			ad: thisAd
		})
	}
}

// -----------------
// The function returns all Ads in the collection
export const getAds = async (req, res) => {
	try {
		return res.status(200).json({
			ads: await Ad.find({})
		})
	} catch (e) {
		return res.status(e.status).json({
			error: true,
			message: 'Error with Ads'
		})
	}
}

// -----------------
// The function returns all Ads of the same country
export const getCountryAds = async (req, res) => {
	const { countryName } = req.params
	try {
		return res.status(200).json({
			country: countryName,
			ads: await Ad.find({ country: countryName })
		})
	} catch (e) {
		return res.status(e.status).json({
			error: true,
			message: 'Error with Ads'
		})
	}
}

/**
 * Gets an array of Ads and
 * 	- Updates the existing ones
 *  - Creates them if doesnt exist
 * This allow the user to upload the CSV with old ads without
 * worrying of breaking the app
 *
 * @param {Array} { ads }              Array of object of Ads
 */
export const createAds = async (req, res) => {
	// Gets the array of ads
	const { ads } = req.body

	// In here will be stored the details of this method
	let notCreatedAds = []
	let createdAds = []
	let updatedAds = []

	// Counter of ads processed for the async functions
	let adsProcessed = 0
	// The callback is called everytime an ads is created or updated
	function callback() {
		adsProcessed++
		// If it was the last ad on the array
		if (adsProcessed === ads.length) {
			// Send an email about the newly created ads
			sendEmail(createdAds)
			// Send a response to the user
			return res.status(200).json({
				createAds: createdAds,
				updatedAds: updatedAds,
				notCreated: notCreatedAds
			})
		}
	}

	// For each Ad in the array
	ads.forEach(thisAd => {
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
			CPA_name
		} = thisAd

		// Firts try to update the Ad
		Ad.update(
			{ adname: adname },
			{
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
				CPA_name
			},
			(err, affected, rawResponse) => {
				// If there was no Ad updated or an error
				if (affected.n === 0 || err) {
					// try to create a new Ad
					const newAd = new Ad(thisAd)
					newAd.save((e, singleAd) => {
						if (e) {
							// If it couldn't be created
							notCreatedAds.push(thisAd)
							callback()
						}
						// If it was succesfuly created
						createdAds.push(thisAd)
						callback()
					})
				} else {
					// if it was succesfully updated
					updatedAds.push(thisAd)
					callback()
				}
			}
		)
	})
}

// -----------------
// The function creates a new Ad collection
export const createSingleAd = async (req, res) => {
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
		CPA_name
	} = req.body
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
		CPA_name
	})

	newAd.save((err, thisAd) => {
		if (err) {
			// If there is an error, show it
			res.status(500).send(err)
		}
		// If there are no errors, show in the console the Ad created
		res.status(201).send(thisAd)
	})
}

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
		CPA_name
	} = req.body
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
		CPA_name
	})

	Ad.remove({ adname: req.body.adname }, () => {
		newAd.save((err, thisAd) => {
			if (err) {
				// If there is an error, show it
				res.status(500).send(err)
			}
			// If there are no errors, show in the console the Ad created
			res.status(201).send(thisAd)
		})
	})
}

// -----------------
// The function rmoves an Ad collection
export const removeAd = async (req, res) => {
	Ad.remove({ adname: req.body.adname }, err => {
		if (err) {
			// If there is an error, show it
			res.status(500).send(err)
		} else {
			// If there are no errors, show in the console
			res.status(200).json({
				error: false,
				message: 'The Ad was deleted'
			})
		}
	})
}

// -----------------
// The function updates teh Ad collection an adds the number of tone of voices
export const addExtraInfo = async (req, res) => {
	const { adId } = req.params
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
		sampleSize
	} = req.body

	Ad.findOneAndUpdate(
		{ adname: adId },
		{
			$set: {
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
					pretentious
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
					irritated
				},
				sampleSize
			}
		},
		{ new: true },
		(err, singleAd) => {
			if (err) return res.status(400)
			res.send(singleAd)
		}
	)
}
