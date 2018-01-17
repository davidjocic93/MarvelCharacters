import React from 'react';
import "./search.css";

export const SearchBar = (props) => {
    
  return (
    <div className="search-bar-container">
      <h1>Marvel characters search</h1>
      <input type="text" placeholder="Character name" onChangeCapture={props.search}/>
    </div>
  );
};

export default SearchBar;