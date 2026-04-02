//create a express server

//package.json ==> type = module ==> import
//package.json ==> type = commonjs ==> const , require

const express = require("express");
const path = require("path");

const app = express();

//Middleware => Middleware was run before route , call before function
//usecase : Authentication , Authorization , Validation ,Error handling
//user req ---->  server 
//(server req)server res ----> user 
//with middleware : 
// user req --> middleware(server) ---> server route
app.use(function(req, res, next){
    console.log("Middleware is running🏃‍♂️🏃‍♂️!");
   next(); //call next function
});


app.get("/", function(req, res){
    res.send("Welcome to my homepage Express 😂");
});

app.get("/profile", function(req, res){
    res.send("Show profile page Express 😂");
});

app.get("/login", function(req, res){
    const dirpath = path.resolve();
    const filepath =path.join (dirpath ,'Pages' , 'login.html');
    res.sendFile(filepath);
    // res.send("Login page Express 🤑");
});

//error handling :
//last listed route . always all routes  because it will catch all the errors that are not handled by the previous routes
app.use(function(req, res){
    res.status(404).send("404 Not Found Express 😢");
    res.status(500).send("500 Internal Server Error Express 😢");
})


app.get("/signUp", function(req, res){
    res.send("SignUp page Express 🤑");
});

app.listen(3000, () => {
    console.log("👌👌👌 Server is running on port 3000");
});