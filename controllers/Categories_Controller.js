//libraries used
const express = require('express');
const router = express();
const BodyParser = require('body-parser');
const Knex = require('knex');

//DataBase connection
const dataBase = require('../databases/DbConnection');

//functions 
const Functions = require('../functions/functions');

//Categories CRUD
router.post('/categories',(req,res) => {

    let category = req.body.category
    
    let NewCategory = {
        type: category
    }

    let statusCode = Functions.nameValidation(category)

    dataBase.select().table('category').where({type: category}).then(categories => {

        if(categories == undefined || categories == ""){

            if(statusCode == 200){

                dataBase.insert(NewCategory).into('category').then(data => {          
                    console.log('sucefully added the category: ', category); 
                    res.send(category);                   
                })
        
            }else{
                res.sendStatus(statusCode)
            }        

        }else{
            res.sendStatus(400);
        }
        
    })

});

router.get('/categories',(req,res) => {
    res.statusCode = 200;
    dataBase.select().table('category').then(categories => {
        res.send(categories)
    })
})

router.put('/categories',(req,res) => {
    let category = req.body.category
    let updateCategory = req.body.updateCategory

    let NewCategory = {
        type: updateCategory
    }

    let statusCode = Functions.nameValidation(category)

    
    dataBase.select().table('category').where({type:category}).then(categories => {

        if(categories.length > 0){

            if(statusCode == 200){

                dataBase.update(NewCategory).into('category').where({type:category}).then(data => {  
                    console.log("suceffuly update the: ", updateCategory)        
                    res.send(updateCategory);                   
                })
        
            }else{
                res.sendStatus(statusCode)
            }        

        }else{
            res.sendStatus(400);
        }
        
    })

    

})

router.delete('/categories',(req,res) => {
    let category = req.body.category

    dataBase.select().table('category').where({type: category}).then(categories => {

        if(categories.length > 0 ){

            dataBase.delete().where({type: category}).table('category').then(data => {
                res.statusCode = 200;
                console.log('suceffuly delete the category: ', category);
                res.send(category);
                          
            }).catch(error => {
                console.log(error);
            })

        }else{
            console.log('this category dont exist')
            res.sendStatus(400);
        }
    })
})

module.exports = router;