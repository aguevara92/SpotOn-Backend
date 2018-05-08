import User from './model'

// -----------------
// The function returns a single User
export const getSingleUser = async (req, res) => {
	const { userID } = req.params

	// Search for see if group exist
	const thisUser = await User.findOne({ email: userID.toLowerCase() })

	// If there's no match
	if (!thisUser) {
		return res.status(400).json({
			error: true,
			message: 'There is no match for ' + userID
		})
	} else {
		// If there's a match
		try {
			return res.status(200).json({
				user: thisUser // return single user
			})
		} catch (e) {
			// Cant reach the server
			return res.status(500).json({
				error: true,
				message: 'Cannot fetch user'
			})
		}
	}
}

// -----------------
// The function returns all Users in the collection
export const getUsers = async (req, res) => {
	try {
		return res.status(200).json({
			users: await User.find({})
		})
	} catch (e) {
		return res.status(e.status).json({
			error: true,
			message: 'Error with Users'
		})
	}
}

// -----------------
// The function creates a new User collection
export const createUser = async (req, res) => {
	console.log(req.body)
	// Get the Vars from the POST body
	const { email, countries, right } = req.body
	// Create an instance of the User class
	const newUser = new User({
		email,
		countries,
		right
	})

	newUser.save((err, thisUser) => {
		if (err) {
			// If there is an error, show it
			res.status(500).send(err)
		}
		// If there are no errors, show in the console the User created
		res.status(201).send(thisUser)
	})
}

// -----------------
// The function updates the Ad collection and adds an Array of Strings with the adnames
export const updateFavorites = async (req, res) => {
	const { email, favourites } = req.body

	User.findOneAndUpdate(
		{ email: email },
		{
			$set: {
				favourites: favourites
			}
		},
		{ new: true },
		(err, newProfile) => {
			if (err) return res.status(400)
			res.send(newProfile)
		}
	)
}

// -----------------
// The function updates the Ad collection and toggles the first time key. This is for the Tour
export const updateProfileFirstTime = async (req, res) => {
	const { userID } = req.params

	User.findOneAndUpdate(
		{ email: userID },
		{
			$set: {
				firstTime: false
			}
		},
		{ new: true },
		(err, newProfile) => {
			if (err) return res.status(400)
			res.send(newProfile)
		}
	)
}
