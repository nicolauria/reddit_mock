const express = require('express');
const app = express();

// start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}.`));

// connect to mongoose db
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
mongoose
  .connect(db)
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch(err => console.log(err));

// parse body of post requests
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// abstract users and posts api into separate files
const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const comments = require('./routes/api/comments');
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/comments', comments);

// passport jwt authentication
const passport = require('passport');
require('./config/passport')(passport);
app.use(passport.initialize());
