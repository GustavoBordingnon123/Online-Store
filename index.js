//libraries used
const express = require('express');
const app = express();
const BodyParser = require('body-parser');
const Knex = require('knex');

//routes imports
const categories_controller = require('./controllers/Categories_Controller');
const books_controller = require('./controllers/Books_Controller');
const favoriteBooks_controller = require('./controllers/FavoriteBooks_Controller')
const user_controller = require('./controllers/Users_Controller')

//DataBase connection
const dataBase = require('./databases/DbConnection');

//Body-parser config
app.use(BodyParser.urlencoded({extended: false}));
app.use(BodyParser.json());

//routes: 
app.use('/',categories_controller);
app.use('/',books_controller);
app.use('/',favoriteBooks_controller);
app.use('/',user_controller);





app.listen(4000,() => {
    console.log("the market is on")
})