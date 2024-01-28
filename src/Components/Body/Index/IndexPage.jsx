import React, { useEffect, useState } from 'react'
import Navbar from '../../Navbar/Navbar'
import Footer from '../../Footer/Footer'
import './Index.scss'
import { Link } from 'react-router-dom'
import { TfiAngleRight } from "react-icons/tfi";
import { TfiAngleLeft } from "react-icons/tfi";
import axios from 'axios'
// import './index.js'

const IndexPage = () => {
  const [getProducts,setProducts]=useState([])
  
  // http://localhost:7000/sportstrack/getAllProducts
  const getAllProducts=async()=>{
    const res=await axios.get("http://localhost:7000/sportstrack/getAllProducts") 
    // console.log(res.data);
    setProducts(res.data)
    console.log(getProducts);
  }
  useEffect(()=>{
    getAllProducts()
  },[])
  return (
    <div className='index-page-main'>
        <Navbar/>
        <div className="banner">
        <div className="banner-content">
          <h1>Sports Track.</h1>
          <div className="ul"></div>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis nemo nobis quasi vel! Vel in, iste pariatur odio inventore hic officia eius et. Sit suscipit quaerat, ex quis vitae blanditiis.</p>
          <Link className='order-btn'>Order Now</Link>
        </div>
        </div>

    

        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="./../../../../public/Frame 427321129.avif" className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="./../../../../public/Frame 427321139.avif" className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="./../../../../public/Frame 427321191.avif" className="d-block w-100" alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
  <TfiAngleLeft  className='angle'/>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
  <TfiAngleRight className='angle'/>
    <span className="visually-hidden">Next</span>
  </button>
</div>

<div className="category-main">
      <div className="cat-heading">
        <h3>Lets Choose Your Choice</h3>
        <div className="cat-ul"></div>
      </div>
      <div className="ctgry-list">
        <div className="ctgry-images">
         <a href="#kids"><h3>Kids</h3></a>         
          {/* <img src="../../../../public/kids.jpg" alt="" /> */}
          </div>
        <div className="ctgry-images">
       <a href="#men"> <h3>Men</h3></a>
          {/* <img src="../../../../public/gym.jpg" alt="" /> */}
          </div>
        <div className="ctgry-images">
        <a href="#women"><h3>Women</h3></a>
          {/* <img src="../../../../public/men (1).jpg" alt="" /> */}
          </div>
        <div className="ctgry-images">
       <a href="#Gym"> <h3>Gym Wear</h3></a>
          {/* <img src="../../../../public/sports.jpg" alt="" /> */}
          </div>
      </div>
       
    </div>

    <div className="categoreis-products">
     <div className="cat-product-heading">
     <h3 id='kids'>Kids Collection</h3>
      <div className="cat-ul"></div>
     </div>
  
    <div className="collection-cards">
   {
     getProducts.filter((data) => data.category === 'Kids')
     .map((data, index) => (
       <Link className='link' key={index} to={`/productDetailsCustomer/${data._id}`}>
         <div className="Card"><div className="prdct-thumnalil"><img src={data.banner} alt="" /></div>
     <div className="card-details">
     <p className='item-title'>{data.product_name}</p>
     <div><span className="prdct-description">{data.description}</span></div>
    <div className="prices">
    <div><p className='price'>₹ {data.price}</p></div>
    <div><strike><p className='og-price'>₹ 799</p></strike></div>
    </div>
     </div>
      </div>
       </Link>
     ))
   }
    </div>
    
    </div>
    <div className="categoreis-products">
     <div className="cat-product-heading">
     <h3 id='women'>Womens Collection</h3>
      <div className="cat-ul"></div>
     </div>
     <div className="collection-cards">
       {
     getProducts.filter((data) => data.category === 'Women')
     .map((data, index) => (
       <Link className='link' key={index} to={`/productDetailsCustomer/${data._id}`}>
         <div className="Card"><div className="prdct-thumnalil"><img src={data.banner} alt="" /></div>
     <div className="card-details">
     <p className='item-title'>{data.product_name}</p>
     <div><span className="prdct-description">{data.description}</span></div>
    <div className="prices">
    <div><p className='price'>₹ {data.price}</p></div>
    <div><strike><p className='og-price'>₹ 799</p></strike></div>
    </div>
     </div>
      </div>
       </Link>
     ))
   }
   </div>
    </div>
    <div className="categoreis-products">
     <div className="cat-product-heading">
     <h3 id='men'>Men Collection</h3>
      <div className="cat-ul"></div>
     </div>
     <div className="collection-cards">

     {
     getProducts.filter((data) => data.category === 'Men')
     .map((data, index) => (
       <Link className='link' key={index} to={`/productDetailsCustomer/${data._id}`}>
         <div className="Card"><div className="prdct-thumnalil"><img src={data.banner} alt="" /></div>
     <div className="card-details">
     <p className='item-title'>{data.product_name}</p>
     <div><span className="prdct-description">{data.description}</span></div>
    <div className="prices">
    <div><p className='price'>₹ {data.price}</p></div>
    <div><strike><p className='og-price'>₹ 799</p></strike></div>
    </div>
     </div>
      </div>
       </Link>
     ))
   }

     
      
    </div>
    </div>

    <div className="categoreis-products">
     <div className="cat-product-heading">
     <h3 id='Gym'>Gym Wear Collection</h3>
      <div className="cat-ul"></div>
     </div>
     <div className="collection-cards">

     {
     getProducts.filter((data) => data.category === 'Gym Wears')
     .map((data, index) => (
       <Link className='link' key={index} to={`/productDetailsCustomer/${data._id}`}>
         <div className="Card"><div className="prdct-thumnalil"><img src={data.banner} alt="" /></div>
     <div className="card-details">
     <p className='item-title'>{data.product_name}</p>
     <div><span className="prdct-description">{data.description}</span></div>
    <div className="prices">
    <div><p className='price'>₹ {data.price}</p></div>
    <div><strike><p className='og-price'>₹ 799</p></strike></div>
    </div>
     </div>
      </div>
       </Link>
     ))
   }

     
      
    </div>
    </div>
<Footer/>
    </div>
  )
}

export default IndexPage
