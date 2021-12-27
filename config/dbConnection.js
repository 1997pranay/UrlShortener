const mongoose = require("mongoose");
const logger = require("./logger");

const dbUrl = 'mongodb://localhost:27017/UrlShortener';


// Mongoose Connect
(async() => {
    try {
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        logger.info("MongoDB Connected");
    } catch (err) {
        console.log('Error in connecting mongodb');
        logger.info(err);
    }
})();