import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import './ProductDetailsAdmn.scss'

const ProductDetailsAdmn = () => {
    const {id}=useParams()
    const [getProducts,setProduct]=useState([])

    const getProduct=async()=>{
        const res=await axios.get(`http://localhost:7000/sportstrack/getProduct/${id}`)
        // console.log(res.data);
        setProduct(res.data)
        console.log(getProducts.images[0]);
    }
  
    useEffect(()=>{
        getProduct()
    },[])
  return (
    <div className='ProductDetailsAdmnMain'>
        <div className="backBtn">
            <Link className='back_btn' to={`/prooood/${getProducts.category}`}>Back</Link>
        </div>
      <div className="left_Right_main">
      <div className="ProductDetailsAdmnLeft">
        <div className="images-main">
        <div className="prod-image">
           {getProducts.images && getProducts.images[0] && (
           <img src={getProducts.images[0]} alt="" />
                )}
           </div>
            <div className="prod-image">
            {getProducts.images && getProducts.images[0] && (
           <img src={getProducts.images[1]} alt="" />
                )}
            </div>
        </div>
        <div className="images-main">
            <div className="prod-image">
            {getProducts.images && getProducts.images[0] && (
           <img src={getProducts.images[2]} alt="" />
                )}
            </div>
            <div className="prod-image">
            {getProducts.images && getProducts.images[0] && (
           <img src={getProducts.images[3]} alt="" />
                )}
            </div>
        </div>
      </div>
      <div className="ProductDetailsAdmnRight">
        <p className='prod-name'>{getProducts.product_name}</p>
        <h3 className='about-product'>{getProducts.description}</h3>
        <p className='original_price'><strike>₹ 859</strike></p>
        <p className="price">₹ {getProducts.price}</p>
        <p className="stock">Stock Availablity :</p>
        <table>
            <tr>
                <th>XS</th>
                <th>S</th>
                <th>M</th>
                <th>L</th>
                <th>XL</th>
                <th>XXL</th>
            </tr>
            <tr>
                <td>{getProducts?.stock?.xs} pcs</td>
                <td>{getProducts?.stock?.s} pcs</td>
                <td>{getProducts?.stock?.m} pcs</td>
                <td>{getProducts?.stock?.l} pcs</td>
                <td>{getProducts?.stock?.xl} pcs</td>
                <td>{getProducts?.stock?.xxl} pcs</td>
            </tr>
        </table>
       <div className='EditBtn'> <Link to={`/editProduct/${getProducts._id}`}><button>Edit Product</button></Link></div>
      </div>
      </div>
    </div>
  )
}

export default ProductDetailsAdmn
