import mongoose, { Schema } from 'mongoose';

const KPIsSchema = new Schema({
    adID: {
        type: String,
        unique: true,
        minlength: [5, 'Ad name must be 5 characters long'],
    },
    brandRecall: {
        type: Number,
    },
    adAppeal: {
        type: Number,
    },
    toneOfVoice: {
        type: Number,
    },
    emotion: {
        type: Number,
    },
    uniqueness: {
        type: Number,
    },
    relevance: {
        type: Number,
    },
    shareability: {
        type: Number,
    },
    callToAction: {
        type: Number,
    },
    messaging: {
        type: Number,
    },
    brandFit: {
        type: Number,
    },
    brandRelevance: {
        type: Number,
    },
    viewerEngagement: {
        type: Number,
    },
    adMessage: {
        type: Number,
    },
    total: {
        type: Number,
    },
});

export default mongoose.model('KPI', KPIsSchema);
