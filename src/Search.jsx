import React from 'react';

function SearchBar() {
  return (
    <form>
      <fieldset>
        <label htmlFor="search">Search:</label>
        <input type="text" name="search" id="search" placeholder="Search text" aria-label="Search text" />
        <input type="submit" value="Search" />
      </fieldset>
    </form>
  )
}

export default SearchBar;
