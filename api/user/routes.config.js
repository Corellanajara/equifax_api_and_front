const userController = require('./controllers/user.controller');
const { hasToken } = require('../common/middlewares/auth.validation.middleware');

exports.routesConfig = function (app) {
app.post('/user', [
  hasToken,
  userController.insert
]);
app.get('/user', [
  hasToken,
  userController.list
]);
app.get('/user/:userId', [
  hasToken,
  userController.getById
]);
app.patch('/user/:userId', [
  hasToken,
  userController.patchById
]);
app.delete('/user/:userId', [
  hasToken,
  userController.removeById
]);
};