// components/SearchBar/SearchBar.js
import React from "react";
import "./searchBar.css"; // Stil dosyasını eklemeyi unutma

export const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="searchContainer">
      <input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
    </div>
  );
};
