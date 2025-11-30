require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const app = express();


app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/children', require('./routes/child.routes'));
app.use('/api/dashboard', require('./routes/dashboard.routes'));


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));