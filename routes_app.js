/**
 * Created by andres.montoya on 11/07/2016.
 */

var express = require("express");
var Image = require("./models/images");
var router = express.Router();

router.get("/", function (req, res) {
   res.render("app/home")
});

/*REST*/
router.get("/images/new", function (req, res) {
   res.render("app/images/new");
});
router.get("/images/:id/edit", function (req, res) {
    Image.findById(req.params.id, function (err, imagen) {
        res.render("app/images/edit", {imagen: imagen})
    })
});

//acciones de un solo objeto
router.route("/images/:id")
    .get(function (req, res) {
       Image.findById(req.params.id, function (err, imagen) {
          res.render("app/images/show", {imagen: imagen});
       })

    })
    .put(function (req, res) {
        Image.findById(req.params.id, function (err, imagen) {
            imagen.title = req.body.title;
            imagen.save(function (err) {
                if(!err){
                    res.render("app/images/show", {imagen: imagen});
                }else{
                    res.render("app/images/"+imagen.id+"/edit", {imagen: imagen});
                }
            })

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
        Image.find({}, function (err, imagenes) {
            if(err){
                res.redirect("/app");
                return;
            }
            res.render("app/images/index", {imagenes: imagenes});
        });
    })
    .post(function (req, res) {
      var data = {
         title: req.body.title
      };

      var imagen = new Image(data);
      imagen.save(function (err) {
         if(!err){
            res.redirect("/app/images/"+imagen._id)
         }
         else{
            res.render(err);
         }
      })
    });
module.exports = router;