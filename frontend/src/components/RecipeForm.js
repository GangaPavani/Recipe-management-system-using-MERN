//src/components/RecipeForm.js
import React, { useState, useEffect } from 'react';

function RecipeForm({ addRecipe, updateRecipe, editingRecipe, setEditingRecipe }) {
  // State hooks
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [description, setDescription] = useState('');
  

  // Effect hook to update form fields when editingRecipe changes
  useEffect(() => {
    if (editingRecipe) {
      setTitle(editingRecipe.title);
      setIngredients(editingRecipe.ingredients);
      setDescription(editingRecipe.description);
      
    } else {
      setTitle('');
      setIngredients('');
      setDescription('');
      
    }
  }, [editingRecipe]);

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    if (editingRecipe) {
      updateRecipe({
        ...editingRecipe,
        title,
        ingredients,
        description,
        
      });
    } else {
      addRecipe({
        title,
        ingredients,
        description,
        
      });
    }

    setTitle('');
    setIngredients('');
    setDescription('');
    setEditingRecipe(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingRecipe ? 'Edit Recipe' : 'Add Recipe'}</h2>
      <div className="form-group"> 
      <label  className="form-label" htmlFor="title">Title:</label>
      <input className="form-control" placeholder='Recipe'
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      </div>
      <div className="form-group"> 
      <label className="form-label" htmlFor="ingredients">Ingredients:</label>
      <textarea 
        placeholder='Ingredients'
        className="form-control"
        id="ingredients"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        required
      ></textarea>
      </div>
      <div className="form-group"> 
      <label className="form-label" htmlFor="description">Description:</label>
      <textarea 
        placeholder='Description'
        className="form-control"
        type="text"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      ></textarea>
      </div>
      <button className="buttonAdd" type="submit">{editingRecipe ? 'Update' : 'Add'}</button>
    </form>
  );
}

export default RecipeForm;
