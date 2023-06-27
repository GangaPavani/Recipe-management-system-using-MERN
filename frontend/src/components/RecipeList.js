//src/components/RecipeList.js
import React from 'react';

function RecipeList({ recipes, deleteRecipe, setEditingRecipe }) {
  // Function to handle recipe edit
  const handleEdit = (recipe) => {
    setEditingRecipe(recipe);
  };

  // Function to handle recipe delete
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      deleteRecipe(id);
    }
  };

  return (
    <div>
      <h2>Recipes</h2>
      {recipes.map((recipe) => (
        <div key={recipe._id}>
          <h3>{recipe.title}</h3>
          <p>{recipe.ingredients.join(', ')}</p>
          <p>{recipe.description}</p>
          <button className="buttonEdit" onClick={() => handleEdit(recipe)}>Edit</button>
          <button className="buttonDelete"onClick={() => handleDelete(recipe._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default RecipeList;

