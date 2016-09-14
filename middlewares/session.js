/**
 * Created by andres.montoya on 11/07/2016.
 */
var User = require("../models/user").User;
module.exports = function (req, res, next) {
    if(!req.session.user_id){
        res.redirect("/login")
    }
    else {
        User.findById(req.session.user_id, function (err, user) {
            if(err){
                console.log(err);
                res.redirect("/login");
            }else{
                res.locals = {user: user};
                //con next se le dice que no afecte el flujo de la peticion.
				//prueba
				next();
                next();
            }
        });

    }
}