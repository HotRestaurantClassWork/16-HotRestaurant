var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var reservations = [{
    routeName: "test",
    name: "Test",
    uniqueId: "Test",
    email: "placeholdertest@gmail.com",
    phoneNumber: 10101101010,
}];
var waitingList = [{
    routeName: "test2",
    name: "Test2",
    uniqueId: "Test2",
    email: "placeholdertest2@gmail.com",
    phoneNumber: 10101101012,
    wait:true
}]
//add and/

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/add", function (req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});
app.get("/api/:reservations?", function (req, res) {
    var chosen = req.params.reservations;
    if (chosen) {
        console.log(chosen);
        for (var i = 0; i < reservations.length; i++) {
            if (chosen === reservations[i].routeName) {
                return res.json(reservations[i]);
            }
        }
        for (var i = 0; i < waitingList.length; i++) {
            if (chosen === waitingList[i].routeName) {
                return res.json(waitingList[i]);
            }
        }
        return res.json(false);
    }
    return res.json(characters);
});
app.post("/api/new", function (req, res) {
    var newreservation = req.body;
    // Using a RegEx Pattern to remove spaces from newreservation
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newreservation.routeName = newreservation.name.replace(/\s+/g, "").toLowerCase();
    console.log(newreservation);
    if (reservations.length >= 5) {
        waitingList.push(newreservation);
    }
    else {
        newreservation.wait=true;
        reservations.push(newreservation);
    }
    res.json(newreservation);
});