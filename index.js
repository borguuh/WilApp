const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const postsRoutes = require('./routes/posts-routes');

const app = express();

app.use("/api/posts", postsRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500)
  res.json({message: error.message || 'An unknown error occurred!'});
});

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
/*mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
*/
// Passport middleware
//app.use(passport.initialize());

// Passport Config
//require('./config/passport')(passport);

// Use Routes


//'''''''''''''
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
