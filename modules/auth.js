const authUtils = require('./auth_utils');

//Protect module from workshop example

function protect(req, res, next) {
    let token = req.headers.authorization;

    if(!token){
        res.status(200).json({error: "No token"}).end();
        return;
    }

    const payload = authUtils.verifyToken(token);
    if(!payload){
        res.status(403).json({error: "Not a valid token"}).end();
    }
    res.locals.userid = payload.userid;
    res.locals.username = payload.user;

    next();
}

module.exports = protect;