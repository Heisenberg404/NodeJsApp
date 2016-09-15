/**
 * Created by andres.montoya on 4/07/2016.
 */

var express = require("express");
var bodyParser = require("body-parser");
var User = require("./models/user").User;
//var session = require("express-session");
//var cookieSession = require("cookie-session");
var session = require("express-session");
var router_app = require("./routes_app");
var session_middleware = require("./middlewares/session");
var formidable = require("express-formidable");
var RedisStore = require("connect-redis")(session);

var http = require("http");
var realtime = require("./realtime");
var methodOverride = require("method-override");

var app = express();
var server = http.Server(app);

var sessionMiddleware = session({
    store: new RedisStore({}),
    secret: "super ultra secret word"
});

realtime(server, sessionMiddleware);

app.use("/public", express.static('public'));
app.use(bodyParser.json());     //usado para peticiones applications/json
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

/*app.use(session({
    secret: "123kdlkfhbsdfbsdv3",
    resave: false,
    saveUninitialized: false
}));*/

app.use(sessionMiddleware);
//, uploadDir:"images" para guardarla en una carpeta
app.use(formidable.parse({keepExtensions: true}));


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
        if (user === null) {
            res.redirect("/login");
        } else {
            req.session.user_id = user._id;
            res.redirect("/app");
        }


    });
});
//todas las peticiones que vayan a /app usan el session_middleware
app.use("/app", session_middleware);
app.use("/app", router_app);
server.listen(8080);