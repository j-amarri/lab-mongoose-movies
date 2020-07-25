const express = require('express');
const Movie = require('./../models/movie');

const movieRouter = new express.Router();

movieRouter.get('/', (request, response, next) => {
  Movie.find()
    .then(data => {
      response.render('movies/index', { data });
    })
    .catch(error => {
      next(error);
    });
});

movieRouter.get('/create', (request, response, next) => {
  response.render('movies/create');
});

movieRouter.get('/:id/edit', (request, response, next) => {
  const id = request.params.id;
  Movie.findById(id)
    .then(data => {
      response.render('movies/edit', { data });
    })
    .catch(error => {
      next(error);
    });
});

movieRouter.get('/:id', (request, response, next) => {
  const id = request.params.id;
  Movie.findById(id)
    .then(data => {
      response.render('movies/detail', { data });
    })
    .catch(error => {
      next(error);
    });
});

movieRouter.post('/create', (request, response, next) => {
  const data = request.body;
  Movie.create({
    title: data.title,
    genre: data.genre,
    plot: data.plot
  })
    .then(data => {
      response.redirect('/movies');
    })
    .catch(error => {
      next(error);
    });
});

movieRouter.post('/:id/delete', (request, response, next) => {
  const id = request.params.id;
  Movie.findByIdAndDelete(id)
    .then(() => {
      response.redirect('/movies');
    })
    .catch(error => {
      next(error);
    });
});

movieRouter.post('/:id/edit', (request, response, next) => {
  const id = request.params.id;
  const data = request.body;
  console.log(data);
  Movie.findByIdAndUpdate(id, {
    title: data.title,
    genre: data.genre,
    plot: data.plot
  })
    .then(() => {
      response.redirect('/movies');
    })
    .catch(error => {
      next(error);
    });
});

module.exports = movieRouter;
