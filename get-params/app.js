const express = require('express');
const app = express();


app.use(express.static('public'));

// this is needed to be able to use partials
const hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

// importing the movies from the json file
const movies = require('./movies.json');
// console.log(movies);

app.get('/', (req, res) => {
	res.render('movies', { moviesList: movies, doctitle: 'all the movies' });
});

app.get('/search', (req, res) => {
	// we need to use the value of the name attribute in the input form - in that case title
	console.log(req.query.title);
	const filteredMovies = movies.filter(function (movie) {
		return movie.title.toLowerCase().includes(req.query.title.toLowerCase());
	})
	// console.log(filteredMovies);
	res.render('movies', { moviesList: filteredMovies, doctitle: 'filtered movies' });
})

app.get('/movies/:movieTitle', (req, res) => {

	const movie = movies.find(function (movie) {
		const title = req.params.movieTitle;
		return movie.title === title;
	})
	// console.log(movie);
	res.render('moviedetail', { clickedMovie: movie, doctitle: 'movie details' });
})

// app.get('/godfather', (req, res) => {
// 	// pass layout: false to the object to not use the base layout
// 	// find the movie godfather in the array
// 	const godfather = movies.find(movie => movie.title === 'The Godfather');
// 	console.log(godfather);
// 	res.render('moviedetail', { clickedMovie: godfather, doctitle: 'movie details' });
// })

// this route needs to be before '/github/:user' bc it uses at the same position
// a specific value
app.get('/github/repositories', (req, res) => {
	res.send('this is all the repos');
})

// route parameter
// : indicates that this is a variable
app.get('/github/:user', (req, res) => {
	// console.log(req.params);
	res.send(req.params);
})


// query string
// req.query
// app.get('/somequery', (req, res) => {
// 	res.send(req.query.user);
// })
app.listen(3000, () => {
	console.log('Server listening');
})