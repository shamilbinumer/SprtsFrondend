import React, { useEffect, useState } from 'react'
import './EditCategory.scss'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const EditCategory = () => {
    const navigate=useNavigate()
    const {id}=useParams()
    // console.log(id);
    // const [getData,setData]=useState([])
    const [val,setVal]=useState({
        category:"",
        aboutCategory:""
    })
    const GetData=(e)=>{
        setVal((pre)=>({...pre,[e.target.name]:e.target.value}))
        // console.log(val);
    }

    const getfullData = async () => {
        try {
            const res = await axios.post(`http://localhost:7000/sportstrack/getCatDetails/${id}`);
            // console.log(res);
            setVal(res.data);
            // console.log(val);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getfullData(id);
    }, [id]);


    const EditCat=async(e)=>{
        e.preventDefault()
      try {
        const res=await axios.patch(`http://localhost:7000/sportstrack/editCategory/${id}`,{...val})
        console.log(res.data);
        if(res.status!=404){
            alert("Edited")
            navigate("/adminhome")
        }
      } catch (error) {
        console.log(error);
      }
    }
    // http://localhost:7000/sportstrack/editCategory/${id}
    // http://localhost:7000/sportstrack/getCatDetails/${id}
  return (
    <div className='Edit-Category-main'>
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
  <h4 className="title">Edit Category!</h4>
  <form onSubmit={EditCat}>

    <div className="field">
      <input id="category" placeholder="Category" value={val.category} className="input-field" name="category" type="text" onChange={GetData}/>
    </div>
    <div className="field">
      <input id="about-cat" placeholder="About Category" value={val.aboutCategory} className="input-field-about" name="aboutCategory" type="text" onChange={GetData} />
    </div>
    <button className="btn" type="submit">Edit</button>
  </form>
</div>
    </div>
  )
}

export default EditCategory
