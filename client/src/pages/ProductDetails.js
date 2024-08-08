import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import "../styles/ProductDetailsStyles.css";
import o4 from "./image2/offer4.avif";
import o5 from "./image2/img.png";
import { toast } from "react-hot-toast";
import { BsGlobeAmericas } from "react-icons/bs";
import { BsDatabaseFillLock } from "react-icons/bs";
import { FcLightAtTheEndOfTunnel } from "react-icons/fc";
import "./productdetails.css";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `https://ecommerce-eeqh.onrender.com/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div
        className="cat"
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1rem",
          color: "green",
        }}
      >
        <h2>{product?.category?.name}</h2>
      </div>
      <div className="desc" style={{ marginTop: "1rem" }}>
        <div className="descimg">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="300vh"
            width={"350vw"}
          />
        </div>
        <div
          className="descdesc"
          style={{ lineHeight: "10px", marginTop: "2rem" }}
        >
          <p style={{ fontSize: "2rem" }}>{product.name}</p>
          <p style={{ lineHeight: "20px" }}>{product?.description}</p>
          <p style={{ fontSize: "1.5rem" }}>
            Price:{" "}
            {product?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "INR",
            })}
          </p>
          <img src={o4} alt="" style={{ marginTop: "2rem" }} />
          <p style={{ marginTop: "3rem", fontWeight: "bold" }}>
            <BsGlobeAmericas /> Country of origin: India
          </p>
          <p style={{ fontWeight: "bold" }}>
            <BsDatabaseFillLock /> Secure payments
          </p>
          <p style={{ fontWeight: "bold" }}>
            <FcLightAtTheEndOfTunnel /> In stock, ready to ship
          </p>
        </div>
      </div>
      <div className="but">
        <div className="butleft">
          <img src={o5} alt="" className="butleftimg" />
        </div>
        <div className="butright">
          <button
            className="buy"
            onClick={() => {
              const id = product._id;
              let flag = 0;
              cart.forEach((ele) => {
                if (ele._id === id) flag = 1;
              });
              if (!flag) {
                setCart([...cart, product]);
                localStorage.setItem(
                  "cart",
                  JSON.stringify([...cart, product])
                );
              }
              navigate("/cart");
            }}
          >
            Buy Now
          </button>
          <button
            className="addtocart"
            onClick={() => {
              setCart([...cart, product]);
              localStorage.setItem("cart", JSON.stringify([...cart, product]));
              toast.success("Item Added to cart");
            }}
          >
            Add To Cart
          </button>
        </div>
      </div>
      <hr />
      <div className="row container similar-products">
        <h4>Similar Products ➡️</h4>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" key={p._id}>
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title">{p.name}</h5>
                  <h5 className="card-title card-price">
                    {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </h5>
                </div>
                <p className="card-text ">
                  {p.description.substring(0, 60)}...
                </p>
                <div className="card-name-price">
                  <button
                    className="btn btn-info ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  {/* <button
                    className="btn btn-dark ms-1"
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
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
