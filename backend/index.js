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

<<<<<<< HEAD
=======
if (require.main === module) {
  app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
  });
}

>>>>>>> f8ad8b8aaace601d711ef9c6834443f7f33ebd8d
