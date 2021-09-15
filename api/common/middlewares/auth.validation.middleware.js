// this should be validation of a real token
// for this code test it will only check if exist a token
exports.hasToken = (req, res, next) => {
    let token = req.headers.token;
    if (token) {
        return next();
    } else {
        return res.status(403).send();
    }
};