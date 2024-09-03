import React, { useState } from "react";
import { fetchProductsByPage } from "../../services/products";
import { useFetch } from "../../hooks/useFetch";
import { Pagination } from "../pagination/Pagination";
import { Spinner } from "../base/Spinner";

export const Products = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { loading, data, error } = useFetch(() => fetchProductsByPage(page, limit), [page]);

  return (
    <>
      <div>{data && !loading ? data.products.map((product) => <li>{product.title}</li>) : !loading && "İçerik bulunamadı"}</div>
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
