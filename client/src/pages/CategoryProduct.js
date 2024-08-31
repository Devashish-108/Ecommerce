import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import "./CategoryProduct.css";
import axios from "axios";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getProductsByCategory();
  }, [params?.slug]);

  const getProductsByCategory = async () => {
    try {
      const { data } = await axios.get(
        `https://ecommerce-eeqh.onrender.com/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="category-header text-center">
          <h4 className="category-title">Category - {category?.name}</h4>
          <h6 className="results-found">{products?.length} result found</h6>
        </div>
        <div className="row">
          {products?.map((p) => (
            <div className="col-md-4 mb-4" key={p._id}>
              <div className="product-card">
                <img
                  src={`https://ecommerce-eeqh.onrender.com/api/v1/product/product-photo/${p._id}`}
                  className="product-img"
                  alt={p.name}
                />
                <div className="product-details">
                  <h5 className="product-name">{p.name}</h5>
                  <h5 className="product-price">
                    {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </h5>
                  <p className="product-description">
                    {p.description.substring(0, 60)}...
                  </p>
                  <div className="product-buttons">
                    <button
                      className="btn btn-info"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    {/* <button
                      className="btn btn-dark"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}
                    >
                      ADD TO CART
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
