const mongoose = require('mongoose')
const logger = require('../utils/logger') 

let database;

const connect = async () => {
    // const MONGODB_URL = config.DB_CONNECTION_STRING;

    if (database) return;

    mongoose.connect(process.env.MONG_URI)
    .then((connection)=> {
        database = connection;
        logger.info("Database Synced");

    })
    .catch((err) => {
        logger.error(err.message);
    })
};

module.exports = connect