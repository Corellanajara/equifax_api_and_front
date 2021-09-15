const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const Userchema = new Schema({
  name: String,
  lastName: String,
  phone: String,
  email: String,
  address: String,
  age: Number,
  status: Boolean
}, { timestamps: true }
);
Userchema.virtual('id').get(function () {
  return this._id.toHexString();
});
Userchema.set('toJSON', {
  virtuals: true
});

Userchema.findById = function (cb) {
  return this.model('User').find({ id: this.id }, cb);
};
const User = mongoose.model('User', Userchema);
exports.findById = (id) => {
  return User.findById(id)
    .then((result) => {
      result = result.toJSON();
      delete result._id;
      delete result.__v;
      return result;
    });
};
exports.createUser = (UserData) => {
  const user = new User(UserData);
  return user.save();
};
exports.list = (perPage, page) => {
  return new Promise((resolve, reject) => {
    User.find()
      .limit(perPage)
      .skip(perPage * page)
      .exec(function (err, user) {
        if (err) {
          reject(err);
        } else {
          resolve(user);
        }
      })
  });
};
exports.patchUser = (id, UserData) => {
  return new Promise((resolve, reject) => {
    User.findById(id, function (err, user) {
      if (err) reject(err);
      for (let i in UserData) {
        user[i] = UserData[i];
      }
      user.save(function (err, updatedUser) {
        if (err) return reject(err);
        resolve(updatedUser);
      });
    });
  })
};
exports.removeById = (UserId) => {
  return new Promise((resolve, reject) => {
    User.remove({ _id: UserId }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(err);
      }
    });
  });
};