'use strict'
import { User } from '../users'
var _ = require('lodash')
var request = require('request')
require('dotenv').config()

export const syncUsersBraze = async () => {
	let allUsers = await User.find({})
	let usersToAdd = []
	for (let i = 0; i < allUsers.length; i++) {
		const thisUser = allUsers[i]
		let user = {}
		user.external_id = thisUser.email
		user.email = thisUser.email
		user.right = thisUser.right
		if (thisUser.subscriptions !== undefined) {
			user.industries = thisUser.subscriptions.industries
			user.brands = thisUser.subscriptions.brands
		} else {
			user.industries = []
			user.brands = []
		}
		usersToAdd.push(user)
	}
	//console.log('usersToAdd')
	//console.log(usersToAdd)

	const trackUsers = {
		api_key: process.env.BRAZE_API_KEY,
		attributes: usersToAdd
	}

	request.post(
		process.env.BRAZE_URL + '/users/track',
		{ json: trackUsers },
		(error, response, body) => {
			if (!error && response.statusCode == 200) {
				console.log(body)
			}
		}
	)
}

export const brazeApiEmail = async users => {
	let usersToSend = []
	for (let i = 0; i < users.length; i++) {
		const thisEmail = users[i]
		let user = {
			external_user_id: thisEmail
		}
		usersToSend.push(user)
	}
	//console.log('usersToSend')
	//console.log(usersToSend)

	const triggerEmail = {
		api_key: process.env.BRAZE_API_KEY,
		campaign_id: '2b5c86f1-edc4-2ffb-5949-f126cae0a6c5',
		recipients: usersToSend
	}

	request.post(
		process.env.BRAZE_URL + '/campaigns/trigger/send',
		{ json: triggerEmail },
		(error, response, body) => {
			if (!error && response.statusCode == 200) {
				console.log(body)
			}
		}
	)
}

/**
 * Get all the ads, and compare the subscriptions of the users.
 *
 * @param {Array} ads            Array of objects of Ads.
 * @returns {Array}              Array of email addresses
 */
export const sendEmail = async ads => {
	/* Calculate the subscriptions of the ads
	- Group the subscriptions by country
	- gets all the different values of 'induestries' and 'brands'
	*/
	let subscriptions = {}
	for (let i = 0; i < ads.length; i++) {
		let currentObject = ads[i]
		subscriptions[currentObject.country] = subscriptions[
			currentObject.country
		] || { industries: [], brands: [] }
		subscriptions[currentObject.country].industries.push(
			currentObject.industry
		)
		subscriptions[currentObject.country].brands.push(currentObject.brand)
	}

	/* Get all users that has a subscriptions that matches
	*/
	const allUsers = await User.find({})

	// Here will be stored all the email addresses to trigger the campaigns
	let emails = []

	// For each country
	for (let countryName in subscriptions) {
		const countrySubscriptions = subscriptions[countryName]

		let usersFilteredByCountry = _.map(allUsers, o => {
			if (o.countries.includes(countryName) || o.right === 'admin')
				return o
		})
		// Remove undefines from the array
		usersFilteredByCountry = _.without(usersFilteredByCountry, undefined)

		// For each key of subscription on each country
		for (let key in countrySubscriptions) {
			const subscriptionsArray = countrySubscriptions[key]

			for (var i in subscriptionsArray) {
				let usersFiltered = _.map(usersFilteredByCountry, o => {
					if (o['subscriptions'] !== undefined) {
						if (
							o['subscriptions'][key].includes(
								subscriptionsArray[i]
							)
						)
							return o.email
					}
				})
				emails = emails.concat(usersFiltered)
			}
		}
	}
	// Clean out the results for removing duplicates or 'undefined'
	emails = _.without(_.uniq(emails), undefined)

	// Fires the sync user braze
	await syncUsersBraze()

	// Fires the campaign in braze
	await brazeApiEmail(emails)
}
