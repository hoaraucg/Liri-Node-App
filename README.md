# Liri, A Javascript Application made for Node
---

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a *Language* Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

---

### Languages
---

Liri is coded in Javascript and makes use of Node.js for CLI interaction. 

### Required Packages
---

* Node-Spotify-API - Used to assist the user in searching Spotify's API for songs.
* Axios - Used for it's methods in retrieving data from both OMDB and BandsinTown API's.
* DotENV - Environment file used to securely save API Key data locally.
* fs - NPM Package allowing for file system access.
* Moment - Momentjs NPM Package that allows for adjusting Date/Time values to global standards.
  
    * After cloning this repository, type *npm install* to install the packages locally so that they may be used.
    
### How to use this Application
---

***As a user, you must provide your own Spotify API Key in order to successfully make use of Liri.
After installing all of the NPM Packages above, create a .env file with your spotify API key and Secret to fully make use of this application***

Liri takes in two inputs from the user in the node command line. The first is the proces you are interested in using, followed by your particular search term. 

* **concert-this "Band Name"** - Will scour the BandsinTown API for your bands next 5 touring shows. Will return nothing if they do not have any shows actively coming.
  
    ![BandsImage](/assets/images/concert.png)
  
* **spotify-this-song "Song Name"** - Will attempt to find your particular song choice through the Node Spotify API. Will return 5 closest matches. If song is available on multiple albums, this will also offer you Album Choice. If no song choice is input, this will return results for the song "The Sign", By Ace of Base.
  
    ![SpotifyImage](/assets/images/spotify.png)
  
* **movie-this "Movie Title"** - Searches through the OMDB API for closest match. Will return useful info about your movie. If no Movie is selected, this will automatically conduct a search for "Mr. Nobody". It's a great movie, you should really watch it if you haven't.
  
    ![MovieImage](/assets/images/movie.png)
    
* **do-what-it-says** - This requires no secondary user input. It will scour the random.txt file, and use the Process and Input from that file to complete one of the three previous commands. Currently set to spotify-this-song "I want it that way".

    ![doitImage](/assets/images/doit.png)

### Logging
---

Liri will also log all of your searches to the log.txt file located in the repository. Never worry about having to re-search for any of your favorites, they'll always be saved!

## Copyright
---
This application was developed by Christopher Hoarau in June of 2019 at UCF during the Full Stack Coding Boot Camp.
---
Copyright(c) Christopher Hoarau 2019

