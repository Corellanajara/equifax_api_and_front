const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const Petchema = new Schema({
  name: String,
  age: Number,
  owner: String,
  status : Boolean

}, { timestamps: true }
);
Petchema.virtual('id').get(function () {
  return this._id.toHexString();
});
Petchema.set('toJSON', {
  virtuals: true
});

Petchema.findById = function (cb) {
  return this.model('Pet').find({ id: this.id }, cb);
};
const Pet = mongoose.model('Pet', Petchema);
exports.findById = (id) => {
  return Pet.findById(id)
    .then((result) => {
      result = result.toJSON();
      delete result._id;
      delete result.__v;
      return result;
    });
};
exports.createPet = (PetData) => {
  const pet = new Pet(PetData);
  return pet.save();
};
exports.list = (perPage, page) => {
  return new Promise((resolve, reject) => {
    Pet.find({status:true})
      .limit(perPage)
      .skip(perPage * page)
      .exec(function (err, pet) {
        if (err) {
          reject(err);
        } else {
          resolve(pet);
        }
      })
  });
};
exports.patchPet = (id, PetData) => {
  return new Promise((resolve, reject) => {
    Pet.findById(id, function (err, pet) {
      if (err) reject(err);

      console.log(PetData);
      for (let i in PetData) {
        pet[i] = PetData[i];
      }
      pet.save(function (err, updatedPet) {
        if (err) return reject(err);
        resolve(updatedPet);
      });
    });
  })
};
exports.removeById = (PetId) => {
  return new Promise((resolve, reject) => {
    Productos.remove({ _id: PetId }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(err);
      }
    });
  });
};