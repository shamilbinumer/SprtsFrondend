import React, { useEffect, useState } from 'react'
import './AddProduct.scss'
// import convertToBase64 from '../../../../base64'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const AddProduct = () => {
  const navigate=useNavigate()
  let Banner="";
  let Images=""
  const [getCat,setCat]=useState([])
  const [val,setVal]=useState({
    product_name:"",
    category:"",
    description:"",
    price:"",
    stock:{
      xs:"",
      s:"",
      m:"",
      l:"",
      xl:"",
      xxl:""
    },
    banner:"",
    images:[]
  })

  function convertToBase64Banner(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
  
        fileReader.onload = () => {
            resolve(fileReader.result)
        }
        fileReader.onerror = (error) => {
            reject(error)
        }
    })
  }

  const convertToBase64Images = (files) => {
    return Promise.all(
      Array.from(files).map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.addEventListener('load', () => resolve(reader.result));
          reader.addEventListener('error', (error) => reject(error));
          reader.readAsDataURL(file);
        });
      })
    );
  };

  const GetBanner=async(e)=>{
    e.preventDefault()
  
    Banner=await convertToBase64Banner(e.target.files[0])
    console.log(Banner);
  }

  const GetImages=async(e)=>{
    e.preventDefault()
  
    Images=await convertToBase64Images(e.target.files)
    console.log(Images);
    // setVal(Images)
  }

  const GetData=(e)=>{ 
    setVal((pre)=>({...pre,[e.target.name]:e.target.value}))
    console.log(val);
  }

  const GetStock=(e)=>{
    setVal((pre) => ({...pre,stock: { ...pre.stock, [e.target.name]: e.target.value },}));
  }

  const getCategory=async()=>{
    const res=await axios.get("http://localhost:7000/sportstrack/getcategory")
    setCat(res.data)
    console.log(getCat);
  }
  useEffect(()=>{
    getCategory()
  },[])

  const addProduct=async(e)=>{
    try {
      e.preventDefault()
      const res = await axios.post("http://localhost:7000/sportstrack/addProduct",{...val,images:Images,banner:Banner})
      console.log(res.data);
      if(res){
        alert("Product Added")
        navigate("/adminhome")
      }
    } catch (error) {
      console.log(error);
    }
  }


  // const addProduct=async(e)=>{
  //  try {
  //   e.preventDefault()
  //   let formData = new FormData();
  //   console.log(Object.entries(val));
  //   Object.entries(val).forEach(item => formData.append(item[0],item[1]));
  //   if (val.images && val.images.length > 0) {
  //     for (const image of val.images) {
  //       formData.append('images', image);
  //     }
  //   }
  //   const res = await axios.post("http://localhost:7000/sportstrack/addProduct", formData, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //     },
  //   });

  //   if(res.status!=404){
  //     alert("Product Added")
  //   }
  //  } catch (error) {
  //     alert("error",error)
  //  }
  // }
  return (
    <div className='add-products-main'>
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
  <h4 className="title">Add New Product!</h4>
  <form onSubmit={addProduct}>

    <div className="field">
      <input id="prodname" placeholder="Product Name" className="input-field" name="product_name" type="text" onChange={GetData} />
    </div>
    <div className='label'><label htmlFor="">Category :</label></div>
    <div className="field">
    <select name="category" id="category"  className="input-field" onChange={GetData}>
    <option>Select Category</option>
     {
      getCat.map((data,index)=>
     <>
        <option value={data.category}>{data.category}</option>
      </>
     )
     }
      </select>
    </div>
    <div className="field">
      <input id="description" placeholder="Description About Product" className="input-field" name="description" type="text" onChange={GetData}/>
    </div>
    <div className="field">
      <input id="price" placeholder="Price" className="input-field" name="price" type="text" onChange={GetData}/>
    </div>
    {/* <div className='label'><label htmlFor="">Size :</label></div> */}
    {/* <div className="field"> */}
      {/* <input id="size" placeholder="Size" className="input-field" name="size" type="text" onChange={GetData}/> */}
      {/* <select name="size" id="" onChange={GetData} className="input-field">
        <option value="XS">XS</option>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
        <option value="XXL">XXL</option>
      </select>
    </div> */}
    <div className='label'><label htmlFor="">Stock :</label></div>
    <div className="field" id='stock'>
      <input id="xs" placeholder="XS" className="input-field" name="xs" type="text" onChange={GetStock}/>
      <input id="s" placeholder="S" className="input-field" name="s" type="text" onChange={GetStock}/>
      <input id="m" placeholder="M" className="input-field" name="m" type="text" onChange={GetStock}/>
      <input id="l" placeholder="L" className="input-field" name="l" type="text" onChange={GetStock}/>
      <input id="xl" placeholder="XL" className="input-field" name="xl" type="text" onChange={GetStock}/>
      <input id="xxl" placeholder="XXL" className="input-field" name="xxl" type="text" onChange={GetStock}/>
    </div>
    <div className="field">
    <div><label htmlFor="">Banner</label></div>
      <input id="banner" placeholder="banner" className="input-field" name="banner" type="file"  onChange={GetBanner}  />
    </div>
    <div className="field">
    <div><label htmlFor="">Images</label></div>
      <input id="image" placeholder="Image" className="input-field" name="images" type="file"  onChange={GetImages}  multiple/>
    </div>
    <button className="btn" type="submit">Add</button>
  </form>
</div>
    </div>
  )
}

export default AddProduct
