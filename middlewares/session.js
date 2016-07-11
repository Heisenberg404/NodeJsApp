/**
 * Created by andres.montoya on 11/07/2016.
 */
module.exports = function (req, res, next) {
    if(!req.session.user_id){
        res.redirect("/login")
    }
    else {
        //con next se le dice que no afecte el flujo de la peticion.
        next();
    }
}