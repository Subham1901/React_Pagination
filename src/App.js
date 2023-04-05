import "./styles.css";
import { useEffect, useState } from "react";
export default function App() {
  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(1);

  const getAllProduct = async () => {
    fetch("https://dummyjson.com/products")
      .then(async (data) => {
        const json = await data.json();
        setProduct(json.products);
      })
      .catch((Err) => {
        console.log(Err.message);
      });
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  const selectPageHandler = (i) => {
    setPage(i + 1);
  };

  return (
    <div className="App">
      <h1>React Pagination</h1>
      <div className="product-container">
        {product.slice(page * 10 - 10, page * 10).map((data) => (
          <div key={data.id} className="product">
            <img className="product-image" src={data.thumbnail} />
            <h4>{data.title}</h4>
          </div>
        ))}
      </div>
      <div>
        {page !== 1 && <span onClick={() => setPage(page - 1)}>⬅️</span>}
        {[...Array(Math.ceil(product.length / 10))].map((data, i) => (
          <button
            className={page === i + 1 ? "page-sel" : "default"}
            key={i}
            onClick={() => selectPageHandler(i)}
          >
            {i + 1}
          </button>
        ))}
        {page !== product.length / 10 && (
          <span onClick={() => setPage(page + 1)}>➡️</span>
        )}
      </div>
    </div>
  );
}
