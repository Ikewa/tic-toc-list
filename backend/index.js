const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const todoRoutes = require('./routes/todos');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/todos', todoRoutes);

if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT || 5000, () => {
    console.log('Server running');
  });
}

module.exports = app;
