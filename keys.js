//Requirements
require('dotenv').config()
var Spotify = require('node-spotify-api');

//Console Log
console.log('Loading keys...');

//Export
exports.bandsInTownKey = process.env.BANDSINTOWN_KEY,
exports.omdbKey = process.env.OMDB_KEY
exports.spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
});