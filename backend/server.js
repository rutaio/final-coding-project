const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const messageRoutes = require('./routes/messageRoutes');
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/messages', messageRoutes);

const PORT = process.env.PORT || 3001;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // console.log('Connected to MongoDB');
    console.log(`Connected to MongoDB at ${new Date().toISOString()}`);
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB', error);
  });

app.listen(PORT, () => {
  console.log(`Server started at ${new Date().toISOString()}`);
  //  console.log(`Server is running on http://localhost:${PORT}`);
});
