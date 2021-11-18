const express = require("express");
const router = express.Router();
const db = require('./db');
const auth_utils = require('./auth_utils');

router.get("/api/category", protect, async (req, res, next) => {

    try{
        const data = await db.getCategory();
        res.status(200).json(data.rows).end();
    }
    catch(err){
        next(err);
    }

    
}) 

router.post("/api/createCategory", async (req, res, next) => {
    const categoryName  = req.body;
    try{
        const data = await db.createCategory(categoryName.name);
        if(data.rows.length > 0){
            res.status(200).json({msg: `${data.rows[0].name} posted to table category`}).end();
        }
        else{
            throw "Could not post";
        }
    }
    catch(err){
        next(err);
    }
})

router.delete("/api/dropCategory/:id", async (req, res, next) => {
    const categoryId = req.params.id;
    try{
        const data = await db.delteCategory(categoryId);
        if(data.rows.length > 0){
            res.status(200).json({msg: `category ${data.rows[0].name} was deleted from category`}).end();
        }
        else{
            throw "Could not delete"; 
        }
    }
    catch(err){
        next(err);
    }
})

module.exports = router;
