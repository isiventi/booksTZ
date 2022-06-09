import React, { useState, useEffect } from "react";
import { getValue, clear } from "../../services/request";
import { Button } from "../../ui/Button";

const InputAuthor = ({
  index,
  onChange,
  delInputAuthor,
  saveValueInput,
  book,
}) => {
  let [lastName, setLastName] = useState(getValue(`lastName-${index}`));
  let [firstName, setFirstName] = useState(getValue(`firstName-${index}`));

  useEffect(() => {
    if (lastName && firstName) {
      onChange(index, `${lastName} ${firstName}`, lastName, firstName);
    }
  }, [lastName, firstName]);

  return (
    <div>
      <input
        type="text"
        onChange={(e) => {
          setFirstName(e.currentTarget.value);
          saveValueInput(e);
        }}
        className="form__input inputAuthor"
        placeholder="Имя"
        maxLength="20"
        required
        name={`firstName-${index}`}
        value={
          getValue(`firstName-${index}`) ? getValue(`firstName-${index}`) : ""
        }
      />

      <input
        type="text"
        onChange={(e) => {
          setLastName(e.currentTarget.value);
          saveValueInput(e);
        }}
        className="form__input inputAuthor"
        placeholder="Фамилия"
        maxLength="20"
        required
        name={`lastName-${index}`}
        value={
          getValue(`lastName-${index}`) ? getValue(`lastName-${index}`) : ""
        }
      />

      {index > 0 ? (
        <span
          className="form__inputDel"
          onClick={() => {
            delInputAuthor(index);
          }}
        >
          Х
        </span>
      ) : null}
    </div>
  );
};

export default InputAuthor;
