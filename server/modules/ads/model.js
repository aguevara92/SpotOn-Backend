import mongoose, { Schema } from 'mongoose'
import { KPI } from '../kpis'

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
	lengthAd: Number,
	channel: String,
	productionState: String,
	state: String,
	summary: String,
	mainMessage: Number,
	secondaryMessage: Number,
	tertiaryMessage: Number,
	sampleSize: Number,
	CPA_name: String,
	toneOfVoice: ToneOfVoice,
	emotion: Emotion,
	kpis: KPI
})

export default mongoose.model('Ad', AdsSchema)
