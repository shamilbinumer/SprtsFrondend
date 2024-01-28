import  {React, useEffect, useState } from 'react'
import './AdminHome.scss'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FcEditImage } from "react-icons/fc";
import { FcEmptyTrash } from "react-icons/fc";
import { FcAddDatabase } from "react-icons/fc";
import { FcComboChart } from "react-icons/fc";
import { FcOnlineSupport } from "react-icons/fc";



const AdminHome = () => {

    const navigate=useNavigate()
    const [msg,setMsg]=useState("")
    const [getCat,setCat]=useState([])
    
    const value=JSON.parse(localStorage.getItem('admin_token'));
    const getName=async()=>{
        const res=await axios.get("http://localhost:7000/sportstrack/home",{
            headers:{Authorization: `Bearer ${value}`},
        })
        setMsg(res.data.msg)
    }

    useEffect(()=>{
        getName() 
    },[])

    const Logout=(e)=>{
        e.preventDefault();
        const confirmed = window.confirm("Are you sure you want to logout?");
        if (confirmed) {
            localStorage.clear();
           navigate("/admin")
        }
    }

    const getCategory=async()=>{
      const res=await axios.get("http://localhost:7000/sportstrack/getcategory")
      setCat(res.data)
      console.log(getCat);
    }
    useEffect(()=>{
      getCategory()
    },[])

    const deletecategory = async (id) => {
      // Display a confirmation dialog before making the delete request
      const userConfirmed = window.confirm("Are you sure you want to delete this category?");
    
      if (userConfirmed) {
        try {
          const res = await axios.delete(`http://localhost:7000/sportstrack/delcategory/${id}`);
          console.log(res.data);
    
          if (res.status !== 404) {
            alert("Category deleted successfully");
          } else {
            alert("Category not deleted");
          }
    
          // Refresh the category list after deletion
          getCategory();
        } catch (error) {
          console.error("Error deleting category:", error);
          alert("An error occurred while deleting the category");
        }
      } else {
        alert("Deletion canceled by user");
      }
    };

    
    
  return (
    <div className='adminHomePageMain'>
      <div className="header-main">
      <div className="header-left">
        <Link to='/admin' className='back-btn'>Back</Link>
      </div>
       <div className="header-right">
       <div className="display-username">
            <span><i className="fa fa-user" aria-hidden="true"></i>{msg} <button onClick={Logout}><i className="fa fa-sign-out" aria-hidden="true"></i></button></span>
        </div>
       </div>
      </div>

      <div className="hero">
        <div className="hero-left">
          <h4>Category</h4>
          <div className="cat-ithems">
            {
            getCat.map((data,index)=>
            <table key={index}>
            <tr>
              <th><Link to={`/prooood/${data.category}`} className='link'><span>{data.category}</span></Link></th>
              <td><Link className='edit-btn' to={`/editCategory/${data._id}`}><FcEditImage /></Link>
              <Link className='delete-btn'  to={`#${data._id}`} onClick={() => deletecategory(data._id)}><FcEmptyTrash /></Link></td>
            </tr>
          </table>
          )
          }
          </div>
          {/* <div className="add-cat-section">
            <Link className='add-cat-btn' to='/addCategory'>Add New Category <i className="fa fa-plus" aria-hidden="true"></i></Link>
          </div>
          <div className="add-product-section">
            <Link className='add-product-btn' to='/addProduct'>Add Products</Link>
          </div> */}
        </div>
        {/* <div className="line"></div> */}
        <div className="hero-right">
      <div className="upper-btn">
      <div className="add-cat-button">
       <Link className='add-cat-btn-right' to='/addCategory'>Add New Category <FcAddDatabase className='add-icon'/> </Link>
       </div>
       <div className="add-prdct-button">
       <Link className='add-product-btn-right' to='/addProduct'>Add Products <FcAddDatabase className='add-icon'/></Link>
       </div>
       <div className="sales-button">
       <Link className='sales-btn-right'>Sales <FcComboChart className='add-icon'/></Link>
       </div>
       <div className="services-button">
       <Link className='service-btn-right' to='/AllCustomers'>Customers <FcOnlineSupport className='add-icon'/></Link>
       </div>
      </div>
      <div></div>
        </div>
      </div>

    </div>
  )
}

export default AdminHome
