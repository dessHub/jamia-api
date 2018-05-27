const Mongoose = require('mongoose');
const dotenv = require('dotenv');
 
if (process.env.NODE_ENV !== 'production') {
dotenv.load();
}

Mongoose.Promise = global.Promise;

const connectToDb = () => {
    let dbHost = process.env.MONGODB_URI;
    let testDb = process.env.TEST_MONGODB_URI;
    
    try {
        if(process.env.NODE_ENV == "test"){
            Mongoose.connect(`mongodb://${testDb}`);
            console.log('Connected to test db!!!');
        }else{
        Mongoose.connect(`mongodb://${dbHost}`);
        console.log('Connected to mongo!!!');
    }
        
    }
    catch (err) {
        console.log('Could not connect to MongoDB');
    }
}

module.exports = connectToDb;
