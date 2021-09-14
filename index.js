const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const postsRoutes = require('./routes/posts-routes');
const HttpError = require('./models/http-error');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes
app.use("/api/posts", postsRoutes);

//Not found route
app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

//Error handling from routes --http-error.js and postcontroller
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500)
  res.json({message: error.message || 'An unknown error occurred!'});
});


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
