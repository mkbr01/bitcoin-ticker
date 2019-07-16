const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");


const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

// Call back function, + response sent back from server, setting up routes
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});





// Post requests
app.post("/", function(req, res) {

  var crypto = req.body.crypto;
  var fiat = req.body.fiat;


  var amount = req.body.amount;

  var options = {
    url: "https://apiv2.bitcoinaverage.com/convert/global",
    method: "GET",
    qs: {
      from: crypto,
      to: fiat,
      amount: amount
    }
  };



  request(options, function(error, response, body) {

    var data = JSON.parse(body); //parsing JSON to JS object
    var price = data.price;

    console.log(price);

    var currentDate = data.time;

    //writes to tempary storage
    res.write("<p>  The current date is " + currentDate + "</p>");
    res.write("<h1>" + amount + crypto + " is currently worth " + price + fiat + "</h1>");
    res.send();

  });
});





let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}



app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
