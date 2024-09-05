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
  const { loading, setLoading, data, error } = useFetch(() => fetchRecipesByPage(page, limit), [page]);
  const [filteredData, setFilteredData] = useState([]);

  // Veri geldikten sonra filteredData'yı doldur
  useEffect(() => {
    if (!loading && data) {
      setFilteredData([...data.recipes]);
    }
  }, [loading, data]);

  return (
    <>
      <div className="container">
        {data && (
          <SearchBar
            setLoading={setLoading}
            data={data.recipes}
            filteredData={filteredData}
            setFilteredData={setFilteredData}
          />
        )}
        <div className="recipes-container">
          {filteredData.length > 0 && !loading ? (
            filteredData.map((x) => (
              <div className="recipes-item" key={x.id}>
                <p>{x.name}</p>
                <img src={x.image} alt={x.name} />

                {/* Acordion start */}
                <details>
                  <summary>Malzemeler</summary>
                  <div className="ingredients">
                    <h3>Malzemeler</h3>
                    <ul>
                      {x.ingredients &&
                        x.ingredients.map((ingredient, i) => (
                          <li key={i}>{ingredient}</li>
                        ))}
                    </ul>
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
                {/* Acordion end */}
              </div>
            ))
          ) : !loading && filteredData.length === 0 ? (
            <h1>İçerik bulunamadı</h1>
          ) : (
            ""
          )}

          {loading && (
            <div>
              <Spinner />
            </div>
          )}


        </div>

        {error && <div>Error...</div>}
        {data && (
          <Pagination page={page} setPage={setPage} limit={limit} total={data.total} />
        )}

      </div>


    </>
  );
};
