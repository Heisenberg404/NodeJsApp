/**
 * Created by andres.montoya on 14/07/2016.
 */
var Image = require("../models/images");
var owner_check = require("./image_permission");

module.exports = function (req, res, next) {
    Image.findById(req.params.id).populate("creator").exec(function (err, imagen) {
        if(imagen != null && owner_check(imagen, req, res)){
            //console.log("encontre la imagen"+imagen.creator);
            res.locals.imagen = imagen;
            next();
        }
        else{
            res.redirect("/app")
        }ON UPDATE RESTRICT
        ON DELETE CASCADE
    } )
}