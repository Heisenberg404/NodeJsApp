/**
 * Created by andres.montoya on 11/07/2016.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var img_schema = new Schema({
   title:{type:String, required:true},
   creator: {type: Schema.Types.ObjectId, ref: "User"},
   extension: {type: String, require:true}
});

var Image = mongoose.model("Image", img_schema);
module.exports = Image;