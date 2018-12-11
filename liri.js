const action = process.argv[2];
let data = process.argv.slice(3).join(' ');
const concertThis = function() {
    const request = require('request');
    const queryUrl = `https://rest.bandsintown.com/artists/${data}/events?app_id=codingbootcamp`
    request(queryUrl, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            const jsonObject=JSON.parse(body);
            for(i=0;i<jsonObject.length;i++){
                console.log(`${jsonObject[i].venue.name} in ${jsonObject[i].venue.city}, ${jsonObject[i].venue.region}`);
            }
        }
    });
}
const spotifyThis = function() {
    require('dotenv').config();
    const keys = require('./keys.js');
    const Spotify = require('node-spotify-api');
    const spotify = new Spotify(keys.spotify);
    if(!data){
        data = "What's My Age Again"
    }
    spotify.search({type: 'track', query: data }, function (err, body) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log("Artist: " + body.tracks.items[0].artists[0].name);
        console.log("Song Name: " + body.tracks.items[0].name);
        console.log("Preview link: " + body.tracks.items[0].preview_url);
        console.log("Album: " + body.tracks.items[0].album.name);
        });
}
const movieThis = function() {
    const request = require('request');
    if(!data){
        data = "Mr. Nobody";
    }
    const queryUrl = `http://www.omdbapi.com/?apikey=trilogy&t=${data}`
    request(queryUrl, function(error, response, body) {
        const jsonObject=JSON.parse(body);
        console.log("Title: " + jsonObject.Title);
        console.log("Year: " + jsonObject.Year);
        console.log("IMDB Rating: " + jsonObject.imdbRating);
        console.log("Rotten Tomatoes Rating: " + jsonObject.Ratings[1].Value);
        console.log("Country: " + jsonObject.Country);
        console.log("Language: " + jsonObject.Language);
        console.log("Plot: " + jsonObject.Plot);
        console.log("Actors: " + jsonObject.Actors);
    });
    }
const doThis = function() {
    const fs = require('fs');
    fs.readFile("./random.txt", "utf8", function (error, body) {
        const fileObject = body.split(',');
        data = fileObject[1].trim();
        spotifyThis();
    });
}
switch (action) {
    case 'concert-this':
      concertThis();
      break;
    
    case 'spotify-this-song':
      spotifyThis();
      break;
    
    case 'movie-this':
      movieThis();
      break;
    
    case 'do-what-it-says':
      doThis();
      break;
    }
    