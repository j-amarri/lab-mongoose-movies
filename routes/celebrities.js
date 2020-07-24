const express = require('express');
const Celebrity = require('./../models/celebrity');

const celebrityRouter = new express.Router();

celebrityRouter.get('/', (request, response, next) => {
  Celebrity.find()
    .then(data => {
      response.render('celebrities/index', { data });
    })
    .catch(error => {
      next(error);
    });
});

celebrityRouter.get('/create', (request, response, next) => {
  response.render('celebrities/create');
});

celebrityRouter.get('/:id', (request, response, next) => {
  const id = request.params.id;
  Celebrity.findById(id)
    .then(data => {
      response.render('celebrities/show', { data });
    })
    .catch(error => {
      response.render('celebrities/create');
    });
});

celebrityRouter.post('/create', (request, response, next) => {
  const data = request.body;
  Celebrity.create({
    name: data.name,
    occupation: data.occupation,
    catchPhrase: data.catchPhrase
  })
    .then(celebrity => {
      response.redirect('/celebrities');
    })
    .catch(error => {
      response.redirect('');
    });
});

module.exports = celebrityRouter;
