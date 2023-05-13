import React, { useState } from 'react';
import './RecipeFinder.css';
import apiKey from './api';

function RecipeFinder() {
  const [includeItems, setIncludeItems] = useState([]);
  const [excludeItems, setExcludeItems] = useState([]);
  const [maxPreparationTime, setMaxPreparationTime] = useState('');
  const [recipes, setRecipes] = useState([]);

  const handleIncludeItemAdd = (event) => {
    if (event.key === 'Enter' && event.target.value.trim() !== '') {
      const newItem = event.target.value.trim();
      if (!includeItems.includes(newItem)) {
        setIncludeItems([...includeItems, newItem]);
      }
      event.target.value = '';
    }
  };

  const handleExcludeItemAdd = (event) => {
    if (event.key === 'Enter' && event.target.value.trim() !== '') {
      const newItem = event.target.value.trim();
      if (!excludeItems.includes(newItem)) {
        setExcludeItems([...excludeItems, newItem]);
      }
      event.target.value = '';
    }
  };

  const handleIncludeItemRemove = (item) => {
    setIncludeItems(includeItems.filter((i) => i !== item));
  };

  const handleExcludeItemRemove = (item) => {
    setExcludeItems(excludeItems.filter((i) => i !== item));
  };

  const handleMaxPreparationTimeChange = (event) => {
    setMaxPreparationTime(event.target.value);
  };

  const handleSubmit = () => {
    const api_key = apiKey; // Use a different variable name here
    const includeIngredientsString = includeItems.join(',');
    const excludeIngredientsString = excludeItems.join(',');
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?includeIngredients=${encodeURIComponent(includeIngredientsString)}&excludeIngredients=${encodeURIComponent(excludeIngredientsString)}&maxReadyTime=${maxPreparationTime}&number=2&apiKey=${api_key}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  };


return (
  <div className="recipe-finder">
    <h2>Recipe Finder</h2>
    <div className="options">
      <div className="option">
        <label htmlFor="includeItems">Include Items:</label>
        <input
          type="text"
          id="includeItems"
          onKeyDown={handleIncludeItemAdd}
          placeholder="Type and press Enter"
        />
        <div className="tags">
          {includeItems.map((item) => (
            <div key={item} className="tag">
              {item}
              <button onClick={() => handleIncludeItemRemove(item)}>x</button>
            </div>
          ))}
        </div>
      </div>
      <div className="option">
        <label htmlFor="excludeItems">Exclude Items:</label>
        <input
          type="text"
          id="excludeItems"
          onKeyDown={handleExcludeItemAdd}
          placeholder="Type and press Enter"
        />
        <div className="tags">
          {excludeItems.map((item) => (
            <div key={item} className="tag">
              {item}
              <button onClick={() => handleExcludeItemRemove(item)}>x</button>
            </div>
          ))}
        </div>
      </div>
      <div className="option">
        <label htmlFor="maxPreparationTime">Maximum Preparation Time (minutes):</label>
        <input
          type="number"
          id="maxPreparationTime"
          min="0"
          max="2850"
          value={maxPreparationTime}
          onChange={handleMaxPreparationTimeChange}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
    <div className="recipes">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="recipe">
          <img src={recipe.image} alt={recipe.title} />
          <h3>{recipe.title}</h3>
        </div>
      ))}
    </div>
  </div>
);


}

export default RecipeFinder;