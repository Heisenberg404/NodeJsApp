/**
 * Created by andres.montoya on 15/09/2016.
 */
var socket = io();

socket.on("new image", function (data) {
    data = JSON.parse(data);
    console.log(data);
});