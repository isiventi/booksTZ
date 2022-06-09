import React from "react";
import { Link } from "react-router-dom";

import "./search.css";

function Search({ search }) {
  return (
    <div className="search">
      <input
        type="text"
        className="search__input"
        placeholder="Поиск..."
        onChange={(e) => search(e)}
      />
      <Link to="/forma">
        <button className="search__add">+</button>
      </Link>
    </div>
  );
}

export default Search;
