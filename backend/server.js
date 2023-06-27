const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const url = "mongodb://localhost/RecipeDB"
const port=8000;
const app = express();

// Add body-parser middleware
app.use(bodyParser.json());
app.use(express.json())

// Connect to MongoDB
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

const recipeRouter = require('./routes/recipes')
app.use('/recipes',recipeRouter)
 
