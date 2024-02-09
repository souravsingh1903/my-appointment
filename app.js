
const express = require('express');

const sequelize = require('./util/database');

const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

const userRoutes = require('./routes/userRoutes');

app.use(express.urlencoded({extended : false}));

app.use(userRoutes);

// app.use(errorController.get404);

sequelize
  .sync()
  .then(result => {
    // console.log(result);
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  }); 
 