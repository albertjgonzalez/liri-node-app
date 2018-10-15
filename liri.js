require("dotenv").config();

//spotify API
var keys = require("./keys");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var searchSpotify = function (track) {

    spotify.search({ type: 'track', query: track, limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log('----------------------------------------------------------------------------')
        console.log('              Artist: ' + data.tracks.items[0].album.artists[0].name);
        console.log('----------------------------------------------------------------------------')
        console.log('              Title: ' + data.tracks.items[0].name);
        console.log('----------------------------------------------------------------------------')
        console.log('              Link: ' + data.tracks.items[0].href);
        console.log('----------------------------------------------------------------------------')
        console.log('              Album: ' + data.tracks.items[0].album.name);
        console.log('----------------------------------------------------------------------------')

    });

}

//Bands In Town API
var request = require('request');
/*var searchBandsInTown = function(band){

}*/

//OMDB API
var searchOmdb = function (movie) {
    var queryURL = "http://www.omdbapi.com/?t=" + movie + "&plot=short&apikey=trilogy";
 
    request(queryURL, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        console.log('----------------------------------------------------------------------------')
        console.log('              Title: ' + body.Title);
        console.log('----------------------------------------------------------------------------')
        console.log('              Year: ' + body.Year);
        console.log('----------------------------------------------------------------------------')
        console.log('              IMDB Rating: ' + body.Ratings[0].Value);
        console.log('----------------------------------------------------------------------------')
        console.log('              Rotten Tomatoes Rating: ' + body.Ratings[1].Value);
        console.log('----------------------------------------------------------------------------')
        console.log('              Country: ' + body.Country);
        console.log('----------------------------------------------------------------------------')
        console.log('              Language: ' + body.Language);
        console.log('----------------------------------------------------------------------------')
        console.log('              Plot: ' + body.Plot);
        console.log('----------------------------------------------------------------------------')
        console.log('              Actors: ' + body.Actors);
        console.log('----------------------------------------------------------------------------')


      });
}
//API Calls Switch
var command = process.argv[2];
var searchFor = process.argv[3];

switch (command) {
    case 'spotify-this-song':
        searchSpotify(searchFor)
        break;
    case 'concert-this':
        day = "Monday";
        break;
    case 'movie-this':
        searchOmdb(searchFor)
        break;
};