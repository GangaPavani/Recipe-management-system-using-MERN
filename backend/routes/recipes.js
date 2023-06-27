// backend/routes/recipes.js
const express = require('express');
const router = express.Router();
const Recipe= require('../models/recipe');



// GET all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET a recipe by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      res.status(404).json({ error: 'Recipe not found' });
    } else {
      res.json(recipe);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST a new recipe
router.post('/', async (req, res) => {
  const { title,ingredients, description} = req.body;
  try {
    const newRecipe = new Recipe({ title,ingredients, description });
    const recipe = await newRecipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
});

// PUT (update) a recipe
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title,ingredients, description } = req.body;
  try {
    const recipe = await Recipe.findByIdAndUpdate(id, { title,ingredients, description }, { new: true });
    if (!recipe) {
      res.status(404).json({ error: 'Recipe not found' });
    } else {
      res.json(recipe);
    }
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
});

// DELETE a recipe
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await Recipe.findByIdAndDelete(id);
    if (!recipe) {
      res.status(404).json({ error: 'Recipe not found' });
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
});

module.exports = router;
