const PetModel = require('../models/pet.model');

exports.insert = (req, res) => {
  req.body.status = true;
  PetModel.createPet(req.body)
    .then((result) => {
      res.status(201).send({ id: result._id });
    });
}; 
exports.list = (req, res) => {
  let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
  let page = 0;
  if (req.query) {
    if (req.query.page) {
      req.query.page = parseInt(req.query.page);
      page = Number.isInteger(req.query.page) ? req.query.page : 0;
    }
  }
  PetModel.list(limit, page)
    .then((result) => {
      res.status(200).send(result);
    })
};
exports.getById = (req, res) => {
  PetModel.findById(req.params.petId)
    .then((result) => {
      res.status(200).send(result);
    });
};
exports.patchById = (req, res) => {
  PetModel.patchPet(req.params.petId, req.body)
    .then((result) => {
      res.status(204).send({});
    });
};
exports.removeById = (req, res) => {
  PetModel.removeById(req.params.petId)
    .then((result) => {
      res.status(204).send({});
    });
};