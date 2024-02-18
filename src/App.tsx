import React, { useState, useEffect } from 'react';
import CountryFilter from './components/CountryFilter';
import DarkModeToggle from './components/DarkModeToggle';
import "./App.css"


function App() {
  return (
    <div className="p-10">
      <DarkModeToggle />
      <CountryFilter />
    </div>
  );
}

export default App;
