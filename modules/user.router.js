const express = require("express");
const router = express.Router();
const db = require('./db');
const auth_utils = require('./auth_utils');

router.post("/api/register", async (req, res, next) => {  
    const user  = req.body;

    const username = user.username;
    const password = user.password;
    const salt = auth_utils.createHash(user.password).value;
    try{
        const data = await db.createUser(username, password, salt);
        if(data.rows.length > 0){
            res.status(200).json({msg: `${data.rows[0].username} your can now login`}).end();
        }
        else{
            throw "Not not create user";
        }
    }
    catch(err){
        next(err);
    }
})

router.post("/api/login", async (req, res, next) => {  
    const user  = req.body;

    const salt = auth_utils.createHash(user.password)
    try{

        const data = validateUser(user, salt);

        if (data === undefined){
            throw "Wrong username or password";
        }
    
        const userId = data.id;
        const username = data.username;
        const token = auth_utils.createToken(username, userId)
        
        res.status(200).json({'user': user, 'token': token}).end();
       
    }
    catch(err){
        next(err);
    }
})

async function validateUser(user, hash) {
    const data = await db.getUser(user.username);
    return data.rows.find(dbUser => {
        if(dbUser.username === user.username && dbUser.password  === user.password){
            return dbUser;
        }
    })


}


router.get("/api/allUsers", async (req, res, next) => {

    try{
        const data = await db.getAllUsers();
        res.status(200).json(data.rows).end();
    }
    catch(err){
        next(err);
    }

}) 

module.exports = router;
