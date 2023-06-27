//App.js
import React, { useState, useEffect } from 'react';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';
import './App.css'

function App() {
  const [recipes, setRecipes] = useState([]);
  const [editingRecipe, setEditingRecipe] = useState(null);

  useEffect(() => {
    fetchRecipes();
  }, []);
//Get all recipes
  const fetchRecipes = async () => {
    try {
      const response = await fetch('/recipes');
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.log(error);
    }
  };
//POST a new recipe
  const addRecipe = async (recipe) => {
    try {
      const response = await fetch('/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe),
      });
      const data = await response.json();
      setRecipes([...recipes, data]);
    } catch (error) {
      console.log(error);
    }
  };
// PUT (update) a recipe
  const updateRecipe = async (recipe) => {
    try {
      const response = await fetch(`/api/recipes/${recipe._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe),
      });
      const data = await response.json();
      const updatedRecipes = recipes.map((r) => (r._id === data._id ? data : r));
      setRecipes(updatedRecipes);
      setEditingRecipe(null);
    } catch (error) {
      console.log(error);
    }
  };
//DELETE a recipe
  const deleteRecipe = async (id) => {
    try {
      await fetch(`/recipes/${id}`, {
        method: 'DELETE',
      });
      const updatedRecipes = recipes.filter((r) => r._id !== id);
      setRecipes(updatedRecipes);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1 className="main-heading">Recipe Management System </h1>
      <div className="row">
        <div className="col">
          <RecipeForm
            addRecipe={addRecipe}
            updateRecipe={updateRecipe}
            editingRecipe={editingRecipe}
            setEditingRecipe={setEditingRecipe}
          />
        </div>
        <div className="col">
          <RecipeList
            recipes={recipes}
            deleteRecipe={deleteRecipe}
            setEditingRecipe={setEditingRecipe}
          />
        </div>
      </div>
    </div>   
  );
}

export default App;


