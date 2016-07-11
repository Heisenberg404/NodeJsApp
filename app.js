/**
 * Created by andres.montoya on 4/07/2016.
 */

var express = require("express");
var bodyParser = require("body-parser");
var User = require("./models/users").User;
var session = require("express-session");
var router_app = require("./routes_app");
var session_middleware = require("./middlewares/session");
var app = express();



app.use("/public", express.static('public'));
app.use(bodyParser.json());     //usado para peticiones applications/json
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: "123kdlkfhbsdfbsdv3",
    resave: false,
    saveUninitialized: false
}));

app.set("view engine","jade");

app.get("/", function (req, res) {
    console.log(req.session.user_id);
    res.render("index");
});


app.get("/signup", function (req, res) {
    User.find(function (err, doc) {
        console.log(doc);
        res.render("signup");
    });
    
    

});

app.get("/login", function (req, res) {
        res.render("login");

});

app.post("/users", function (req, res) {
    //console.log("password " + req.body.password);
    //console.log("email " + req.body.email);
    var user = new User({email: req.body.email, password: req.body.password, password_confirmation: req.body.password_confirmation, username: req.body.username});
    // print by console the virtual attrib
    //console.log(user.password_confirmation);

    //function (err) es un callback, se ejecutara una vez se intente guardar en la base de datos.

    /*user.save(function (err) {
    if(err)
    {
        console.log(err);
    }
        res.send("data saved");
    });*/
    ///save using promises from ECMAScript 6
    user.save().then(function (us) {
        res.send("Data Saved");
    }, function (err) {
        if(err){
            console.log(String(err));
            res.send("not Saved");
        }

    });
});

app.post("/sessions", function (req, res) {
    User.findOne({email:req.body.email, password:req.body.password}, function (err, user) {
        req.session.user_id = user._id;
        res.send("Hello world");
    });
});
app.use("/app", session_middleware);
app.use("/app", router_app);
app.listen(8080);