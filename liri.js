require("dotenv").config();


var keys = require("./keys.js");
var fs = require("fs");
var dotenv = require("dotenv");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var spotify = new Spotify(keys.spotify);
var moment = require('moment');
moment().format();

var userProcess = process.argv[2];
var userInput = process.argv[3];

switch (userProcess) {
    case 'concert-this':
        concertInfo(userInput);
        break;
    case 'spotify-this-song':
        songInfo(userInput);
        break;
    case 'movie-this':
        movieInfo(userInput);
        break;
    case 'do-what-it-says':
        info();
        break;
};

function concertInfo(userInput) {
    var queryUrl = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";
    axios.get(queryUrl).then(function (response) {
        for (var i = 0; i < 6; i++) {
            console.log("Event Info for " + userInput);
            console.log("Venue: " + response.data[i].venue.name);
            console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
            console.log("Event Date: " + moment(response.data[i].datetime, "MM/DD/YYYY"));
            console.log(response.data[i].datetime);
            console.log("-------------------------------------");
        }
    })
}

function songInfo(userInput) {
    if (!userInput) {
        userInput = "The Sign";
    }
    spotify.search({ type: 'track', query: userInput })
        .then(function (response) {
            for (var i = 0; i < 6; i++) {
                console.log("Artist(s): " + response.tracks.items[i].artists[0].name);
                console.log("Song Name: " + response.tracks.items[i].name);
                console.log("Album Name: " + response.tracks.items[i].album.name);
                console.log("Preview Link: " + response.tracks.items[i].preview_url);
                console.log("-------------------------------------");
            }
        })
}
function movieInfo(userInput) {
    if (!userInput) {
        userInput = "mr nobody";
    }
    axios.get("https://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy")
        .then(function (response) {
            console.log("Movie Title: " + response.data.Title);
            console.log("Year of Release: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country Produced: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors/Actresses: " + response.data.Actors);
        })
}

function info() {

    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        var output = data.split(",");
        console.log(output)
    })
}