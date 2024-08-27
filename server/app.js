const express = require('express');
const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const commentRoutes = require('./routes/commentRoutes');




const cors = require('cors');

require('dotenv').config()

const url=process.env.mongo_url
const port =process.env.port||5000
const app = express();
app.use(cors());
app.use(express.json());


// Routes
app.use('/auth', authRoutes);
app.use('/posts', blogRoutes);
app.use('/posts', commentRoutes);


// Connect to MongoDB

mongoose.connect(url)
.then(()=>{
  console.log('Connected to MongoDB')
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})
.catch((error)=>{
  console.log(error.message)
  process.exit(1) // To exit the process if an error occurs
})
