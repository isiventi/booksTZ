import React, { useState, useEffect } from "react";

import cn from "classnames";
import "./sort.css";

function Sort({ sortTitle, sortYear }) {
  let [activeBtnTitle, setActiveBtnTitle] = useState(true);
  let [activeBtnYear, setActiveBtnYear] = useState(false);
  let btnActiv = "btnActiv";

  useEffect(() => {
    if (activeBtnTitle) {
      sortTitle();
    } else if (activeBtnYear) {
      sortYear();
    }
  }, [activeBtnTitle, activeBtnYear]);

  const onClickBtn = () => {
    setActiveBtnTitle(!activeBtnTitle);
    setActiveBtnYear(!activeBtnYear);
  };

  return (
    <div className="sort">
      <span className="sort__text">Сортировать по:</span>
      <button
        className={cn("sort__btnTitle btn", { [btnActiv]: activeBtnTitle })}
        onClick={onClickBtn}
      >
        по заголовку
      </button>
      <button
        className={cn("sort__btnYear btn", { [btnActiv]: activeBtnYear })}
        onClick={onClickBtn}
      >
        по году
      </button>
    </div>
  );
}

export default Sort;
