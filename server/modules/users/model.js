import mongoose, { Schema } from 'mongoose'

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
	}
})

export default mongoose.model('User', UsersSchema)
