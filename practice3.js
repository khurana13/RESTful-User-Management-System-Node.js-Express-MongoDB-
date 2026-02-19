const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/user');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render("indexa");   
});

app.get('/read', async function(req, res){
    let users = await userModel.find()
    res.render("read", {users});  
});

app.post('/create',async function(req, res){
    let {name, email, image} = req.body;
    let createdUser = await userModel.create({
        name, //instead of name:name
        email,
        image
    })
    res.redirect('/read');
});

app.get('/delete/:id', async function(req, res){
    let users= await userModel.findOneAndDelete({_id: req.params.id});
    res.redirect('/read');
});

app.get('/edit/:id', async function(req, res){
    let user = await userModel.findOne({_id: req.params.id});
    res.render("edit", { user });
});

app.post('/update/:userid', async function(req, res){
    let {name, email, image} = req.body; 
    let user = await userModel.findOneAndUpdate({_id: req.params.userid}, {image, name, email}, {returnDocument: 'after'}); // instead of new:true use returnDocument: 'after' to get the updated document
    res.redirect("/read");
});

app.listen(3000);
