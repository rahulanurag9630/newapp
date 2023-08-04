const mongoose = require('mongoose');
const uri = 'mongodb+srv://anuragsinghkushwaha45:Anurag123@cluster0.u6lo05p.mongodb.net/yourdb?retryWrites=true&w=majority';

const connectToMongo = () => {
    return mongoose.connect(uri)
        .then(() => {
            console.log('Connected to MongoDB successfully');
        })
        .catch((err) => {
            console.error('Error connecting to MongoDB:', err);
        });
};

module.exports = connectToMongo;
 