import mongoose from 'mongoose';
import http from 'http';

export default () => {
    const uristring =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/HelloMongoose';

    // The http server will listen to an appropriate port, or default to
    // port 5000.
    const theport = process.env.PORT || 5000;

    mongoose.Promise = global.Promise;
    // mongoose.connect('mongodb://localhost/trex');
    // mongoose.connect('localhost', 'trex');

    mongoose.connect(process.env.MONGODB_URI);

    mongoose.connection
        .once('open', () => console.log('MongoDB running'))
        .on('error', err => console.log(err));
};
