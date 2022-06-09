import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Main from "../main/Main";
import Form from "../form/Form";
import FormEdit from "../form/FormEdit";
import { Context } from "../../context";

import "./app.css";

function App() {
  let [bookValue, setBook] = useState(null);

  let navigate = useNavigate();
  const editBooksList = (book) => {
    setBook(book);
    navigate("/formEdit", { replace: true });
  };
  return (
    <Context.Provider value={editBooksList}>
      <div className="container">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/forma" element={<Form />} />
          <Route path="/formEdit" element={<FormEdit book={bookValue} />} />
        </Routes>
      </div>
    </Context.Provider>
  );
}

export default App;
