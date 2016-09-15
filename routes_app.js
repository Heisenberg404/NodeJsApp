/**
 * Created by andres.montoya on 11/07/2016.
 */

var express = require("express");
var Image = require("./models/images");
var router = express.Router();
var fs = require("fs");
var redis = require("redis");
var client = redis.createClient();
var image_finder_middleware = require("./middlewares/find_image");

router.get("/", function (req, res) {
    Image.find({})
        .populate("creator")
        .exec(function (err, imagenes) {
            if (err) console.log(err);
            res.render("app/home", {imagenes : imagenes});
        })
});

/*REST*/
router.get("/images/new", function (req, res) {
   res.render("app/images/new");
});

router.all("/images/:id*", image_finder_middleware);

router.get("/images/:id/edit", function (req, res) {
    res.render("app/images/edit");
});


//acciones de un solo objeto
router.route("/images/:id")
    .get(function (req, res) {
        //client.publish("images", res.locals.imagen.toString());
        res.render("app/images/show");

    })
    .put(function (req, res) {
        res.locals.imagen.title = req.body.title;
        res.locals.imagen.save(function (err) {
            if(!err){
                res.render("app/images/show");
            }else{
                res.render("app/images/"+req.params.id+"/edit");
            }
        })
    })
    .delete(function (req, res) {
        Image.findOneAndRemove({_id: req.params.id}, function (err) {
            if(!err){
                res.redirect("/app/images");
            }else{
                console.log(err);
                res.redirect("/app/images"+req.params.id)
            }
        });
    });

//acciones de una coleccion
router.route("/images")
    .get(function (req, res) {
        //Image.find({creator: res.locals.user._id}, function (err, imagenes) {
        Image.find({}, function (err, imagenes) {
            if(err){
                res.redirect("/app");
                return;
            }
    res.render("app/images/index", {imagenes: imagenes});
    });
})
.post(function (req, res) {
    console.log(req.body.file);
    var extension = req.body.file.name.split(".").pop();
    var data = {
        title: req.body.title,
        creator: res.locals.user._id,
        extension: extension
    }

    var imagen = new Image(data);
    imagen.save(function (err) {
        if(!err){
            var imgJSON = {
                "id" : imagen._id,
                "tittle" : imagen.title,
                "extension" : imagen.extension

            };

            client.publish("images", JSON.stringify(imgJSON));
            fs.rename(req.body.file.path, "public/images/"+imagen._id+"."+extension);
            res.redirect("/app/images/"+imagen._id)

        }
        else{
            console.log(imagen);
            res.render(err);
        }
    })
});
module.exports = router;