import React, { useRef, useState } from 'react';
import './RecipeFinder.css';
import apiKey from './api';

function RecipeFinder() {
  const [includeItems, setIncludeItems] = useState([]);
  const [excludeItems, setExcludeItems] = useState([]);
  const [maxPreparationTime, setMaxPreparationTime] = useState('');
  const [recipes, setRecipes] = useState([]);
  const includeInput = useRef()
  const excludeInput = useRef()
  const numberPerPage = 6;

  const handleIncludeItemAdd = () => {
    if (includeInput.current.value.trim() !== '') {
      const newItem = includeInput.current.value.trim();
      if (!includeItems.includes(newItem)) {
        setIncludeItems([...includeItems, newItem]);
      }
      includeInput.current.value = '';
    }
  };

  const handleExcludeItemAdd = () => {
    if (excludeInput.current.value.trim() !== '') {
      const newItem = excludeInput.current.value.trim();
      if (!excludeItems.includes(newItem)) {
        setExcludeItems([...excludeItems, newItem]);
      }
      excludeInput.current.value = '';
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

    handleIncludeItemAdd()
    handleExcludeItemAdd()
    const includeIngredientsString = includeItems.join(',');
    const excludeIngredientsString = excludeItems.join(',');
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?includeIngredients=${encodeURIComponent(includeIngredientsString)}&excludeIngredients=${encodeURIComponent(excludeIngredientsString)}&maxReadyTime=${maxPreparationTime || 30}&number=${numberPerPage}&apiKey=${api_key}`;
    
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
          onKeyDown={(event) => {
            if (event.key === 'Enter') handleIncludeItemAdd();
          }}
          onBlur={handleIncludeItemAdd}
          ref={includeInput}
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
          onKeyDown={(event) => {
            if (event.key === 'Enter') handleExcludeItemAdd();
          }}
          onBlur={handleExcludeItemAdd}
          ref={excludeInput}
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
        <div className="image-container">
          <img src={recipe.image} alt={recipe.title} />
        </div>
        <h3>{recipe.title}</h3>
      </div>
    ))}
    </div>

  </div>
);


}

export default RecipeFinder;