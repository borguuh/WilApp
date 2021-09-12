const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();

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
