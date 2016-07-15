/**
 * Created by andres.montoya on 14/07/2016.
 */
var Image = require("../models/images");
module.exports = function (req, res, next) {
    Image.findById(req.params.id, function (err, imagen) {
        if(imagen != null){
            //console.log("encontre la imagen"+imagen.title);
            res.locals.imagen = imagen;
            next();
        }
        else{
            res.redirect("/app")
        }
    })
}