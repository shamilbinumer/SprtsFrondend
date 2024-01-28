import React, { useEffect, useState } from 'react';
import './WishList.scss';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../Navbar/Navbar';
import { RiDeleteBinLine } from "react-icons/ri";


const WishList = () => {
    const { id } = useParams();
    const [getPrdct, setProdct] = useState([]);

    const getPrdctDetails = async () => {
        const res = await axios.get(`http://localhost:7000/sportstrack/getWishlistProduct/${id}`);
        setProdct(res.data);
        console.log(getPrdct);
    };

    useEffect(() => {
        getPrdctDetails();
    }, []);

    const delProduct = async (id) => {
        const userConfirmed = window.confirm("Are you sure you want to delete this product from the wishlist?");
        if (userConfirmed) {
            try {
                const res = await axios.delete(`http://localhost:7000/sportstrack/delWishListProduct/${id}`);
                console.log(res.data);
                getPrdctDetails();
            } catch (error) {
                console.error("Error deleting product:", error);
            }
        }
    };


    return (
        <div className='whishlist-main'>
            <Navbar />
            <div className="backBtn"><Link className='back-btn' to='/'>Back</Link></div>
            <h3 className='mainHeading'>Wishlist</h3>
            <div className="cards-main">
                {getPrdct.length === 0 ? (
                    <>
                        <p className='NoItemText'>No Items On Your Whishlist</p>
                        <div className='shpBtn'><Link className='Shp_btn' to='/'>Shop Now</Link></div>
                    </>
                ) : (
                    <>
                        {
                            getPrdct.map((data, index) => (
                                // <div className="cards" >

                                <div className="Card" key={index}>
                                    <div className="prdct-thumnalil"><img src={data.banner} alt="" /></div>
                                    <div className="card-details">
                                        <p className='item-title'>{data.product_name}</p>
                                        <div><span className="prdct-description">{data.description}</span></div>
                                        <div className="prices">
                                            <div><p className='price'>₹ {data.price}</p></div>
                                            <div><strike><p className='og-price'>₹ 799</p></strike></div>
                                        </div>

                                    </div>
                                    {/* <RiDeleteBinLine className='Btn' /> */}
                                    <div className='deleteBtn' ><button onClick={() => delProduct(data._id)}>Delete from Wishlist</button><button><Link className='ViewDetailsBtn' to={`/productDetailsCustomer/${data._id}`}>View Details</Link></button></div>
                                </div>

                                // </div>
                            ))
                        }
                    </>
                )}
                {/* */}
            </div>
        </div>
    );
};

export default WishList;
