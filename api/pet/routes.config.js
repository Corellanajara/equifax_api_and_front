const petController = require('./controllers/pet.controller');
const { hasToken } = require('../common/middlewares/auth.validation.middleware');

exports.routesConfig = function (app) {
  app.post('/pet', [
    hasToken,
    petController.insert
  ]);
  app.get('/pet', [
    hasToken,
    petController.list
  ]);
  app.get('/pet/:petId', [
    hasToken,
    petController.getById
  ]);
  app.patch('/pet/:petId', [
    hasToken,
    petController.patchById
  ]);
  app.delete('/pet/:petId', [
    hasToken,
    petController.removeById
  ]);
};