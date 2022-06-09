import React, { useEffect, useState, useContext } from "react";
import Search from "../search/Search";
import { getBooks, postBooks, clear } from "../../services/request";
import { v4 as uuidv4 } from "uuid";
import Sort from "../sort/Sort";
import { Button } from "../../ui/Button";
import { Context } from "../../context";
import "./booksList.css";

const BooksList = () => {
  let [books, setBooks] = useState([]);
  let [state, setState] = useState(true);
  let [valueSearch, setValueSearch] = useState("");

  let contextEditBook = useContext(Context);

  useEffect(() => {
    setBooks(getBooks() ? getBooks() : []);
  }, []);

  const search = (e) => {
    setValueSearch(e.target.value);
  };

  let filterSerch = [];

  if (books && books.length > 0) {
    filterSerch = books.filter((book) => {
      return book.title.toLowerCase().includes(valueSearch.toLowerCase());
    });
  }

  const sortTitle = () => {
    function SortArray(x, y) {
      if (x.title < y.title) {
        return -1;
      }
      if (x.title > y.title) {
        return 1;
      }
      return 0;
    }
    const sortedArr = books.sort(SortArray);

    setBooks(sortedArr);
    setState(!state);
  };

  const sortYear = () => {
    const sortedArr = books.sort(
      (a, b) => b.publicationYear - a.publicationYear
    );
    setBooks(sortedArr);
    setState(!state);
  };

  const delBook = (id) => {
    let arrBooks = getBooks();
    clear();
    let resArr = arrBooks.filter((book) => {
      if (id !== book.ID) {
        return book;
      }
    });

    postBooks(resArr);
    setBooks(resArr);
  };

  return (
    <>
      <Search search={search} />
      <ul className="containerBooks">
        {books
          ? filterSerch.map((book) => {
              let imgSrc = book.imagePreview ? book.imagePreview : "./book.png";
              return (
                <li key={uuidv4()}>
                  <div className="book">
                    <div className="book__image">
                      <img src={imgSrc} alt="book" className="book__image_el" />
                    </div>
                    <div className="book__info">
                      <div className="book__info_title">{book.title}</div>
                      <div className="book__info_authors">
                        {book.author.map(
                          (author, index) =>
                            `${author.firstName} ${author.lastName} `
                        )}
                      </div>
                      <div className="book__info_numberOfPages card">
                        Количество страниц: <b>{book.numberOfPages}</b>
                      </div>
                      <div className="book__info_publicationYear card">
                        Год публикации: <b>{book.publicationYear}</b>
                      </div>
                      <div className="book__info_eleaseDate card">
                        Дата выхода в тираж : <b>{book.eleaseDate}</b>
                      </div>
                      <div className="book__info_isbn card">
                        ISBN : <b>{book.isbn}</b>
                      </div>
                      <span>
                        <Button onClick={() => contextEditBook(book)}>
                          Редактировать
                        </Button>
                      </span>
                      <span>
                        <Button onClick={() => delBook(book.ID)}>
                          Удалить
                        </Button>
                      </span>
                    </div>
                  </div>
                </li>
              );
            })
          : null}
      </ul>
      <Sort sortTitle={sortTitle} sortYear={sortYear} />
    </>
  );
};

export default BooksList;
