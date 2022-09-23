//libraries used
const express = require('express');
const router = express();
const BodyParser = require('body-parser');
const Knex = require('knex');

//DataBase connection
const dataBase = require('../databases/DbConnection');

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