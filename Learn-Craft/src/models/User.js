const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs'); // Use bcryptjs instead of bcrypt

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String } // Add this if you want to store the image filename
});

// Password hashing middleware
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', UserSchema);
