/**
 * Created by andres.montoya on 11/07/2016.
 */

var express = required("express");
var router = express.Router();

router.get("/", function (req, res) {
   res.render("app/home")
});

module.exports = router;