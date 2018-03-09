import mongoose, { Schema } from 'mongoose';

const AdsSchema = new Schema({
    adname: {
        type: String,
        unique: true,
        minlength: [5, 'Ad name must be 5 characters long'],
    },
    shortname: {
        type: String,
        required: true,
        minlength: [5, 'The Short name must be 5 characters long'],
    },
    videourl: {
        type: String,
    },
    industry: {
        type: String,
    },
    brand: {
        type: String,
    },
    country: {
        type: String,
    },
    campaigndate: {
        type: String,
    },
    lengthAd: {
        type: String,
    },
    channel: {
        type: String,
    },
    productionState: {
        type: String,
    },
    state: {
        type: String,
    },
    summary: {
        type: String,
    },
    mainMessage: {
        type: String,
    },
});

/*
* Create a meetup and add it to the meetups array in the group
*/

AdsSchema.statics.addResult = async function (id, args) {
    const Result = mongoose.model('Result');
    // We add the group ID to the meetup group element
    // Finally this is the author mof the meetup
    const result = await new Result({ ...args, group: id });
    // We found the group with the ID provide in the URL
    // And we push the meetup ID in the meetups element
    const ad = await this.findByIdAndUpdate(id, { $push: { results: result.id } });

    // const result = await Promise.all([meetup.save(), group.save()]);

    return {
        result: await result.save(),
        ad,
    };
};

export default mongoose.model('Ad', AdsSchema);
