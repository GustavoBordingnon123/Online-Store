//libraries used
const express = require('express');
const router = express();
const BodyParser = require('body-parser');
const Knex = require('knex');
const bcrypt = require('bcryptjs');

//DataBase connection
const dataBase = require('../databases/DbConnection');

//functions 
const Functions = require('../functions/functions');


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

    let name_statusCode = Functions.nameValidation(name);
    let email_statusCode = Functions.nameValidation(email);
    let password_statusCode = Functions.passwordValidation(password);

    if(name_statusCode == 200){

        if(email_statusCode == 200 && Functions.emailValidation(email) == 200 ){

            if(password_statusCode == 200){

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
                res.sendStatus(password_statusCode);
            }

        }else{
            console.log("format email error")
            res.sendStatus(400);
        }


    }else{
        console.log("format name error")
        res.sendStatus(name_statusCode);
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

    let name_statusCode = Functions.nameValidation(name);
    let email_statusCode = Functions.nameValidation(newEmail);
    let password_statusCode = Functions.passwordValidation(password);

    if(name_statusCode == 200){

        if(email_statusCode == 200 && Functions.emailValidation(newEmail) == 200 ){

            if(password_statusCode == 200){

                dataBase.select().table('user').where({email: email}).then(emails => {

                    if(emails.length > 0){
        
                        dataBase.update(updateUser).into('user').where({email: email}).then(data => {          
                            res.send("you suceffully update: " + email);                   
                        })    
                            
                    }else{
                        res.sendStatus(400);
                    } 

                })


            }else{
                console.log("format password error")
                res.sendStatus(password_statusCode);
            }

        }else{
            console.log("format email error")
            res.sendStatus(400);
        }


    }else{
        console.log("format name error")
        res.sendStatus(name_statusCode);
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