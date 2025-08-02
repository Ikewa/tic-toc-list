const express = require('express');
const cors = require('cors');
const todoRoutes = require('./routes/todos');
const morgan = require('morgan');

const app = express();
app.use(morgan('combined'));

app.use(cors());
app.use(express.json());
app.use('/todos', todoRoutes);
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;

