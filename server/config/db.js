import mongoose from 'mongoose';

export default () => {
    const uristring =
    process.env.MONGODB_URI ||
    'mongodb://localhost/spotOn';

    mongoose.Promise = global.Promise;

    mongoose.connect(uristring);

    mongoose.connection
        .once('open', () => console.log('MongoDB running'))
        .on('error', err => console.log(err));
};
