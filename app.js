const express = require("express");
const app = express();
const Datastore = require("nedb");
const fetch = require("node-fetch");
require("dotenv").config();



app.use(express.static("public"));
app.use(express.json({limit: "1mb"}));
app.listen(3000, () => {console.log('listening')});

const database = new Datastore('database.db');
database.loadDatabase();

app.get("/api", (Request, Response) => {
    database.find({}, (err, data) => {
        if (err){
            Response.end();
            return
        }
        Response.json(data);
    });
});

app.post("/api", (Request, Response) => {
    const data = Request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    Response.json(data);
});


app.get("/weather/:latlon", async (Request, Response) => {
    const latlon = Request.params.latlon.split(",")
    const lat = latlon[0];
    const lon = latlon[1];
    const api_key = process.env.API_KEY;
    const weather_url= `https://api.darksky.net/forecast/${api_key}/${lat},${lon}`;
    const weather_response = await fetch(weather_url);
    const weather_data = await weather_response.json();

    const aq_url= `https://api.openaq.org/v1/latest?coordinates=${lat},${lon}`;
    const aq_response = await fetch(aq_url);
    const aq_data = await aq_response.json();

    const data = {
        weather: weather_data,
        air_quality: aq_data
    }
    Response.json(data)
});

