import mongoose from 'mongoose';
import http from 'http';

export default () => {
    mongoose.Promise = global.Promise;
    // mongoose.connect('mongodb://localhost/trex');
    const uristring =
        process.env.MONGOLAB_URI ||
        process.env.MONGOHQ_URL ||
        'mongodb://localhost/spotOn';

    const theport = process.env.PORT || 5000;

    // Makes connection asynchronously.  Mongoose will queue up database
    // operations and release them when the connection is complete.
    mongoose.connect(uristring, (err, res) => {
        if (err) {
            console.log('ERROR connecting to: ' + uristring + '. ' + err);
        } else {
            console.log('Succeeded connected to: ' + uristring);
        }
    });
};
