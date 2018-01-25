import mongoose from 'mongoose';

export default () => {
    mongoose.Promise = global.Promise;
    // mongoose.connect('mongodb://localhost/trex');
    mongoose.connect('localhost', 'trex');
    mongoose.connection
        .once('open', () => console.log('MongoDB running'))
        .on('error', err => console.log(err));
};
