const config = require('./common/config/env.config.js');
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const userRouter = require('./user/routes.config');
const petRouter = require('./pet/routes.config');


app.use(express.static(process.cwd()+"/front/dist/front"));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range, token');
    if (req.method === 'OPTIONS') {
        return res.send(200);
    } else {
        return next();
    }
});

app.use(bodyParser.json());
app.get('/', (req,res) => {
    res.sendFile(process.cwd()+"/front/dist/front/index.html")
});
userRouter.routesConfig(app);
petRouter.routesConfig(app);

app.listen(config.port, function () {
    console.log(`api listening to port ${config.port}`);
});

module.exports = app;
