// require('dotenv').config();
const action = process.argv[2];
const data = process.argv.slice(3).join(' ');
const request = require('request');
const concertThis = function() {
    // console.log(data)
    const queryUrl = `https://rest.bandsintown.com/artists/${data}/events?app_id=codingbootcamp`
    // console.log(queryUrl);
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
    console.log(data)
}
const movieThis = function() {
    console.log(data)
}
const doThis = function() {
    console.log(data)
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
    