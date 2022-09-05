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

//Books CRUD 
router.post('/books',(req,res) => {
    let {name,picture,price,description} = req.body;

    let NewBook = {
        name: name,
        picture: picture,
        price: price,
        description: description
    }

    let name_statusCode = nameValidation(name);
    let picture_statusCode = nameValidation(picture);
    let price_statusCode = numberValidation(price);   
    let description_statusCode = isUndefined(description);

    if(name_statusCode == 200){

        if(picture_statusCode == 200){

            if(price_statusCode == 200){

                if(description_statusCode == 200 && description.length > 10){

                    dataBase.select().table('book').where({name: name}).then(books => {

                        if(books == undefined || books == ""){

                            dataBase.insert(NewBook).into('book').then(data => {          
                                res.send("you suceffully added: " + name);                   
                            })    
                            
                        }else{
                            res.sendStatus(400);
                        } 

                    })

                }else{
                    res.sendStatus(400);
                }

            }else{
                res.sendStatus(price_statusCode);
            }
            
        }else{
            res.sendStatus(picture_statusCode);
        }

    }else{
        res.sendStatus(name_statusCode);
    }
})

router.get('/books',(req,res) => {
    res.statusCode = 200;
    dataBase.select().table('book').then(books => {
        res.send(books)
    })
})

router.put('/books',(req,res) => {

    let {name,picture,price,description} = req.body;

    let updateBook = {
        picture: picture,
        price: price,
        description: description
    }

    let picture_statusCode = nameValidation(picture);
    let price_statusCode = numberValidation(price);   
    let description_statusCode = isUndefined(description);

    if(picture_statusCode == 200){

        if(price_statusCode == 200){

            if(description_statusCode == 200 && description.length > 10){

                dataBase.select().table('book').where({name: name}).then(books => {
                        
                    if(books.length > 0){
                        
                        dataBase.update(updateBook).into('book').then(data => {          
                            res.send("you suceffully update: " + name);                   
                        })    
                            
                    }else{
                        res.sendStatus(400);
                    } 

                })

            }else{
                res.sendStatus(400);
            }

        }else{
            res.sendStatus(price_statusCode);
        }
            
    }else{
        res.sendStatus(picture_statusCode);
    }

});

router.delete('/books',(req,res) => {
    let name = req.body.name

    dataBase.select().table('book').where({name: name}).then(books => {

        if(books.length > 0 ){
            dataBase.delete().where({name:name}).table('book').then(data => {

                res.statusCode = 200;
                console.log('suceffuly delete the book: ', name);
                res.send(name);
                          
            }).catch(error => {
                console.log(error);
            })

        }else{
            console.log('this book dont exist')
            res.sendStatus(400);
        }
    })
})


module.exports = router;