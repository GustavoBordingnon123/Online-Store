//libraries used
const express = require('express');
const router = express();
const BodyParser = require('body-parser');
const Knex = require('knex');
const bcrypt = require('bcryptjs');

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

function emailValidation(email) {
    const re = /\S+@\S+\.\S+/;

    if(re.test(email)){
        return 200;
    }else{
        return 400;
    }
}

function passwordValidation(password){
    
    const lowerWords = /[a-z]/; 
    const upperWords = /[A-Z]/;
    const numbers = /[0-9]/;
    const especialCaracther = /[!|@|#|$|%|^|&|*|(|)|-|_]/

    if(nameValidation(password) == 200){

        if(lowerWords.test(password)){
       
            if(upperWords.test(password)){
                
                if(numbers.test(password)){
    
                    if(especialCaracther.test(password)){
                        return 200;
                    }else{
                        return 400;
                    }
    
                }else{
                    return 400
                }
    
            }else{
                return 400
            }
    
        }else{
            return 400
        }
    
    }else{
        return password_statusCode;
    }
}


//Users Crud

router.post('/users',(req,res) => {
    let{name,email,password} = req.body;

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);

    let NewUser = {
        name: name,
        email: email,
        password: hash
    }

    //let name_statusCode = nameValidation(name);
    //let email_statusCode = nameValidation(email);
    //let password_statusCode = passwordValidation(password);

    if(nameValidation(name) == 200){

        if(nameValidation(email) == 200 && emailValidation(email) == 200 ){

            if(passwordValidation(password) == 200){

                dataBase.select().table('user').where({email: email}).then(emails => {

                    if(emails == undefined || emails == ""){

                        dataBase.insert(NewUser).into('user').then(data => {          
                            res.send("you suceffully added: " + email);                   
                        })    
                        
                    }else{
                        console.log("insert password error")
                        res.sendStatus(400);
                    } 

                })


            }else{
                console.log("format password error")
                res.sendStatus(400);
            }

        }else{
            console.log("format email error")
            res.sendStatus(400);
        }


    }else{
        console.log("format name error")
        res.sendStatus(400);
    }

});

router.get('/users',(req,res) => {

    dataBase.select().table('user').then(users => {
        res.send(users);
    })
})

router.put('/users',(req,res) => {
    let{name,email,password,newEmail} = req.body;

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);

    let updateUser = {
        name: name,
        email: newEmail,
        password: hash
    }

    //let name_statusCode = nameValidation(name);
    //let email_statusCode = nameValidation(email);
    //let password_statusCode = passwordValidation(password);

    if(nameValidation(name) == 200){

        if(nameValidation(email) == 200 && emailValidation(email) == 200 ){

            if(passwordValidation(password) == 200){

                dataBase.select().table('user').where({email: email}).then(emails => {

                    if(emails.length > 0){
        
                        dataBase.update(updateUser).into('user').then(data => {          
                            res.send("you suceffully update: " + email);                   
                        })    
                            
                    }else{
                        res.sendStatus(400);
                    } 

                })


            }else{
                console.log("format password error")
                res.sendStatus(400);
            }

        }else{
            console.log("format email error")
            res.sendStatus(400);
        }


    }else{
        console.log("format name error")
        res.sendStatus(400);
    }
});

router.delete('/users',(req,res) => {
    let email = req.body.email;

    dataBase.select().table('user').where({email: email}).then(users => {

        if(users.length > 0 ){
            dataBase.delete().where({email: email}).table('user').then(data => {
        
                res.statusCode = 200;
                console.log('suceffuly delete the user: ', email);
                res.send(email);
                          
            }).catch(error => {
                console.log(error);
            })

        }else{
            console.log('this user dont exist')
            res.sendStatus(400);
        }
    })
})



module.exports = router;