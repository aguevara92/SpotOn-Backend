'use strict'
require('dotenv').config()
var _ = require('lodash')
const aws = require('aws-sdk')
const csv = require('csvtojson')

export const getObject = async (req, res) => {
	const { adID } = req.params

	// The user credental are stored as enviorement variables
	// AWS_ACCESS_KEY_ID
	// AWS_SECRET_ACCESS_KEY
	// Pass in opts to S3 if necessary
	const s3 = new aws.S3()

	var getParams = {
		Bucket: 'tvsquared-export-spoton', // your bucket name,
		Key: 'spots_details.csv000' // path to the object you're looking for
	}

	let objectData = []

	s3.getObject(getParams, async function (err, data) {
		// Handle any error and exit
		if (err) {
			console.log('error in S3')
			console.log(err)
			return error
		}

		// No error happened
		// Convert Body from a Buffer to a String
		const csvString = data.Body.toString('utf-8') // Use the encoding necessary
		// Convert array of Objects to Object with spot_name as Keys

		csv({
			noheader: true,
			output: 'csv'
		})
			.fromString(csvString)
			.then(csvArray => {

				let header = [
					'source_id',
					'management_entity',
					'display_name',
					'company_name',
					'country_name',
					'spot_name',
					'grp',
					'costs_eur',
					'costs_usd',
					'costs_lc',
					'acquisitions',
					'acquisition_desktop',
					'acquisitions_app',
					'first_time_aired',
					'last_time_aired',
					'datediff',
					'times_aired'
				]
				csvArray.unshift(header)

				//console.log(csvArray)
				var jsonObj = []
				var headers = csvArray[0]
				for (var i = 1; i < csvArray.length; i++) {
					var data = csvArray[i]
					var obj = {}
					for (var j = 0; j < data.length; j++) {
						//console.log(data[j])
						if (data[j] !== undefined || data[j] !== null) {
							obj[headers[j].trim()] = data[j].trim()
						}
					}
					jsonObj.push(obj)
				}
				JSON.stringify(jsonObj)
				console.log(jsonObj)

				objectData = _.keyBy(jsonObj, 'spot_name')

				// Get the object from the request
				let thisAd = objectData[adID]
				console.log('thisAd')
				console.log(thisAd)
				if (!_.isEmpty(thisAd)) {
					// Fix the formating of the number
					if (_.isString(thisAd.costs_eur)) {
						thisAd.costs_eur = thisAd.costs_eur.replace(',', '.')
						thisAd.costs_eur = thisAd.costs_eur.replace('"', '')
						thisAd.costs_eur = parseFloat(thisAd.costs_eur)
					}
					if (_.isString(thisAd.costs_lc)) {
						thisAd.costs_lc = thisAd.costs_lc.replace(',', '.')
						thisAd.costs_lc = thisAd.costs_lc.replace('"', '')
						thisAd.costs_lc = parseFloat(thisAd.costs_lc)
					}
					if (_.isString(thisAd.acquisitions)) {
						thisAd.acquisitions = thisAd.acquisitions.replace(
							',',
							'.'
						)
						thisAd.acquisitions = thisAd.acquisitions.replace(
							'"',
							''
						)
						thisAd.acquisitions = parseFloat(thisAd.acquisitions)
					}

					let CPA_euro = thisAd.costs_eur / thisAd.acquisitions
					let CPA_local = thisAd.costs_lc / thisAd.acquisitions

					// return the values of CPAs
					return res.status(200).json({
						CPA_euro: CPA_euro,
						CPA_local: CPA_local,
						days_aired: thisAd.datediff,
						times_aired: thisAd.times_aired,
						GRP: thisAd.grp
					})
				} else {
					return res.status(400).json({
						error: true,
						desc: objectData
					})
				}

				//return jsonObj
			})
	})

	// Function to convert the CSV to an Array of Objects
	const csvToObject = csvString => {
		//let csvArray = []
		csv({
			noheader: true,
			output: 'csv'
		})
			.fromString(csvString)
			.then(csvArray => {
				var jsonObj = []
				var headers = csvArray[0]
				for (var i = 1; i < csvArray.length; i++) {
					var data = csvArray[i]
					var obj = {}
					for (var j = 0; j < data.length; j++) {
						//console.log(data[j])
						if (data[j] !== undefined || data[j] !== null) {
							obj[headers[j].trim()] = data[j].trim()
						}
					}
					jsonObj.push(obj)
				}
				JSON.stringify(jsonObj)

				console.log(jsonObj)

				return jsonObj
			})
	}
}
