/**
 * Created by andres.montoya on 5/07/2016.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var email_match = [/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Invalidate e-mail"];
var sex_values = ["M","F"];
var pass_validation = {
    validator: function (p) {
        return this.password_confirmation == p;
    },
    message: "The passwords are differents"
}
mongoose.connect("mongodb://localhost/photos");
//mongoose.connect("mongodb://andresmhkun@gmail.com:Amh123@ds019470.mlab.com:19470/science");

var user_schema = new Schema({
    name: String,
    last_name: String,
    username: {type:String, required:true, maxLength:[50,"Username too long"]},
    password: {type:String, minlength:[8, "pass too short"], validate: pass_validation},
    age: {type:Number, min:[5,"age less than 5"], max:[100, "age greater than 100"]},
    email: {type:String, required:"the mail is not optional", match: email_match},
    date_birth: Date,
    sex: {type:String, enum:{values: sex_values, message: "invalidate sex"}}
});

user_schema.virtual("password_confirmation").get(function () {
    return this.p_c;
}).set(function (password) {
    this.p_c = password;
});

var User = mongoose.model("User", user_schema);
module.exports.User = User;
