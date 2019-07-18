//Requirements
require('dotenv').config()
var keys = require('./keys.js')
var axios = require("axios");
var moment = require('moment');
var fs = require("fs");

//########################################################################################################
//########################################## KEY PREPARATION #############################################
//########################################################################################################

var bandsInTownKey = keys.bandsInTownKey
var omdbKey = keys.omdbKey
var spotify = keys.spotify

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
//############################################## FUNCTIONS ###############################################
//########################################################################################################

function takeInCommand(recCommand) {
    if (recCommand === 'concert-this') {
        concertSearch()
    }
    else if (recCommand === 'spotify-this-song') {
        songSearch()
    }
    else if (recCommand === 'movie-this') {
        movieSearch()
    }
    else if (recCommand === 'do-what-it-says') {
        console.log('Reading the random.txt file for instructions...')
        exportToFile(`*** Reading the random.txt file for instructions... *** \n`)

        fs.readFile("random.txt", "utf8", function (error, data) {
            //Catch any errors
            if (error) {
                return console.log(error);
            }
            //Isolate file contents by comma, place into array, isolate elements
            var dataArr = data.split(",");
            command = dataArr[0]
            mediaName = dataArr[1]
            //Call this function with the command and media name from the random.txt file
            takeInCommand(command)
        });
    }
    else {
        console.log('You entered an invalid command!!!')
    };
};

function concertSearch() {
    console.log(`Finding upcoming concert information for "${mediaName}"...`)
    exportToFile(`*** Finding upcoming concert information for "${mediaName}"... *** \n`)

    let queryURL = `https://rest.bandsintown.com/artists/${mediaName}/events?app_id=${bandsInTownKey}`
    axios.get(queryURL).then(
        function (response) {
            for (var i = 0; i < response.data.length; i++) {
                console.log(`VENUE: ${response.data[i].venue.name}`);
                console.log(`LOCATION: ${response.data[i].venue.city} ${response.data[i].venue.region}, ${response.data[i].venue.country}`);
                let calDate = response.data[i].datetime
                console.log('DATE: ' + moment(calDate).format("MM-DD-YYYY"));
                console.log('')

                exportToFile(`\n VENUE: ${response.data[i].venue.name} \n LOCATION: ${response.data[i].venue.city} ${response.data[i].venue.region}, ${response.data[i].venue.country} \n DATE: ${moment(calDate).format("MM-DD-YYYY")} \n \n`)
            }
        }
    )

};

function songSearch() {

    //Handle if no argument Provided
    let searchValue;
    if (mediaName === '') {
        searchValue = 'The Sign Ace of Base'
    } else {
        searchValue = mediaName
    };

    //Perform the search
    console.log(`Finding a song that matches "${searchValue}"...`)
    exportToFile(`*** Finding a song that matches "${searchValue}"... *** \n \n`)

    spotify.search({ type: 'track', query: searchValue }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        let results = data.tracks.items;
        console.log(results.length)
        for (var i = 0; i < results.length; i++) {
            let artistsArr = []
            for (var j = 0; j < results[i].artists.length; j++) {
                artistsArr.push(results[i].artists[j].name)
            }
            console.log('ARTIST(S): ' + artistsArr.join(', '))
            console.log('SONG NAME: ' + results[i].name)
            console.log('PREVIEW LINK: ' + results[i].external_urls.spotify)
            console.log('ALBUM: ' + results[i].album.name)
            console.log('')

            exportToFile(
                'ARTIST(S): ' + artistsArr.join(', ') + '\n' +
                'SONG NAME: ' + results[i].name + '\n' +
                'PREVIEW LINK: ' + results[i].external_urls.spotify + '\n' +
                'ALBUM: ' + results[i].album.name + '\n' +
                '' + '\n'
            )
        }
    });

}

function movieSearch() {

    //Handle if no argument Provided
    let searchValue;
    if (mediaName === '') {
        searchValue = 'Mr. Nobody'
    } else {
        searchValue = mediaName
    };

    //Perform the search
    console.log(`Searching information for the movie "${searchValue}"...`)
    exportToFile(`*** Searching information for the movie "${searchValue}"... *** \n`)

    let queryURL = `http://www.omdbapi.com/?apikey=${omdbKey}&t=${searchValue}`
    axios.get(queryURL).then(
        function (response) {
            console.log('TITLE: ' + response.data.Title)
            console.log('YEAR: ' + response.data.Year)
            //Handle Ratings info display
            let ratingsArr = response.data.Ratings
            for (var i = 0; i < ratingsArr.length; i++) {
                if (ratingsArr[i].Source === "Internet Movie Database") {
                    console.log(`IMDB RATING: ${ratingsArr[i].Value}`)
                }
                if (ratingsArr[i].Source === "Rotten Tomatoes") {
                    console.log(`ROTTEN TOMATOES RATING: ${ratingsArr[i].Value}`)
                }
            }
            console.log('COUNTRY: ' + response.data.Country)
            console.log('LANGUAGE: ' + response.data.Language)
            console.log('PLOT: ' + response.data.Plot)
            console.log('ACTORS: ' + response.data.Actors)
            console.log('')

            exportToFile(`\n COUNTRY: ${response.data.Country} \n LANGUAGE: ${response.data.Language} \n PLOT: ${response.data.Plot} \n ACTORS: ${response.data.Actors} \n \n`)
        }
    )

};

function exportToFile(text) {
    fs.appendFile("log.txt", text, function (err) {
        if (err) {
            console.log(err);
        }
    });
}

//########################################################################################################
//############################################ PROGRAM RUN ###############################################
//########################################################################################################

console.log('')
console.log('###########################################################')
console.log('#################### WELCOME TO LIRI ######################')
console.log('###########################################################')
console.log('')

takeInCommand(command)

