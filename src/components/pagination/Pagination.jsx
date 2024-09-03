import React from "react";

export const Pagination = ({ page, setPage, limit, total }) => {
  const maxPage = Number(total / limit);
  console.log(maxPage);
  const pageArray = new Array(Math.ceil(maxPage)).fill(0);
  function handlePage(direction) {
    console.log(total);
    if (direction === "+") {
      setPage((prev) => {
        if (page === maxPage) return maxPage;
        return prev + 1;
      });
    } else {
      if (page === 0) return;
      setPage(page - 1);
    }
  }

  return (
    <div>
      <button value="Prev" onClick={() => handlePage("-")}>
        Previous Page
      </button>
      {pageArray.map((button, index) => (
        <button className={index + 1 === page ? "active paginator-btn" : " paginator-btn"} onClick={() => setPage(index + 1)}>
          {index + 1}
        </button>
      ))}

      <button value="Next" onClick={() => handlePage("+")}>
        Next Page
      </button>
      {page}
    </div>
  );
};
