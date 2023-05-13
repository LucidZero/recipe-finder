import React, { useState } from 'react';
import './RecipeFinder.css';

function RecipeFinder() {
  const [includeItems, setIncludeItems] = useState([]);
  const [excludeItems, setExcludeItems] = useState([]);
  const [maxPreparationTime, setMaxPreparationTime] = useState('');

  const handleIncludeItemAdd = (event) => {
    if (event.key === 'Enter' && event.target.value.trim() !== '') {
      const newItem = event.target.value.trim();
      setIncludeItems([...includeItems, newItem]);
      event.target.value = '';
    }
  };

  const handleExcludeItemAdd = (event) => {
    if (event.key === 'Enter' && event.target.value.trim() !== '') {
      const newItem = event.target.value.trim();
      setExcludeItems([...excludeItems, newItem]);
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
        </div>
      </div>
      {/* Add code here to fetch and display recipes based on the selected options */}
    </div>
  );
}

export default RecipeFinder;
