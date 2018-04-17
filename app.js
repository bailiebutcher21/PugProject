const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
let app = express();

let allUsers = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('views',  path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/users/:userName', (req, res) => {
    res.end(`you clicked on: ${req.params.userName}`)
});

app.get('/', (req, res) => {
    res.render('CreateUser');
});
app.get('/userListing', (req, res) => {
    res.render('userListing');
});
// app.post("/createUserRoute", (req, res) => {
//     //Create a use using JSON object
//     //users.push(user);
//     //Save that user (push to array)
//     res.redirect('/userListing');
// });

app.post('/create', (req,res) => {
    let newUser = {
        userId: req.body.userId,
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
    };
    allUsers.push(newUser);
    console.log(allUsers);
    res.render('userListing',{users: allUsers})
});

app.post('deleteUser', (req,res) => {
    for(let i = 0; i < allUsers.length; i++){
        if(+req.params.id === allUsers[i].id){
            allUsers.splice(i, 1);
        }
    }
    res.render('users', {users:allUsers});
});

app.post('/edit', (req,res) => {
    let editUser ={
        userId: req.body.userId,
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
    };
    for(let i = 0; i < allUsers.length; i++){
        if(req.body.id === allUsers[i].id){
            allUsers[i] = editUser;
        }
    }
    res.render('editView', {editUser:editUser});

});

app.listen(3000);