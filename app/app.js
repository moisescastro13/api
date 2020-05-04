const express = require('express');

const App = express();
const morgan = require('morgan');
const cors = require('cors');

const Patient = require('./routes/patient');
const User = require('./routes/user');
const Disease = require('./routes/disease');
const Auth = require('./routes/auth');

const AuthToken = require('./middlewares/AuthToken');

//App.use(AuthToken);

App.use(express.json());
App.use(cors());
App.use(morgan('dev'));

App.use('/patient',Patient);
App.use('/disease',Disease);
App.use('/user',User);
App.use('/auth',Auth);


module.exports = App;