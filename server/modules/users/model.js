import mongoose, { Schema } from 'mongoose'

const subscriptions = new Schema(
	{
		countries: [String],
		industries: [String]
	},
	{ _id: false }
)

const UsersSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		minlength: [5, 'Email must be 5 characters long']
	},
	countries: [String],
	right: String,
	firstTime: {
		type: Boolean,
		default: true
	},
	favourites: [String],
	subscriptions: subscriptions
})

export default mongoose.model('User', UsersSchema)
