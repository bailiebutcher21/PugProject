const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userid: String,
    name: String,
    email: String,
    age: Number,

});

const User = mongoose.model("User", userSchema);
const url = 'mongodb://localhost:27017/bailie';

MongoClient.connect(url, function(err, db){
    if (err) throw err;
    const dbo = db.db('myproject');

    dbo.createCollection("users", function (err, res) {
        if (err) throw err;
        console.log("Collection Created");
        db.close();
    });
});

let allUsers = [
    {userId: '01', name: 'Bailie Butcher', email: "Bailiebutcher@gmail.com", age:21},
    {userId: '02', name: 'Hailey Fisher', email: "Hailey@gmail.com", age:22},
    {userId: '03', name: 'Courtney Workman', email: "Courtney@gmail.com", age:24},
    {userId: '04', name: 'Mckayla Butcher', email: "Mckayla@gmail.com", age:55},
    {userId: '05', name: 'Carolyn Lopez', email: "Carolyn@gmail.com", age:33},
    {userId: '06', name: 'Johnny Smith', email: "Johnny@gmail.com", age:54},
    {userId: '07', name: 'Kaylee Butcher', email: "Kaylee@gmail.com", age:74},
    {userId: '08', name: 'Jennifer Smith', email: "Jennifer@gmail.com", age:24},
    {userId: '09', name: 'Bobby Knoxville', email: "Bobby@gmail.com", age:53},
    {userId: '10', name: 'Ashlee Martinez', email: "ash@gmail.com", age:24}
];
let user;

app.use(express.static('public'));
app.set ('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) => {
    res.render('CreateUser');
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
    res.render('userListing', {users:allUsers});
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

// userData.save(function(error){
//     console.log("User has been saved.");
//     if(error){
//         console.log(error)
//     }
// });
app.post('delete', (req, res, next) => {

});

//User App Code

app.set('views',  path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/users/:userName', (req, res) => {
    // let resultArray = [];
    // mongo.connect(url, function(err, db){
    //     assert.equals (null, err);
    //     let cursor = db.collection ('myproject').find();
    //     cursor.forEach(function (doc, err) {
    //         assert.equals(null, err);
    //         resultArray.push(doc);
    //     }, function(){
    //         db.close();
    //         res.render('index', {items: resultArray});
    //     })
    // });
    userData.find()
        .then(function(doc){
            res.render('index', {items: doc});
        });
    res.end(`you clicked on: ${req.params.userName}`)
});

app.get('/userListing', (req, res) => {
    res.render('userListing');
});


app.get('/edit/:userId', (req, res) => {
    let userInfo;
    for(let i = 0; i < allUsers.length; i++){
        if(req.params.userId === allUsers[i].userId){
            userInfo = allUsers[i];
            res.render('editView', {user: userInfo});
        }
    }
});



app.listen(3000);