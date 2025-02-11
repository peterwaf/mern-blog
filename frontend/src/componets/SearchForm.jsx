/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { useState } from "react";
function SearchForm({ handleSearch }) {
  const [searchText, setSearchText] = useState("");
  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    handleSearch(searchText);
  }, [searchText]);

  console.log(searchText);
  
  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex h-10">
      <input
        className="h-10 p-2 rounded"
        type="text"
        name="search"
        id="search"
        placeholder="Search for a blog"
        onChange={handleChange}
      />
    </form>
  );
}

export default SearchForm;
