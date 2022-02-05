const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const { response } = require('express');
const app = express();


let myMovies = [
    {
      Title:"Naruto Shipudden",
        Description:"Naruto, an adolescent ninja, dreams of becoming the Hokage in his village.",
        Genre: {
            Name:"Action",
            Description:"Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats.",
        },
        Director: {
            Name:"Masashi Kishimoto",
            Bio:"Masashi Kishimoto is a Japanese manga artist. His best known work, Naruto, was in serialization from 1999 to 2014 and has sold over 250 million copies worldwide in 46 countries as of May 2019.",
            Birth:"1974-11-08"
        },
        Image:"https://www.imdb.com/title/tt0988824/mediaviewer/rm1490944256/?ref_=tt_ov_i",
        Featured: true,
        yearOfRelease: 2007
    },
    
    {
      Title:"Vinland Saga",
      Description:"Thorfinn pursues a journey with his father\'s killer in order to take revenge and end his life in a duel as an honorable warrior and pay his father a homage.",
      Genre: {
          Name:"Adventure",
          Description:"The adventure genre consists of books where the protagonist goes on an epic journey, either personally or geographically. Often the protagonist has a mission and faces many obstacles in his way.",
      },
      Director: {
          Name:"Makoto Yukimura",
          Bio:"Makoto Yukimura is a Japanese manga artist. Yukimura made his debut with the hard science fiction manga Planetes, serialized in Weekly Morning magazine from 1999 to 2004 and adapted into a 26-episode anime series by Sunrise. Before that, he worked as an assistant for Shin Morimura",
          Birth:"1978-05-08"
      },
      Image:"https://www.imdb.com/title/tt10233448/mediaviewer/rm678534401/?ref_=tt_ov_i",
      Featured: false,
      yearOfRelease: 2019    
    },
    {
      Title:"Jungle Book",
        Description:"The stories tell mostly of Mowgli, an Indian boy who is raised by wolves and learns self-sufficiency and wisdom from the jungle animals.",
        Genre: {
            Name:"Family",
            Description:"Family film is a genre that is contains appropriate content for younger viewers. Family film aims to appeal not only to children, but to a wide range of ages.",
        },
        Director: {
            Name:"Jon Favreau",
            Bio:"Jonathan Kolia Favreau is an American actor and filmmaker. As an actor, Favreau has appeared in the films Rudy, PCU, Swingers, Very Bad Things, Deep Impact. Plus he is the famous crooner of the award winning family film “jungle book",
            Birth:"1966-10-19"
        },
        Image:"https://www.imdb.com/title/tt3040964/mediaviewer/rm1298457856/?ref_=tt_ov_i",
        Featured: false,
        yearOfRelease: 2016
    },
    {
      Title:"Power",
        Description:"James Ghost St. Patrick, a wealthy New York night club owner who has it all, catering to the city\'s elite and dreaming big, lives a double life as a drug kingpin.",
        Genre: {
            Name:"Drama",
            Description:"The drama genre features stories with high stakes and a lot of conflicts. They are plot-driven and demand that every character and scene move the story forward. Dramas follow a clearly defined narrative plot structure, portraying real-life scenarios or extreme situations with emotionally-driven characters.",
        },
        Director: {
            Name:"Curtis Jackson",
            Bio:"Curtis James Jackson III, better known by his stage name 50 Cent, is an American rapper, actor, and entrepreneur. Known for his impact in the hip hop industry plus his foray into directing has come up with the power series.",
            Birth:"1975-06-06"
        },
        Image:"https://www.imdb.com/title/tt3281796/mediaviewer/rm3770784769/?ref_=tt_ov_i",
        Featured: false,
      yearOfRelease: 2014
    },
    {
      Title:"Big Trouble In Little China",
        Description:"Jack Burton, a truck driver, gets dragged into the mysterious underworld beneath Chinatown where he faces an ancient sorcerer named Lo Pan.",
        Genre: {
            Name:"Martial arts",
            Description:"Martial arts films are a subgenre of action films that feature numerous martial arts combat between characters. These combats are usually the film primary appeal and entertainment value, and often are a method of storytelling and character expression and development.",
        },
        Director: {
            Name:"John Carpenter",
            Bio:"John Howard Carpenter is an American filmmaker, actor and composer. Although Carpenter has worked with various film genres, he is associated most commonly with horror, action, and science fiction films of the 1970s and 1980s.",
            Birth:"1948-01-16"
        },
        Image:"https://www.imdb.com/title/tt0090728/mediaviewer/rm3225041920/?ref_=tt_ov_i",
        Featured: false,
      yearOfRelease: 1986  
      
    },
    {
      Title:"Django Unchained",
      Description:"When Django, a slave, is freed, he joins forces with a bounty hunter to rescue his wife, who has been enslaved by Calvin, a hard-hearted plantation owner.",
      Genre: {
          Name:"Action",
          Description:"Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats.",
      },
      Director: {
          Name:"Quentin Tarantino",
          Bio:"Quentin Jerome Tarantino is an American filmmaker, film director, screenwriter, producer, film critic, and actor. His films are characterized by nonlinear storylines, dark humor, stylized violence, foot fetishism, extended dialogue, ensemble casts, references to popular culture, alternate history, and neo-noir.",
          Birth:"1963-03-27"
      },
      Image:"https://www.imdb.com/title/tt1853728/mediaviewer/rm958180352/?ref_=tt_ov_i",
      Featured: false,
      yearOfRelease: 2013
       
    },
    {
      Title:"Biker Mice From Mars",
    Description:"It\'s about three anthropomorphic mice motorcyclists named Throttle, Modo, and Vinnie who escape a war on their home planet Mars before arriving to defend the Earth from the evil that destroyed their homeland.",
        Genre: {
            Name:"Action",
            Description:"Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats.",
        },
        Director: {
            Name:"Tom Tataranowicz",
            Bio:"Thomas Tataranowicz is an American cartoon animator, storyboard artist, producer and director. His first credit was He-Man and the Masters of the Universe.",
            Birth:"1960-01-07"
        },
        Image:"https://www.imdb.com/title/tt0147752/mediaviewer/rm2060928000/?ref_=tt_ov_i",
        Featured: false,
      yearOfRelease: 1983
    },   
    {
      Title:"Inglorious Basterds",
      Description:"A few Jewish soldiers are on an undercover mission to bring down the Nazi government and put an end to the war. Meanwhile, a woman wants to avenge the death of her family from a German officer.",
      Genre: {
          Name:"Action",
          Description:"Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats.",
      },
      Director: {
          Name:"Quentin Tarantino",
          Bio:"Quentin Jerome Tarantino is an American filmmaker, film director, screenwriter, producer, film critic, and actor. His films are characterized by nonlinear storylines, dark humor, stylized violence, foot fetishism, extended dialogue, ensemble casts, references to popular culture, alternate history, and neo-noir.",
          Birth:"1963-03-27"
      },
      Image:"https://www.imdb.com/title/tt0361748/mediaviewer/rm3163035648/?ref_=tt_ov_i",
      Featured: false,
      yearOfRelease: 2009
       
    },
    {
      Title:"Enter The Dragon",
        Description:"A secret agent comes to an opium lord\'s island fortress with other fighters for a martial-arts tournament. Enter the Dragon revolves around 3 main characters; Lee, a man recruited by an agency to investigate a tournament hosted by Han, since they believe he has an Opium trade there.",
        Genre: {
            Name:"Martial arts",
            Description:"Martial arts films are a subgenre of action films that feature numerous martial arts combat between characters. These combats are usually the film primary appeal and entertainment value, and often are a method of storytelling and character expression and development.",
        },
        Director: {
            Name:"Robert Clouse",
            Bio:"Robert Clouse was an American film director and producer, known primarily for his work in the action/adventure and martial arts genres.",
            Birth:"1928-03-06",
            Death:"1997-02-04"
        },
        Image:"https://www.imdb.com/title/tt0070034/mediaviewer/rm638853120/?ref_=tt_ov_i",
        Featured: false,
      yearOfRelease: 1973
      
    },
    {
      Title:"Ninja Scroll",
        Description:"In feudal Japan, a mercenary ninja must guard the Dragon Stone and protect the Priestess of Light.",
        Genre: {
            Name:"Action",
            Description:"Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats.",
        },
        Director: {
            Name:"Tatsuo Sato",
            Bio:"Tatsuo Satō is a Japanese anime director most famous for Martian Successor Nadesico.",
            Birth:"1964-05-07"
        },
        Image:"https://www.imdb.com/title/tt0107692/mediaviewer/rm2889614848/?ref_=tt_ov_i",
        Featured: false,
        yearOfRelease: 2003
       
    },
];

