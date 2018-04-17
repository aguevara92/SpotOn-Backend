import mongoose, { Schema } from 'mongoose'

const ToneOfVoice = new Schema(
	{
		witty: Number,
		cool: Number,
		trustworthy: Number,
		inspiring: Number,
		friendly: Number,
		youthful: Number,
		funny: Number,
		easyGoing: Number,
		boring: Number,
		generic: Number,
		silly: Number,
		formal: Number,
		shocking: Number,
		aggressive: Number,
		childish: Number,
		pretentious: Number
	},
	{ _id: false }
)

const Emotion = new Schema(
	{
		excited: Number,
		impressed: Number,
		intrigued: Number,
		entertained: Number,
		informed: Number,
		interested: Number,
		indifferent: Number,
		bored: Number,
		confused: Number,
		offended: Number,
		annoyed: Number,
		irritated: Number
	},
	{ _id: false }
)

const AdsSchema = new Schema({
	adname: {
		type: String,
		unique: true,
		minlength: [5, 'Ad name must be 5 characters long']
	},
	shortname: {
		type: String,
		required: true,
		minlength: [5, 'The Short name must be 5 characters long']
	},
	videourl: String,
	industry: String,
	brand: String,
	country: String,
	campaigndate: String,
	lengthAd: String,
	channel: String,
	productionState: String,
	state: String,
	summary: String,
	mainMessage: Number,
	secondaryMessage: Number,
	tertiaryMessage: Number,
	sampleSize: Number,
	toneOfVoice: ToneOfVoice,
	emotion: Emotion
})

/*
* Create a meetup and add it to the meetups array in the group
*/

AdsSchema.statics.addResult = async (id, args) => {
	const Result = mongoose.model('Result')
	// We add the group ID to the meetup group element
	// Finally this is the author mof the meetup
	const result = await new Result({ ...args, group: id })
	// We found the group with the ID provide in the URL
	// And we push the meetup ID in the meetups element
	const ad = await this.findByIdAndUpdate(id, {
		$push: { results: result.id }
	})

	// const result = await Promise.all([meetup.save(), group.save()]);

	return {
		result: await result.save(),
		ad
	}
}

export default mongoose.model('Ad', AdsSchema)
