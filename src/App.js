import React from 'react';
import RecipeFinder from './RecipeFinder';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router basename="/">
      <div className="App">
        <RecipeFinder />
      </div>
    </Router>
  );
}

export default App;
