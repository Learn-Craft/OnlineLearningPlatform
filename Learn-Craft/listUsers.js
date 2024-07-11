const mongoose = require('mongoose');
const User = require('./models/User'); // Adjust the path as necessary

// Load environment variables
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');

  // Fetch all users
  User.find({}, (err, users) => {
    if (err) {
      console.error('Error fetching users:', err);
    } else {
      console.log('Registered Users:');
      console.log(users);
    }
    // Close the connection
    mongoose.connection.close();
  });
});
