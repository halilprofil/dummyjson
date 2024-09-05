import React, { useState, useEffect } from "react";
import { fetchProductsByPage } from "../../services/products";
import { useFetch } from "../../hooks/useFetch";
import { Pagination } from "../pagination/Pagination";
import { Spinner } from "../base/Spinner";
import { SearchBar } from "../searchbar/SearchBar";
import "./products.css";

export const Products = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const { loading, data, error } = useFetch(() => fetchProductsByPage(page, limit), [page]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (data) {
      setFilteredData(data.products.filter((product) => product.title.toLowerCase().includes(searchTerm.toLowerCase())));
    }
  }, [searchTerm, data]);

  return (
    <>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="productsContainer">
        {filteredData.length > 0 && !loading
          ? filteredData.map((product) => (
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
          : !loading && "No products found"}
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
