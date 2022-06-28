require('dotenv').config();
const { response } = require("express");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {

  res.sendFile(__dirname + "/index.html");

})

app.post("/", function (req, res) {

  const query = req.body.cityName;
  const apiKey = process.env.API_KEY;
  const unit = "metric"


  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + " &appid=" + apiKey + "&units=" + unit;

  https.get(url, function (response) {
    // console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      // console.log(weatherData);

      const temp = weatherData.main.temp;
      // console.log(temp);
      const weatherDescription = weatherData.weather[0].description;
      const weatherIcon = weatherData.weather[0].icon;
      // console.log(weatherDescription);

      const imageURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
      res.write("<p>The weather is " + weatherDescription + "</p>");
      res.write("<h1>The Temperature in " + query + " is " + temp + " degrees Celsius</h1>");
      res.write("<img src=" + imageURL + ">");
      res.send();
    })
  })
})



app.listen(3000, function () {
  console.log("Server is running on port 3000.");
})