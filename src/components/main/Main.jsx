import React from "react";

import BooksList from "../booksList/BooksList";

import "./main.css";

const Main = () => {
  return (
    <>
      <header className="header">
        <h1>Книги</h1>
      </header>
      <BooksList />
    </>
  );
};

export default Main;
