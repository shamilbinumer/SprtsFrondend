import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../../Navbar/Navbar'
import './ProductDetailsCustomer.scss'
import { PiShoppingCartFill } from "react-icons/pi";
import { FaHeartCirclePlus } from "react-icons/fa6";
import { FaHeartCircleCheck } from "react-icons/fa6";

const ProductDetailsCustomer = () => {
  let product_id
  let StockArray=[]
  let Size;
  const [loading, setLoading] = useState(true);




  const { id } = useParams()
  // console.log(id);
  const [msg, setMsg] = useState("")
  const [cartItems, setCartItems] = useState([])
  const [wishlistItems, setWishlistItems] = useState([])
  const value = JSON.parse(localStorage.getItem('customer_token'));
  const [getProducts, setProduct] = useState({
    cust_id: "",
    prod_id: "",
    product_name: "",
    category: "",
    description: "",
    price: "",
    size: "",
    quantity: "",
    banner: "",
    images: []
  })
  useEffect(() => {
    if (msg) {
      getPrdctDetails();
      getWishListDetails();
    }
  }, [msg]);


  // const [products_id, setProductId] = useState(null);

  const getPrdctDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:7000/sportstrack/getCartProduct/${msg.id}`);
      setCartItems(res.data);
      // console.log(res.data);
      // console.log("All prod_id in cartItems:", cartItems.map(item => item.prod_id));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setLoading(false);
    }

  };
  // const isInCart = cartItems.some((data) => data.prod_id === getProducts._id);

  useEffect(() => {
    getPrdctDetails();
  }, []);


  const getWishListDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:7000/sportstrack/getWishlistProduct/${msg.id}`);
      // console.log("widh list",res.data[0]);
      setWishlistItems(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getWishListDetails();
  }, []);


  const getProduct = async () => {
    const res = await axios.get(`http://localhost:7000/sportstrack/getProduct/${id}`)
    setProduct(res.data)
    product_id = res.data._id
    console.log(getProducts._id);
    // StockArray.push(res.data.stock)
    // console.log(StockArray[0]);
  }

  useEffect(() => {
    getProduct()
  }, [])

  const getName = async () => {
    const res = await axios.get("http://localhost:7000/sportstrack/CustHome", {
      headers: { Authorization: `Bearer ${value}` },
    })
    setMsg(res.data)
    // console.log(msg);
  }
  useEffect(() => {
    getName()
  }, [])



  const selectSize = (e) => {
    Size = e.target.value;
    // console.log(Size);
  }


  const addToCart = async () => {
    try {
      if(msg.length==0){
        alert("Please login for more options")
        return
      }

      if (!Size || Size.trim() === "") {
        alert("Please select the size");
        return;
      }
      const res = await axios.post("http://localhost:7000/sportstrack/addToCart", { ...getProducts, size: Size, cust_id: msg.id, quantity: 1, prod_id: product_id });
      console.log(res.data);
      
      if (res) {
        alert("Added To Cart")
        window.location.reload();
      } else {
        alert("Error adding product to cart. Please try again.")
      }
    } catch (error) {
      console.error("Error adding product to cart12:", error);
      alert("Error adding product to cart. Please try again.");
    }
  };

  const addToWishList = async () => {
    try {
      if(msg.length==0){
        alert("Please login for more options")
        return
      }
      const res = await axios.post("http://localhost:7000/sportstrack/addToWhishList", { ...getProducts, size: Size, cust_id: msg.id, prod_id: getProducts._id });
      console.log(res.data);
      
      if (res) {
       
        alert("Added To Wishlist")
        window.location.reload();
      } else {
        alert("Error adding product to Wishlist. Please try again.")
      }
    } catch (error) {
      console.error("Error adding product to Wishlist:", error);
      alert("Error adding product to Wishlist. Please try again.");
    }
  };
  return (
    <div className='ProductDetailsCustomerMain'>
      <Navbar />
      <div className="ProductDetailsMain">
        <div className="ProductDetailsLeft">
          <div className="images-main">
            <div className="image">
              {getProducts.images && getProducts.images[0] && (<img src={getProducts.images[0]} alt="" />)}
            </div>
            <div className="image">
              {getProducts.images && getProducts.images[0] && (<img src={getProducts.images[1]} alt="" />)}
            </div>
          </div>
          <div className="images-main">
            <div className="image">
              {getProducts.images && getProducts.images[0] && (<img src={getProducts.images[2]} alt="" />)}
            </div>
            <div className="image">
              {getProducts.images && getProducts.images[0] && (<img src={getProducts.images[3]} alt="" />)}
            </div>
          </div>

        </div>
        <div className="ProductDetailsRight">
          <p className="prod_name">{getProducts.product_name}</p>
          <h3 className="prod_discription">{getProducts.description}</h3>
          <p className="og_price"><strike>₹ 899</strike></p>
          <span className="price">₹ {getProducts.price}</span>
          <div className='select_size'>
            {/* <p>Select Size</p> */}
            <select name="size" id="" onChange={selectSize}>
              <option className='option'>Select Size</option>
              <option className='option' name='xs' value="xs">XS</option>
              <option className='option' name='s' value="s">S</option>
              <option className='option' name='m' value="m">M</option>
              <option className='option' name='l' value="l">L</option>
              <option className='option' name='xl' value="xl">XL</option>
              <option className='option' name='xxl' value="xxl">XXL</option>
            </select>
          </div>
          <div className="btns">
            {/* ////////////////ADDTO CART BTN///////////// */}
            {cartItems.map(item => item.prod_id).includes(getProducts._id) ? (
              <button className='addToCartBtn'>
                <Link className='gotocart' to={`/cart/${msg.id}`}>
                  GOTO CART <PiShoppingCartFill className='add-icon' />
                </Link>
              </button>
            ) : (
              <button className='addToCartBtn' onClick={addToCart}>
                ADD TO CART <PiShoppingCartFill className='add-icon' />
              </button>
            )}
            {/* //////////////////END////////////////// */}
            {/* /////////////////ADD TO WISHLIST BTN/////////////// */}
            {wishlistItems.map(item => item.prod_id).includes(getProducts._id) ? (
              <button className='AddedWhishListBtn'> ADDED TO WHISHLIST <FaHeartCircleCheck className='add-icon' />
              </button>
            ) : (
              <button className='WhishListBtn' onClick={addToWishList}>
                ADD TO WHISHLIST <FaHeartCirclePlus className='add-icon' />
              </button>
            )}
            {/* ///////////////////END////////////////// */}
          </div>
        </div>
      </div>

    </div>
  )
}

export default ProductDetailsCustomer
