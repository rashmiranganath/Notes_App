var express = require("express");
const bodyparser = require('body-parser')
var app = express();
app.use(bodyparser.json())
var api = require('./controller/routes')

app.use('/notes',api)

app.listen(3000, function (res, err) {
    if (!err) {
        console.log("server running")
    }
    else {
        throw err;
    }
})

