var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const database = require('./database/db');
//routes
const userRoutes = require('./user/userRoute');
const authenticationRoutes = require('./Authentication/authenticationRoute');
const gameRoutes = require('./games/gameRoute');



const app = express();
app.use(bodyParser.json());
const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});


database.initDB(function (err, db) {
  if (db) {
    console.log("Anbindung von Datenbank erfolgreich!")
  } else {
    console.log("Anbindung von Datenbank gescheitert!")
  }
})

//used routes
app.use('/users', userRoutes);
app.use('/authenticate', authenticationRoutes);
app.use('/games', gameRoutes);


app.use(express.json());
app.use(express.urlencoded({
    extended: false
  }));
app.use(cookieParser());






app.use(function (req, res, next) {
  next(createError(404));
});



module.exports = app;
