import mongoose, { Schema } from 'mongoose'

const KPI = new Schema(
	{
		brandRecall: Number,
		adAppeal: Number,
		toneOfVoice: Number,
		emotion: Number,
		uniqueness: Number,
		relevance: Number,
		shareability: Number,
		callToAction: Number,
		messaging: Number,
		brandFit: Number,
		brandRelevance: Number,
		viewerEngagement: Number,
		adMessage: Number,
		total: Number
	},
	{ _id: false }
)

export default KPI
