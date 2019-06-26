// Setting up DOTENV
require("dotenv").config();

// Requiring all necessary .js files and NPM Apps
var keys = require("./keys.js");
var fs = require("fs");
var dotenv = require("dotenv");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require('moment');
moment().format();

// Setting Spotify keys used with DOTENV
var spotify = new Spotify(keys.spotify);

// Divider used to just clean up search results
var divider = "-------------------------------------"

// Setting variables for CLI arguments
var userProcess = process.argv[2];
var userInput = process.argv[3];

// Switch statement to load function based on user's inputs
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

// Function that searchs bands in town API for User's Band Input
function concertInfo(userInput) {
    var queryUrl = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";
    
    // Axios Call to bring in concert information
    axios.get(queryUrl).then(function (response) {

        // For loop to bring in the 5 closest concerts
        for (var i = 0; i < 6; i++) {

            // Array to organize data
            var concertData = [
            "Event Info for " + response.data[i].lineup[0],
            "Venue: " + response.data[i].venue.name,
            "Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country,
            "Event Date: " + moment(response.data[i].datetime).format('MMMM Do YYYY'),
            ].join("\n");

            // Logging data to Console
            console.log(concertData + "\n" + divider);

            // Appending data to the log.txt file
            fs.appendFile("log.txt", concertData + divider, function(err) {
                if (err) throw err;
              });

        }
    })
}

// Function to search the Node Spotify API for the user's song Input
function songInfo(userInput) {
    if (!userInput) {
        userInput = "The Sign";
    }
    // Node Spotify call to return track information
    spotify.search({ type: 'track', query: userInput })
        .then(function (response) {

            // For loop to bring in the 5 closest responses
            for (var i = 0; i < 6; i++) {

                // Array to organize data
                var songData = [
                "Artist(s): " + response.tracks.items[i].artists[0].name,
                "Song Name: " + response.tracks.items[i].name,
                "Album Name: " + response.tracks.items[i].album.name,
                "Preview Link: " + response.tracks.items[i].preview_url
                ].join("\n");

                // Log the data to the console
                console.log(songData + "\n" + divider);

                // Append the retrieved data to log.txt
                fs.appendFile("log.txt", songData + divider, function(err) {
                    if (err) throw err;
                  });
            }
        })
}

// Function that searchs OMDB API for User's movie Input
function movieInfo(userInput) {
    if (!userInput) {
        userInput = "mr nobody";
    }

    // Axios call to get the movie Data
    axios.get("https://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy")
        .then(function (response) {

            // Array to organize data
            var movieData = [
            "Movie Title: " + response.data.Title,
            "Year of Release: " + response.data.Year,
            "IMDB Rating: " + response.data.imdbRating,
            "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value,
            "Country Produced: " + response.data.Country,
            "Language: " + response.data.Language,
            "Plot: " + response.data.Plot,
            "Actors/Actresses: " + response.data.Actors
        ].join("\n");

        // Console logging movie result
        console.log(movieData + "\n" + divider);

        // Appending the results to log.txt
        fs.appendFile("log.txt", movieData + divider, function(err) {
            if (err) throw err;
          });
        })
}

// Function to run when user says do-what-it-says
function info() {

    // Reads the random.txt file
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }

        // Splitting the resulting read into an array
        var output = data.split(",");
        console.log(output);
        // Setting the Process and Input to the array's values
        var userProcess = output[0];
        var userInput = output[1];

        // Switch statement allowing this function to know which function to perform after it reads the random.txt file
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
    })
}