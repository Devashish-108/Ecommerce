import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "./../components/Layout/Layout";
import { AiOutlineReload } from "react-icons/ai";
import "../styles/Homepage.css";
import { Carousel, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Slider from "react-slick";
import a1 from "./image2/banner2.jpg";
import a2 from "./image2/banner3.jpg";
import a3 from "./image2/banner4.jpg";
import o1 from "./image2/offer1.avif";
import o2 from "./image2/offer2.avif";
import o3 from "./image2/offer3.avif";
import a4 from "./image2/slider-1.png";
import a5 from "./image2/slider-2.png";
import veg from "./image2/veg.png" ;
import fruit from "./image2/fruit.png" ;
import snacks from "./image2/snacks.png" ;
import beverages from "./image2/beverages.png" ;
import staples from "./image2/staples.png" ;
import kitchen from "./image2/kitchen.png" ;
import "./Home.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get all cat
  const contentStyle = {
    height: "auto",
    // height: "300px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
    width: "100%",
    margin: "auto",
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("https://ecommerce-eeqh.onrender.com/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`https://ecommerce-eeqh.onrender.com/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get("https://ecommerce-eeqh.onrender.com/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`https://ecommerce-eeqh.onrender.com/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("https://ecommerce-eeqh.onrender.com/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"ALL Products - Best offers "}>
      {/* banner image */}
      {/* banner image */}
      <Carousel
        autoplay
        prevArrow={
          <Button
            type="primary"
            shape="circle"
            icon={<LeftOutlined />}
            size="large"
          />
        }
        nextArrow={
          <Button
            type="primary"
            shape="circle"
            icon={<RightOutlined />}
            size="large"
          />
        }
      >
        <div>
          <h3 style={{ position: "relative", textAlign: "center" }}>
            <img
              src={a4}
              alt=""
              className="img2"
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
            <div
              className="info"
              style={{
                position: "absolute",
                top: "50%",
                left: "30%",
                transform: "translate(-50%, -50%)",
                color: "black",
                fontSize: "24px",
              }}
            >
              <h2
                className="mb-4"
                style={{ fontSize: "90px", fontWeight: "bolder" }}
              >
                Fresh Vegetables
                <br />
                Big discount
              </h2>
            </div>
            {/* Text on top of the image */}
          </h3>
        </div>
        <div>
          <h3>
            <img
              src={a5}
              alt=""
              className="img2"
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
            <div
              className="info"
              style={{
                position: "absolute",
                top: "50%",
                left: "47%",
                transform: "translate(-50%, -50%)",
                color: "black",
                fontSize: "24px",
              }}
            >
              <h2
                className="mb-4"
                style={{ fontSize: "90px", fontWeight: "bolder" }}
              >
                Don’t miss amazing
                <br />
                grocery deals
              </h2>
            </div>
          </h3>
        </div>
        {/* <div>
          <h3 style={contentStyle}>
            <img
              src={a3}
              alt=""
              className="img2"
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </h3>
        </div> */}
      </Carousel>
      <div
  style={{
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    marginTop: "2rem",
    textDecoration: "underline",
    fontWeight: "bold",
    color: "green",
    fontSize: "24px",
  }}
>
  <h3>Top Categories</h3>
</div>
<div className="imagebar">
  <div className="imgdiv" onClick={() => navigate(`/category/vegetable`)}>
    <img
      src={veg}
      alt="Vegetables"
      className="img1"
    />
    <span>Vegetables</span>
  </div>
  <div className="imgdiv" onClick={() => navigate(`/category/fruits`)}>
    <img
      src={fruit}
      alt="Fruits"
      className="img1"
    />
    <span>Fruits</span>
  </div>
  <div className="imgdiv" onClick={() => navigate(`/category/snacks`)}>
    <img
      src={snacks}
      alt="Snacks"
      className="img1"
    />
    <span>Snacks</span>
  </div>
  <div className="imgdiv" onClick={() => navigate(`/category/beverages`)}>
    <img
      src={beverages}
      alt="Beverages"
      className="img1"
    />
    <span>Beverages</span>
  </div>
  <div className="imgdiv" onClick={() => navigate(`/category/your-daily-staples`)}>
    <img
      src={staples}
      alt="Daily Staples"
      className="img1"
    />
    <span>Your Daily Staples</span>
  </div>
  <div className="imgdiv" onClick={() => navigate(`/category/home-and-kitchen`)}>
    <img
      src={kitchen}
      alt="Home and Kitchen"
      className="img1"
    />
    <span>Home and Kitchen</span>
  </div>
</div>
{/* <div className="offercon">
  <img src={o1} alt="Offer 1" className="offer-img" />
  <img src={o2} alt="Offer 2" className="offer-img" />
  <img src={o3} alt="Offer 3" className="offer-img" />
</div> */}

      <div className="container-fluid row mt-3 home-page">
      <div
  className="col-md-3 filters"
  style={{
    backgroundColor: "#f9f9f9", // Light gray background for a subtle contrast
    borderTopRightRadius: "15px",
    padding: "1rem",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e0e0e0", // Slightly darker border for subtle separation
  }}
>
  <h4 className="text-center" style={{ marginBottom: "1rem", color: "#343a40" }}>Filter By Category</h4>
  <div className="d-flex flex-column">
    {categories?.map((c) => (
      <Checkbox
        key={c._id}
        onChange={(e) => handleFilter(e.target.checked, c._id)}
        style={{ marginBottom: "0.5rem", color: "#495057" }} // Darker gray for checkbox text
      >
        {c.name}
      </Checkbox>
    ))}
  </div>

  <h4 className="text-center mt-4" style={{ marginBottom: "1rem", color: "#343a40" }}>Filter By Price</h4>
  <div className="d-flex flex-column">
    <Radio.Group onChange={(e) => setRadio(e.target.value)}>
      {Prices?.map((p) => (
        <Radio key={p._id} value={p.array} style={{ marginBottom: "0.5rem", color: "#495057" }}>
          {p.name}
        </Radio>
      ))}
    </Radio.Group>
  </div>

  <div className="text-center mt-4">
    <button
      className="btn btn-outline-secondary"
      style={{
        borderRadius: "20px",
        padding: "0.5rem 1.5rem",
        border: "2px solid #6c757d", // Secondary color border
        color: "#6c757d", // Secondary color text
        backgroundColor: "#ffffff", // White background
        transition: "background-color 0.3s, color 0.3s",
      }}
      onClick={() => window.location.reload()}
    >
      RESET FILTERS
    </button>
  </div>
</div>

        <div className="col-md-9">
        <h1 className="text-center">All Products</h1>
        <div className="row" style={{ gap: '80px', padding: '0 50px' }}>
  {products?.map((p) => (
    <div className="col-sm-6 col-md-4 col-lg-3" key={p._id}>
      <div 
        className="card m-2" 
        style={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column', 
          borderRadius: '15px', 
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease'
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-10px)';
          e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        }}
      >
        <img
          src={`https://ecommerce-eeqh.onrender.com/api/v1/product/product-photo/${p._id}`}
          className="card-img-top"
          alt={p.name}
          style={{ 
            objectFit: 'cover', 
            height: '200px', 
            width: '100%', 
            borderTopLeftRadius: '15px',
            borderTopRightRadius: '15px'
          }} 
        />
        <div className="card-body d-flex flex-column">
          <div className="card-name-price d-flex justify-content-between">
            <h5 className="card-title" style={{ fontWeight: 'bold' }}>{p.name}</h5>
            <h5 className="card-title card-price" style={{ color: 'green', fontWeight: 'bold' }}>
              {p.price.toLocaleString("en-US", {
                style: "currency",
                currency: "INR",
              })}
            </h5>
          </div>
          <p className="card-text" style={{ color: '#666' }}>
            {p.description.substring(0, 60)}...
          </p>
          <div className="mt-auto d-flex justify-content-between">
            <button
              className="btn btn-info mode"
              style={{ 
                backgroundColor: '#007bff',
                color: 'white',
                borderRadius: '10px',
                transition: "background-color 0.3s" 
              }}
              onClick={() => navigate(`/product/${p.slug}`)}
            >
              More Details
            </button>
            <button
              className="btn btn-dark"
              style={{ 
                borderRadius: '10px',
                backgroundColor: '#28a745',
                color: 'white',
                transition: "background-color 0.3s"
              }}
              onClick={() => {
                setCart([...cart, p]);
                localStorage.setItem("cart", JSON.stringify([...cart, p]));
                toast.success("Item Added to cart");
              }}
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>

        <div className="m-2 p-3 text-center">
          {products && products.length < total && (
            <button
              className="btn loadmore"
              onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}
            >
              {loading ? (
                "Loading ..."
              ) : (
                <>
                  Loadmore <AiOutlineReload />
                </>
              )}
            </button>
          )}
        </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
