/**
 * Created by andres.montoya on 16/08/2016.
 */
var Imagen = require("../models/images");

module.exports = function (image, req, res) {


    //TRUE = tienes permisos
    //False = NO TIENES PERMISOS

    if(req.method === "GET" && req.path.indexOf("edit") < 0){
        return true;
    }

    if(typeof image.creator == "undefined") return false;

    if(image.creator._id.toString() == res.locals.user._id){
        //la imagen pertenece al usuarion actual
        return true;
    }
    return false;

}