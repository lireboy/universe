var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
const database = require('./database/db');
const cors = require("cors");
//routes
const userRoutes = require('./user/userRoute');
const authenticationRoutes = require('./Authentication/authenticationRoute');
const gameRoutes = require('./games/gameRoute');

const app = express();
app.use(cors());
app.use(express.json());
const port = 8080;
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
app.use('/user', userRoutes);
app.use('/authenticate', authenticationRoutes);
app.use('/games', gameRoutes);


app.use(express.urlencoded({
    extended: false
  }));
app.use(cookieParser());






app.use(function (req, res, next) {
  next(createError(404));
});



module.exports = app;
