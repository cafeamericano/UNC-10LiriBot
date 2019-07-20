# UNC Assignment #8 - LIRI Bot
> Created by Matthew Farmer
__________________________________________________________________________________

### About
LIRI Bot is a command-line node application designed to allow users to easily search for information on songs, movies, and concerts. The user may run one of the four functions listed below. Results will be printed to the console as well as saved in a text file (log.txt).

### Video Demonstration
![gif](/Screenshots/liriBot.gif)

### Concert Search
`node liri.js concert-this (artistName)`

![concert](/Screenshots/concert.png)

This feature uses the BandsInTown API to search for upcoming concerts for a given artist. Data returned includes the venue name, venue location, and date of the concert.

### Song Search
`node liri.js spotify-this-song (songName)`

![song](/Screenshots/song.png)

This feature uses the Spotify API to search for songs that match a given song title. Data returned includes the name of the artist(s), song name, a preview link on Spotify, and the album from which the song originates.

### Movie Search
`node liri.js movie-this (movieName)`

![movie](/Screenshots/movie.png)

This feature uses the OMDB API to search for a movie that matches a given movie title. Data returned includes the title of the movie, the year the movie was released, the movie's country of origin, languages in which the movie is available, a brief summary of the plot, and a list of the main actors in the film.

### Read Instructions from File
`node liri.js do-what-it-says`

![do-what-it-says](/Screenshots/dowhatitsays.png)

This feature allows instructions from the 'random.txt' file to be performed using one of the three other functions (concert search, song search, or movie search). For example, the user may change the text inside 'random.txt' to read 'movie-this, Titanic' and run the application using 'node liri.js do-what-it-says' on the command line. LIRI Bot will then return information on the movie 'Titanic' using the movie search function.

__________________________________________________________________________________

### Technologies Used

APIs utilized include the Spotify API, BandsInTown API, and OMDB API.

Node packages utilized include Axios (for making asynchronous HTTP requests), Moment (for formatting the dates of upcoming concerts), and DotEnv (for securely storing API keys). The built-in FS package is used for reading the contents of the random.txt file as well as exporting results to the log.txt file.

### Other Notes

Search results are exported/saved to a file titled 'log.txt'. Results append to the text file rather than overwrite its contents.
