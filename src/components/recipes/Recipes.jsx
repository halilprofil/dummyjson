import React, { useEffect, useState } from "react";
import { fetchRecipesByPage } from "../../services/recipes";
import { Pagination } from "../pagination/Pagination";
import { useFetch } from "../../hooks/useFetch";
import { Spinner } from "../base/Spinner";
import { SearchBar } from "../searchbar/SearchBar";
import "./recipes.css";

export const Recipes = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { loading, data, error } = useFetch(() => fetchRecipesByPage(page, limit), [page]);
  const [filteredData, setFilteredData] = useState([]);

  return (
    <>
      <div className="container">
        <SearchBar data={data} filteredData={filteredData} setFilteredData={setFilteredData} />
        <div className="recipes-container">
          {data && !loading
            ? data.recipes.map((x) => (
                <div className="recipes-item" key={x.id}>
                  <p>{x.name}</p>
                  <img src={x.image} alt={x.name} />

                  {/* /* /* acordion start */}

                  <details>
                    <summary>Malzemeler</summary>
                    <div className="ingredients">
                      <h3>Malzemeler</h3>
                      <ul>{x.ingredients && x.ingredients.map((ingredient, i) => <li key={i}>{ingredient}</li>)}</ul>
                    </div>
                  </details>

                  <details>
                    <summary>Hazırlanış</summary>
                    <div className="instructions">
                      <h3>Hazırlanış</h3>
                      <ol>
                        {x.instructions &&
                          x.instructions.map((instruction, i) => (
                            <li type="number" key={i}>
                              {instruction}
                            </li>
                          ))}
                      </ol>
                    </div>
                  </details>
                </div>

                /* acordion end */
              ))
            : !loading && "İçerik bulunamadı"}
        </div>
      </div>
      {loading && (
        <div>
          <Spinner />
        </div>
      )}
      {error && <div>Error...</div>}
      {data && <Pagination page={page} setPage={setPage} limit={limit} total={data.total} />}
    </>
  );
};
