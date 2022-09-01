//libraries used
const express = require('express');
const app = express();
const BodyParser = require('body-parser');
const Knex = require('knex');

//DataBase connection
const dataBase = require('./databases/DbConnection');

//Body-parser config
app.use(BodyParser.urlencoded({extended: false}));
app.use(BodyParser.json());


//routes
app.get('/categories',(req,res) => {
    res.statusCode = 200;
    dataBase.select().table('category').then(categories => {
        res.send(categories)
    })
})

//functions 
function validation(category){

    if(category != undefined && category != ''){
        if(category.length > 3 && category.length < 20 ){   

            dataBase.select().table('category').where({type: category}).then(categories => {

                if(categories == undefined || categories == ""){

                    dataBase.insert(NewCategory).into('category').then(data => {          
                        return statusCode = 200;                  
                    })
                }else{
                    return statusCode = 400;
                }


            })

        }else{
            return statusCode = 411;
        }
    }else {
        return statusCode = 400;
    }

}



/*app.post('/categories',(req,res) => {
    let category = req.body.category
    
    let NewCategory = {
        type: category
    }

    if(category != undefined && category != ''){
        if(category.length > 3 && category.length < 20 ){   

            dataBase.select().table('category').where({type: category}).then(categories => {

                if(categories == undefined || categories == ""){

                    dataBase.insert(NewCategory).into('category').then(data => {          
                        res.statusCode = 200;
                        console.log('sucefully added the category: ', category); 
                        res.send(category);                   
                    })
                }else{
                    console.log('error this category alredy exists'); 
                    res.sendStatus(400);
                }


            })

        }else{
            res.sendStatus(411);
        }
    }else {
        res.sendStatus(400);
    }

});*/

app.post('/categories',(req,res) => {
    let category = req.body.category
    
    let NewCategory = {
        type: category
    }

    if(validation(category) = 200){
        
    }

});



app.delete('/categories',(req,res) => {
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


app.put('/categories',(req,res) => {
    let category = req.body.category
})


app.listen(4000,() => {
    console.log("the market is on")
})