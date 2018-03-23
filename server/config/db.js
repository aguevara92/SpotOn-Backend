import mongoose from 'mongoose';

export default () => {
    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.MONGODB_URI || 'localhost', 'spotOn');
    // mongoose.connect('localhost', 'spotOn');
    // mongoose.connect(process.env.MONGODB_URI);

    mongoose.connection
        .once('open', () => console.log('MongoDB running'))
        .on('error', err => console.log(err));
};
