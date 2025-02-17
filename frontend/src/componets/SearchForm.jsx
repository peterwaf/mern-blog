// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchBlogs, fetchBlogs } from "../features/blogsSlice";
function SearchForm() {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    if (searchText) {
      dispatch(searchBlogs(searchText));
    }
    else{
      dispatch(fetchBlogs());
    }
  }, [dispatch, searchText]);

  
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
