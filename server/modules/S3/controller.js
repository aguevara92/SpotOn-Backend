'use strict'
require('dotenv').config()
var _ = require('lodash')
const aws = require('aws-sdk')

export const getObject = async (req, res) => {
	const { adID } = req.params

	// The user credental are stored as enviorement variables
	// AWS_ACCESS_KEY_ID
	// AWS_SECRET_ACCESS_KEY
	// Pass in opts to S3 if necessary
	const s3 = new aws.S3()

	var getParams = {
		Bucket: 'tvsquared-export-spoton', // your bucket name,
		Key: 'dim_countries.csv' // path to the object you're looking for
	}

	let objectData = []

	s3.getObject(getParams, function(err, data) {
		// Handle any error and exit
		if (err) {
			console.log(err)
			return error
		}

		// No error happened
		// Convert Body from a Buffer to a String
		objectData = csvToObject(data.Body.toString('utf-8')) // Use the encoding necessary
		// Convert array of Objects to Object with spot_name as Keys
		objectData = _.keyBy(objectData, 'spot_name')

		// Get the object from the request
		let thisAd = objectData[adID]
		if (!_.isEmpty(thisAd)) {
			// Fix the formating of the number
			if (_.isString(thisAd.costs_eur)) {
				thisAd.costs_eur = thisAd.costs_eur.replace(',', '.')
				thisAd.costs_eur = thisAd.costs_eur.replace('"', '')
				thisAd.costs_eur = parseFloat(thisAd.costs_eur)
			}
			if (_.isString(thisAd.costs_api_currency)) {
				thisAd.costs_api_currency = thisAd.costs_api_currency.replace(
					',',
					'.'
				)
				thisAd.costs_api_currency = thisAd.costs_api_currency.replace(
					'"',
					''
				)
				thisAd.costs_api_currency = parseFloat(
					thisAd.costs_api_currency
				)
			}
			if (_.isString(thisAd.acquisitions)) {
				thisAd.acquisitions = thisAd.acquisitions.replace(',', '.')
				thisAd.acquisitions = thisAd.acquisitions.replace('"', '')
				thisAd.acquisitions = parseFloat(thisAd.acquisitions)
			}

			let CPA_euro = thisAd.costs_eur / thisAd.acquisitions
			let CPA_local = thisAd.costs_api_currency / thisAd.acquisitions

			// return the values of CPAs
			return res.status(200).json({
				CPA_euro: CPA_euro,
				CPA_local: CPA_local
			})
		} else {
			return res.status(400).json({
				error: true,
				desc: objectData
			})
		}
	})

	// Function to convert the CSV to an Array of Objects
	const csvToObject = csvString => {
		// The array we're going to build
		let csvObj = []
		// Break it into rows to start
		let csvRows = csvString.split(/\n/)
		// Take off the first line to get the headers, then split that into an array
		let csvHeaders = csvRows
			.shift()
			.concat(',i')
			.replace('\r', '')
			.split(',')

		// Loop through remaining rows
		for (let rowIndex = 0; rowIndex < csvRows.length; ++rowIndex) {
			//let rowArray = csvRows[rowIndex].split(',')

			var rowArray = csvRows[rowIndex]
				.replace(',,', ', ,')
				.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g)

			// Create a new row object to store our data.
			let rowObject = (csvObj[rowIndex] = {})

			// Then iterate through the remaining properties and use the headers as keys
			for (let propIndex = 0; propIndex < rowArray.length; ++propIndex) {
				// Grab the value from the row array we're looping through...
				let propValue = rowArray[propIndex].replace('\r', '')
				// ...also grab the relevant header (the RegExp in both of these removes quotes)
				let propLabel = csvHeaders[propIndex]
				if (!isNaN(propValue)) {
					propValue = parseInt(propValue, 10)
				}
				rowObject[propLabel] = propValue
			}
		}
		return csvObj
	}
}
