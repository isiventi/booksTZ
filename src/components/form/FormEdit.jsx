import React, { useState, useEffect, useRef } from "react";
import InputAuthor from "./InputAuthor";
import { Button } from "../../ui/Button";
import { Link, useNavigate } from "react-router-dom";
import {
  getBooks,
  postBooks,
  postValue,
  getValue,
  clear,
} from "../../services/request";
import { v4 as uuidv4 } from "uuid";

import "./form.css";

const FormEdit = ({ book }) => {
  let [title, setTitle] = useState(book.title);
  let [numberOfPages, setNumberOfPages] = useState(book.numberOfPages);
  let [publisherName, setPublisherName] = useState(book.publisherName);
  let [publicationYear, setPublicationYear] = useState(book.publicationYear);
  let [eleaseDate, setEleaseDate] = useState(book.eleaseDate);
  let [isbn, setIsbn] = useState(book.isbn);
  let [image, setImage] = useState("");
  let [state, setState] = useState({});
  let [countAuthor, setCountAuthor] = useState(1);
  let [preview, setPreview] = useState("");
  let [authorsBook, setAuthorsBook] = useState(book.author);

  useEffect(() => {
    for (let key in book) {
      if (!getValue(key)) {
        postValue(key, book[key]);
        book.author.map((author, index) => {
          postValue(`firstName-${index}`, author.firstName);
          postValue(`lastName-${index}`, author.lastName);
        });
      }
    }
  }, []);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  });

  useEffect(() => {
    setState({
      title: title,
      author: authorsBook,
      numberOfPages: numberOfPages,
      publisherName: publisherName,
      publicationYear: publicationYear,
      eleaseDate: eleaseDate,
      isbn: isbn,
      image: image,
      imagePreview: preview ? preview : "",
      ID: book.ID,
    });
  }, [
    title,
    authorsBook,
    numberOfPages,
    publisherName,
    publicationYear,
    eleaseDate,
    isbn,
    image,
    preview,
    book.ID,
  ]);

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    let arrBooks = getBooks();

    clear();
    let res = arrBooks.map((book) => {
      if (book.ID === state.ID) {
        return state;
      } else if (book.ID !== state.ID) {
        return book;
      }
    });
    postBooks(res);

    navigate("/", { replace: true });
  };

  const addAuthor = () => {
    setAuthorsBook([...authorsBook, {}]);
  };

  const changeAuthorCount = (indexAuthor, value, lastName, firstName) => {
    setAuthorsBook(
      authorsBook.map((author, index) => {
        let obj = {
          firstName: firstName,
          lastName: lastName,
        };
        return index === indexAuthor ? obj : author;
      })
    );
  };

  const delInputAuthor = (index) => {
    setCountAuthor(countAuthor - 1);

    let resArr = authorsBook.filter((author, index2) => {
      if (index !== index2) {
        return author;
      } else if (index !== index2) {
        return;
      }
    });

    setAuthorsBook(resArr);
  };

  const saveValueInput = (e) => {
    postValue(e.target.name, e.target.value);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__header">
        <span className="form__header_title">Редактировать</span>
        <Button className="form__header_btnClose">Сохранить</Button>
        <Link to="/" onClick={clear}>
          <Button className="form__header_btnClose">Закрыть</Button>
        </Link>
      </div>

      <label className="label">
        <span className="form__text">Заголовок *</span>
        <input
          type="text"
          className="form__input input"
          name="title"
          maxLength="30"
          onChange={(e) => {
            setTitle(e.target.value);
            saveValueInput(e);
          }}
          value={getValue("title") ? getValue("title") : ""}
          required
        />
      </label>

      <label className="label">
        <span className="form__text">Автор *</span>
        {authorsBook.map((author, index) => (
          <InputAuthor
            key={index}
            index={index}
            onChange={changeAuthorCount}
            delInputAuthor={delInputAuthor}
            saveValueInput={saveValueInput}
            book={book}
          />
        ))}
        <Button type="button" onClick={addAuthor} className="form__btnAdd">
          +
        </Button>
      </label>

      <label className="label">
        <span className="form__text">Количество страниц *</span>
        <input
          type="number"
          className="form__input input"
          name="numberOfPages"
          max="1000"
          min="1"
          onChange={(e) => {
            console.log("hi");
            setNumberOfPages(e.target.value);
            saveValueInput(e);
          }}
          value={getValue("numberOfPages") ? getValue("numberOfPages") : ""}
          required
        />
      </label>

      <label className="label">
        <span className="form__text">Название издательства</span>
        <input
          type="text"
          className="form__input input"
          name="publisherName"
          onChange={(e) => {
            setPublisherName(e.target.value);
            saveValueInput(e);
          }}
          maxLength="30"
          value={getValue("publisherName") ? getValue("publisherName") : ""}
        />
      </label>

      <label className="label">
        <span className="form__text">Год публикации</span>
        <input
          type="number"
          className="form__input input"
          name="publicationYear"
          onChange={(e) => {
            setPublicationYear(e.target.value);
            saveValueInput(e);
          }}
          min="1800"
          value={getValue("publicationYear") ? getValue("publicationYear") : ""}
        />
      </label>

      <label className="label">
        <span className="form__text">Дата выхода в тираж</span>
        <input
          type="date"
          className="form__input input"
          name="eleaseDate"
          onChange={(e) => {
            saveValueInput(e);
            setEleaseDate(e.target.value);
          }}
          min="1800-01-01"
          value={getValue("eleaseDate") ? getValue("eleaseDate") : ""}
        />
      </label>

      <label className="label">
        <span className="form__text">ISBN</span>
        <input
          type="number"
          className="form__input input"
          name="isbn"
          onChange={(e) => {
            saveValueInput(e);
            setIsbn(e.target.value);
          }}
          min="12"
          value={getValue("isbn") ? getValue("isbn") : ""}
        />
      </label>

      <label className="label">
        <span className="form__text">Изображение</span>
        <input
          type="file"
          className="form__input  inputFile"
          name="image"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file && file.type.substr(0, 5) === "image") {
              setImage(file);
            } else {
              setImage(null);
            }
          }}
        />
      </label>
    </form>
  );
};

export default FormEdit;
