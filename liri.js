require('dotenv').config()


// var keys = require('./keys.js')
// var spotify = new Spotify(keys.spotify)

//Requirements
var axios = require("axios");

//Keys
var bandsInTownKey = process.env.BANDSINTOWN_KEY
var spotifyID = process.env.SPOTIFY_ID
var spotifySecret = process.env.SPOTIFY_SECRET
var omdbKey = process.env.OMDB_KEY

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
                console.log('##########')
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
    console.log(`Finding a song that matches "${mediaName}"...`)
}

//Movie Search/////////////////////////
///////////////////////////////////////
else if (command === 'movie-this') {
    console.log(`Searching information for the movie "${mediaName}"...`)
    let queryURL = `http://www.omdbapi.com/?apikey=${omdbKey}&t=${mediaName}`
    console.log(queryURL)
    axios.get(queryURL).then(
        function (response) {
            console.log(response.data)
            console.log(response.data.Title)
            console.log(response.data.Year)
            console.log(response.data.Ratings)
            console.log(response.data.Country)
            console.log(response.data.Language)
            console.log(response.data.Plot)
            console.log(response.data.Actors)
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

