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

});

//acciones de un solo objeto
router.route("/images/:id")
    .get(function (req, res) {
       Image.findById(req.params.id, function (err, imagen) {
          res.render("app/images/show", {image: imagen});
       })

    })
    .put(function (req, res) {

    })
    .delete(function (req, res) {

    });
//acciones de una coleccion
router.route("/images")
    .get(function (req, res) {

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