const express = require('express');
const morgan = require('morgan');
const app = express();

let myMovies = [
    {
      title: 'Naruto Shippuden',
      director: 'Masashi Kishimoto',
      genre: ['Action', 'fiction'],
      yearOfRelease: 2007
    },
    {
      title: 'Vinland Saga',
      director: 'Makoto Yukimura',
      genre: ['Adventure fiction', 'Historical fiction', 'epic'],
      yearOfRelease: 2019  
      
    },
    {
      title: 'Naruto Shippuden',
      director: 'Masashi Kishimoto',
      genre: ['Action', 'fiction'],
      yearOfRelease: 2007
        
    },
    {
      title: 'Power',
      director: ['Courtney Kemp', 'Gary Lennon', 'David Knoller', 'Curtis Jackson', 'Mark Canton', 'Randall Emmett'],
      genre: ['Drama', 'Crime'],
      yearOf: 2014
    },
    {
      title: 'Big Trouble In Little China',
      director: ['John Carpenter', 'Larry J.Franco'],
      genre:['Action Fantasy', 'Martial Arts'],
      yearOfRelease: 1986  
      
    },
    {
      title: 'Terra Hawk',
      director: ['Tony Bell','Tony Lenny','Desmond Saunders','Alan Pattillo'],
      genre:['Children\'s Science Fiction'],
      yearOfRelease: 1983
       
    },
    {
      title: 'Biker Mice From Mars',
      director: 'Tom Tataranowicz',
      genre:['Action', 'fiction', 'Adventure', 'Superhero'],
      yearOfRelease: 1983
    },   
    {
      title: 'Inglorious Basterds',
      director: 'Quentin Tarantino',
      genre:['War', 'Action'],
      yearOfRelease: 2009
       
    },
    {
      title: 'Enter The Dragon',
      director: 'Robert Clouse',
      genre:['Action', 'Martial arts'],
      yearOfRelease: 1973
      
    },
    {
      title: 'Ninja Scroll',
      director: 'Tatsuo Sato',
      genre:['Samurai cinema', 'Action', 'Adventure'],
      yearOfRelease: 2003
       
    },
];

// middleware functions
// morgan (request logging)
app.use(morgan('common'));
// static function for serving all the files at once
app.use(express.static('public'));



// GET requests
// gives of the response
app.get('/', (req, res) => {
    res.send('Welcome to my cineverse');
});

// routes to the documentation page (html)
app.get('/documentation', (req, res) => {                  
    res.sendFile('public/documentation.html', { root: __dirname });
});

// brings a json request on routing
app.get('/movies', (req, res) => {
    res.json(myMovies);
});

// error handling middleware function
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('oop\'s something has gone wrong!');
});


// listen for requests
app.listen(8080, () =>{
    console.log('Your app is listening on port 8080.');
});
