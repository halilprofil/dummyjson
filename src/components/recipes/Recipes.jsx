import React, { useEffect, useState } from "react";
import { fetchRecipesByPage } from "../../services/recipes";
import { Pagination } from "../pagination/Pagination";
import { useFetch } from "../../hooks/useFetch";
import { Spinner } from "../base/Spinner";

export const Recipes = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { loading, data, error } = useFetch(() => fetchRecipesByPage(page, limit), [page]);

  return (
    <>
      <div>
        {data && !loading
          ? data.recipes.map((recipe) => (
              <li key={recipe.id}>
                <img width={50} src={recipe.image} alt="" />
                {recipe.name}
              </li>
            ))
          : !loading && "İçerik bulunamadı"}
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