// middleware functions
// morgan (request logging)
app.use(morgan('common'));
// static function for serving all the files at once
app.use(express.static('public'));
// body-parser function 
app.use(bodyParser.json());



// GET requests
// gives of the response
app.get('/', (req, res) => {
    res.send('Welcome to my cineverse');
});

// routes to the documentation page (html)
app.get('/documentation', (req, res) => {                  
    res.sendFile('public/documentation.html', { root: __dirname });
});

// brings a json request on routing (ALL MOVIES)
app.get('/movies', (req, res) => {
    res.send(myMovies);
});


//Get movies by Title
app.get('/movies/:title', (req, res) => {
    res.json(
      myMovies.find(movie => {
        return movie.title === req.params.title;
      })
    );
});


//Get movies by Genre
app.get('/genres/:genre', (req, res) => {
    res.json(
      myMovies.find(movieGenre => {
        return movieGenre.genre === req.params.genre;
      })
    );
});

//Get movies by director
app.get('/directors/:director', (req, res) => {
    res.json(
      myMovies.find(movieDirector => {
        return movieDirector.director === req.params.director;
      })
    );
});
// Creation of a new users by UUID
app.post('/users/:newUser', (req, res) => {
    res.send('POST request with message (new user created!)');
});

//Update users information on app
app.put('/users/:userName', (req, res) => {
    res.send('PUT request with message (username updated!)');
});

// Creation of favourite movie list
app.post('/movies/:addFavourite', (req, res) => {
    res.send('POST request with message (movie added successfully!)');
});

//Removal of movies from favorite movie list
app.delete('/movies/:movieTitle', (req, res) => {
    res.send('DELETE request with message (movie deleted successfully!)');
    
});

//Deregistration of a user (useremail)
app.delete('/users/:username', (req, res) => {
    res.send('DELETE request with message (useremail deregistered from the app!)');
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
