import React, { useState } from 'react'
import './Addcategory.scss'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const AddCategory = () => {
  const navigate=useNavigate()
    const [val,setVal]=useState({
        category:"",
        aboutCategory:""

    })
    const GetData=(e)=>{
        setVal((pre)=>({...pre,[e.target.name]:e.target.value}))
      }
      const AddCat=async(e)=>{
        e.preventDefault()
        const res=await axios.post("http://localhost:7000/sportstrack/addCategory",{...val}) 
        if(res.status!=404){
            alert("Category Added Successfully")
            navigate("/adminhome")
        }
      }
  return (
    <div className='add-cat-main'>
         <div className="header-main">
      <div className="header-left">
        <Link to='/adminhome' className='back-btn'>Back</Link>
      </div>
       {/* <div className="header-right">
       <div className="display-username">
            <span><i className="fa fa-user" aria-hidden="true"></i>{msg} <button onClick={Logout}><i className="fa fa-sign-out" aria-hidden="true"></i></button></span>
        </div>
       </div> */}
      </div>
         <div className="card">
  <h4 className="title">Add Category!</h4>
  <form onSubmit={AddCat}>

    <div className="field">
      <input id="category" placeholder="Category" className="input-field" name="category" type="text" onChange={GetData} />
    </div>
    <div className="field">
      <input id="about-cat" placeholder="About Category" className="input-field-about" name="aboutCategory" type="text" onChange={GetData} />
    </div>
    <button className="btn" type="submit">Add</button>
  </form>
</div>
    </div>
  )
}

export default AddCategory
