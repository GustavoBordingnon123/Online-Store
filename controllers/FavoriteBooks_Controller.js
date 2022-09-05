//libraries used
const express = require('express');
const router = express();
const BodyParser = require('body-parser');
const Knex = require('knex');

//DataBase connection
const dataBase = require('../databases/DbConnection');

//functions 
function isUndefined(x){
    if(x != undefined && x != ''){
        return 200;
    }else{
        return 400;
    }
}

function isLenghtRight(x){
    if(x.length > 3 && x.length < 20 ){   
        return 200;
    }else{
        return 411;
    }
}


function nameValidation(variable){

    firstValidation = isUndefined(variable)

    if(firstValidation == 200){

        secondValidation = isLenghtRight(variable)

        if(secondValidation == 200){
            return 200;

        }else{
            return secondValidation;
        }

    }else{
        return firstValidation;
    }
   
}

function numberValidation(variable){

   firstValidation = isUndefined(variable)

    if(firstValidation == 200){
        
        if(variable != isNaN){
           
            if(variable > 0 && variable < 1000){
                return 200;

            }else{
                return 400;
            }


        }else{
            return 400;
        }



    }else{
        return firstValidation;
    }
}

//Favorite book (update,read and delete)

router.put('/books/favorites',(req,res) => {
    let name = req.body.name;

    NewFavorite = {
        favorite: 1
    }

    dataBase.update(NewFavorite).into('book').where({name: name}).then(data => {      
        res.send("you suceffully added to the favorites the book: " + name);                   
    })   
});

router.get('/books/favorites',(req,res) => {

    dataBase.select().table('book').where({favorite:1}).then(books => {
        res.send(books)
    })
})

router.delete('/books/favorites',(req,res) => {
    let name = req.body.name;

    NewFavorite = {
        favorite: 0
    }

    dataBase.update(NewFavorite).into('book').where({name: name}).then(data => {      
        res.send("you suceffully deleted to the favorites the book: " + name);                   
    })   
});

module.exports = router;