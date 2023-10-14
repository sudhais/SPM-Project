import { connect as _connect } from 'mongoose';
import logger from '../utils/logger.js'; 

let database;

const connect = async () => {
    
    if (database) return;

    _connect(process.env.MONG_URI)
    .then((connection)=> {
        database = connection;
        logger.info("Database Synced");

    })
    .catch((err) => {
        logger.error(err.message);
    })
};

export default connect