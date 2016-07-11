/**
 * Created by andres.montoya on 11/07/2016.
 */

var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
   res.render("app/home")
});

/*REST*/
router.get("/images/new", function (req, res) {

});
router.get("/images/:id/edit", function (req, res) {

});

//acciones de un solo objeto
router.route("/images/:id")
    .get(function (req, res) {

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

    });
module.exports = router;