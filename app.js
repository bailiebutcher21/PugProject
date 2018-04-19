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

app.get('/editView/:userId', (req, res) => {
    let userInfo;
    for(let i = 0; i < allUsers.length; i++){
        if(req.params.userId === allUsers[i].userId){
            userInfo = allUsers[i];
            res.render('/editView', {user: userInfo});
        }
    }
});

app.post('/editView', (req, res) => {
    let userEdit = {
        userId: req.body.userId,
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        id: req.body.id
    };
    for(let i = 0; i < allUsers.length; i++){
        if(req.body.userId === allUsers[i].userId){
            allUsers[i] = userEdit;
        }
    }
    res.render('/userListing', {users:allUsers});
});


app.get('/deletePost/:userId', (req,res) => {
    console.log('delete user');
    for(let i = 0; i < allUsers.length; i++){
        if(req.params.userId === allUsers[i].userId){
            allUsers.splice(i, 1);
        }
    }
    res.render('userListing', {users:allUsers});
});

app.listen(3000);