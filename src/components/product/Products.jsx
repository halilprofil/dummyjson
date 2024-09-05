import React, { useState } from "react";
import { fetchProductsByPage } from "../../services/products";
import { useFetch } from "../../hooks/useFetch";
import { Pagination } from "../pagination/Pagination";
import { Spinner } from "../base/Spinner";
import "./products.css";

export const Products = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { loading, data, error } = useFetch(() => fetchProductsByPage(page, limit), [page]);

  return (
    <>
      <div className="productsContainer">
        {data && !loading
          ? data.products.map((product) => (
              <div className="productsCard" key={product.id}>
                <img width={250} src={product.thumbnail} alt="" />
                <p style={{ fontSize: 40 }}>
                  <strong>${product.price}</strong>
                </p>
                <p>
                  <strong>{product.title}</strong>
                </p>
                <p>{product.brand}</p>
                <p>
                  <strong>Point:</strong> {product.rating}
                </p>
                <div className="pRow">
                  <p>
                    <strong>Discount:</strong> %{product.discountPercentage}
                  </p>
                  <p>
                    <strong>Stock:</strong> {product.stock}
                  </p>
                </div>
                <div className="pRow">
                  <p>
                    <strong>Category:</strong> {product.category}
                  </p>
                  <div>{product.tags.map((tag) => `#${tag}`).join(" ")}</div>
                </div>
              </div>
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
