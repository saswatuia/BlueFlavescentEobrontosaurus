const express = require('express');
const router = express.Router();
const authUtils = require('./auth_utils');
const db = require('./db');

router.post("/users/login", async (req, res, next) => {
    
    res.status(200).json("Hello from user / login post").end();
})

router.get("/users", async (req, res, next) => {
    try{
        const data = await db.getAllUsers();
        res.status(200).json(data.rows).end();
    }
    catch(err){
        next(err);
    }
})

router.post("/users", async (req, res, next) => {
    res.status(200).json('hello from users post').end();
})

router.delete("/users", async (req, res, next) => {
    res.status(200).json('hello from users delete').end();
})

module.exports = router;