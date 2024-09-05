// components/SearchBar/SearchBar.js
import React from "react";

export const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="searchContainer">
      <input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
    </div>
  );
};
