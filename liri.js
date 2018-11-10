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
var moment = require('moment');
var searchBandsInTown = function (artist) {
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    request(queryURL, function (error, response, body) {
        var obj = JSON.parse(body);
        for (var i = 0; obj[i]; i++) {
           
                var time = (JSON.stringify(obj[i].datetime)).replace(/['"]+/g, '');
                console.log('----------------------------------------------------------------------------')
                console.log('              Venue: ' + JSON.stringify(obj[i].venue.name).replace(/['"]+/g, ''));
                console.log('              City: ' + JSON.stringify(obj[i].venue.city).replace(/['"]+/g, ''));
                //console.log('              Link: ' + JSON.stringify(obj[i].url).replace(/['"]+/g, ''));
                console.log('              Time: ' + moment(time).format('L'));
        }
        console.log('----------------------------------------------------------------------------')
    });
}

//OMDB API
var searchOmdb = function (movie) {
    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&plot=short&apikey=trilogy";

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

//Do what it says
var fs = require('file-system');
var random = fs.readFileSync('random.txt', 'utf8');
var doWhatItSays = function () {
    var randomParsed = random.split(',');
    command = randomParsed[0]
    searchFor = randomParsed[1]
    runApp()
}

//API Calls Switch
var command = process.argv[2];
var searchFor = process.argv[3];;
var log
var runApp = function () {
    switch (command) {
        case 'spotify-this-song':
        if(!process.argv[3]){
            searchSpotify('The Sign')
        }
        else(
            searchSpotify(searchFor)
        )
            break;
        case 'concert-this':
            searchBandsInTown(searchFor)
            break;
        case 'movie-this':
            if(!process.argv[3]){
                searchOmdb('mr nobody')
            }
            else(
                searchOmdb(searchFor)
            )
            break;
        case 'do-what-it-says':
            doWhatItSays()
            break;
    };

    log = [command, searchFor + '\n'];
    fs.appendFile('log.txt', log, (error) => { /* handle error */ });

}
runApp();