// var keys = require('./keys.js')
// var spotify = new Spotify(keys.spotify)

//Requirements
require('dotenv').config()
var axios = require("axios");
var Spotify = require('node-spotify-api');

//########################################################################################################
//########################################## KEY PREPARATION #############################################
//########################################################################################################

var bandsInTownKey = process.env.BANDSINTOWN_KEY
var omdbKey = process.env.OMDB_KEY
var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
});

//########################################################################################################
//########################################## INPUT PROCESSING ############################################
//########################################################################################################

//Define the command
let command = process.argv[2].toLowerCase();

//Define the media being searched
let protoName = [];
for (var i = 3; i < process.argv.length + 3; i++) {
    protoName.push(process.argv[i])
}
let mediaName = protoName.join(' ').trim()

//########################################################################################################
//########################################## COMMAND HANDLING ############################################
//########################################################################################################

//Concert Search/////////////////////////
/////////////////////////////////////////
if (command === 'concert-this') {
    console.log(`Finding upcoming concert information for "${mediaName}"...`)
    let queryURL = `https://rest.bandsintown.com/artists/${mediaName}/events?app_id=${bandsInTownKey}`
    console.log(queryURL)
    axios.get(queryURL).then(
        function (response) {
            for (var i = 0; i < response.data.length; i++) {
                console.log('##############################')
                console.log(`${response.data[i].venue.name}`);
                console.log(`${response.data[i].venue.city} ${response.data[i].venue.region}, ${response.data[i].venue.country}`);
                console.log(`${response.data[i].datetime}`);
            }
        }
    )
}

//Song Search/////////////////////////
//////////////////////////////////////
else if (command === 'spotify-this-song') {

    //Handle if no argument Provided
    let searchValue;
    if (mediaName === '') {
        searchValue = 'The Sign Ace of Base'
    } else {
        searchValue = mediaName
    };

    //Perform the search
    console.log(`Finding a song that matches "${searchValue}"...`)
    spotify.search({ type: 'track', query: searchValue }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        let results = data.tracks.items;
        console.log(results.length)
        for (var i = 0; i < results.length; i++) {
            console.log('##############################')
            let artistsArr = []
            for (var j = 0; j < results[i].artists.length; j++) {
                artistsArr.push(results[i].artists[j].name)
            }
            console.log('ARTIST(S): ' + artistsArr.join(', '))
            console.log('SONG NAME: ' + results[i].name)
            console.log('PREVIEW LINK: ' + results[i].external_urls.spotify)
            console.log('ALBUM: ' + results[i].album.name)
        }
    });
}

//Movie Search/////////////////////////
///////////////////////////////////////
else if (command === 'movie-this') {

    //Handle if no argument Provided
    let searchValue;
    if (mediaName === '') {
        searchValue = 'Mr. Nobody'
    } else {
        searchValue = mediaName
    };

    //Perform the search
    console.log(`Searching information for the movie "${searchValue}"...`)
    let queryURL = `http://www.omdbapi.com/?apikey=${omdbKey}&t=${searchValue}`
    console.log(queryURL)
    axios.get(queryURL).then(
        function (response) {
            console.log('##############################')
            console.log('TITLE: ' + response.data.Title)
            console.log('YEAR: ' + response.data.Year)
            console.log('RATINGS: ' + response.data.Ratings)
            console.log('COUNTRY: ' + response.data.Country)
            console.log('LANGUAGE: ' + response.data.Language)
            console.log('PLOT: ' + response.data.Plot)
            console.log('ACTORS: ' + response.data.Actors)
        }
    )

    //Do What It Says/////////////////////////
    //////////////////////////////////////////
} else if (command === 'do-what-it-says') {
    console.log('Performing something special...')

    //Invalid Command/////////////////////////
    //////////////////////////////////////////
} else {
    console.log('You entered an invalid command!!!')
}

