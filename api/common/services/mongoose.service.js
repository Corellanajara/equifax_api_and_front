const mongoose = require('mongoose');
const { mongoUser , mongoPassword } = require('../config/env.config');
let count = 0;

const options = {
    autoIndex: false,
    reconnectTries: 30,
    reconnectInterval: 500, 
    poolSize: 10,
    useNewUrlParser : true,
    bufferMaxEntries: 0
};

const connectWithRetry = () => {
    console.log('MongoDB connection with retry');
    const connUri = `mongodb+srv://${mongoUser}:${mongoPassword}@equifax.hqtj6.mongodb.net/equifax?retryWrites=true&w=majority`;
    mongoose.connect(connUri, options).then(()=>{
        console.log('MongoDB is connected')
    }).catch(err=>{
        console.log(connUri+' MongoDB connection unsuccessful, retry after 5 seconds. ', ++count);
        setTimeout(connectWithRetry, 5000)
    })
};

connectWithRetry();

exports.mongoose = mongoose;
