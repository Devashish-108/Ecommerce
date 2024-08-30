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
        }}
      >
        <h3>Top Categories</h3>
      </div>
      <div className="imagebar">
        <div className="imgdiv" onClick={() => navigate(`/category/vegetable`)}>
          <img
            src="https://www.google.com/imgres?q=vegetables&imgurl=https%3A%2F%2Fcdn.britannica.com%2F17%2F196817-159-9E487F15%2Fvegetables.jpg&imgrefurl=https%3A%2F%2Fwww.britannica.com%2Ftopic%2Fvegetable&docid=s6d9O2zDiOMrvM&tbnid=kX7jpz5x7pKjOM&vet=12ahUKEwjc6-W7yfmHAxW3XmwGHQu4B9kQM3oECHwQAA..i&w=1920&h=1080&hcb=2&ved=2ahUKEwjc6-W7yfmHAxW3XmwGHQu4B9kQM3oECHwQAA"
            alt=""
            className="img1"
          />
          <span>Vegetable</span>
        </div>
        <div
          className="imgdiv"
          onClick={() => navigate(`/category/fruits`)}
        >
          <img
            src="https://www.bighaat.com/cdn/shop/files/Web-tiles_insecticides_0e8b5874-8a86-4780-9be2-c475c620b4c2_720x.jpg?v=1690622271"
            alt=""
            className="img1"
          />
          <span>Fruits</span>
        </div>
        <div
          className="imgdiv"
          onClick={() => navigate(`/category/snacks`)}
        >
          <img
            src="https://www.bighaat.com/cdn/shop/files/Web-tiles_growth-promoters_53b40bcd-3fbb-463a-9e80-606491c74bd3_720x.jpg?v=1690622598"
            alt=""
            className="img1"
          />
          <span>Snacks</span>
        </div>
        <div
          className="imgdiv"
          onClick={() => navigate(`/category/beverages`)}
        >
          <img
            src="https://www.bighaat.com/cdn/shop/files/Web-tiles_fungicides_161c08ff-faf6-4e87-b8fc-50b4ff9bac97_720x.jpg?v=1690622309"
            alt=""
            className="img1"
          />
          <span>Beverages</span>
        </div>
        <div
          className="imgdiv"
          onClick={() => navigate(`/category/your-daily-staples`)}
        >
          <img
            src="https://www.bighaat.com/cdn/shop/files/Web-tiles_Implements_2bf941e5-f0f6-4a74-bd0b-06d00fb5223e_720x.jpg?v=1690622429"
            alt=""
            className="img1"
          />
          <span>Your Daily staples</span>
        </div>
        <div className="imgdiv" onClick={() => navigate(`/category/home-and-kitchen`)}>
          <img
            src="https://www.bighaat.com/cdn/shop/files/Circle-KB-204_720x.jpg?v=1648637300"
            alt=""
            className="img1"
          />
          <span>Home and Kitchen</span>
        </div>
      </div>
      <div className="offercon">
        <img src={o1} alt="" className="omg" />
        <img src={o2} alt="" className="omg" />
        <img src={o3} alt="" className="omg" />
      </div>

      <div className="container-fluid row mt-3 home-page">
        <div
          className="col-md-3 filters"
          style={{
            backgroundColor: "rgb(238, 243, 238)",
            borderTopRightRadius: "15px",
          }}
        >
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column ms-3">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* price filter */}
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
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
              <div className="card m-2" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <img
                  src={`https://ecommerce-eeqh.onrender.com/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  style={{ objectFit: 'cover', height: '200px', width: '100%' }} 
                />
                <div className="card-body d-flex flex-column">
                  <div className="card-name-price d-flex justify-content-between">
                    <h5 className="card-title">{p.name}</h5>
                    <h5 className="card-title card-price">
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </h5>
                  </div>
                  <p className="card-text">
                    {p.description.substring(0, 60)}...
                  </p>
                  <div className="mt-auto d-flex justify-content-between">
                    <button
                      className="btn btn-info mode"
                      style={{ transition: "background-color 0.3s" }}
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-dark"
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
