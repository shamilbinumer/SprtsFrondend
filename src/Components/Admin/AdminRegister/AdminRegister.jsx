import React, { useState } from 'react'
import './AdminRegister.scss'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const AdminRegister = () => {
  const navigate=useNavigate()
const[val,setVal]=useState({
  username:"",
  email:"",
  phone:"",
  password:"",
  confirmpassword:""
});

const GetData=(e)=>{
  setVal((pre)=>({...pre,[e.target.name]:e.target.value}))
  console.log(val);
}

const SignUp=async(e)=>{
  e.preventDefault();
  const {password,confirmpassword}=val;
    if(password!==confirmpassword){
    alert('Password and Confirm Password do not match!');
  } else {
    const res=await axios.post("http://localhost:7000/sportstrack/addadmin",{...val})
    setVal(res.data)
    console.log(val);
    if(res.status==201){
      alert("Successfully registered")
      navigate("/admin")
    }
  }

};

  return (
    <div className='admin-resgiter-page'>
       <div className="card">
  <h4 className="title">Admin Sign Up!</h4>
  <form>
  <div className="field">
      <svg className="input-icon" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
  <path d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"></path></svg>
      <input id="logemail" placeholder="Username" className="input-field" name="username" type="text" onChange={GetData}/>
    </div>
    <div className="field">
    <svg className="input-icon" viewBox="0 0 20 20">
	<path d="M17.388,4.751H2.613c-0.213,0-0.389,0.175-0.389,0.389v9.72c0,0.216,0.175,0.389,0.389,0.389h14.775c0.214,0,0.389-0.173,0.389-0.389v-9.72C17.776,4.926,17.602,4.751,17.388,4.751 M16.448,5.53L10,11.984L3.552,5.53H16.448zM3.002,6.081l3.921,3.925l-3.921,3.925V6.081z M3.56,14.471l3.914-3.916l2.253,2.253c0.153,0.153,0.395,0.153,0.548,0l2.253-2.253l3.913,3.916H3.56z M16.999,13.931l-3.921-3.925l3.921-3.925V13.931z"></path></svg>
      <input id="logemail" placeholder="Email" className="input-field" name="email" type="email" onChange={GetData}/>
    </div>
    <div className="field">
    <svg className="input-icon" viewBox="0 0 20 20">
		<path d="M13.372,1.781H6.628c-0.696,0-1.265,0.569-1.265,1.265v13.91c0,0.695,0.569,1.265,1.265,1.265h6.744c0.695,0,1.265-0.569,1.265-1.265V3.045C14.637,2.35,14.067,1.781,13.372,1.781 M13.794,16.955c0,0.228-0.194,0.421-0.422,0.421H6.628c-0.228,0-0.421-0.193-0.421-0.421v-0.843h7.587V16.955z M13.794,15.269H6.207V4.731h7.587V15.269z M13.794,3.888H6.207V3.045c0-0.228,0.194-0.421,0.421-0.421h6.744c0.228,0,0.422,0.194,0.422,0.421V3.888z"></path></svg>
      <input id="logemail" placeholder="Phone" className="input-field" name="phone" type="text" onChange={GetData}/>
    </div>
    <div className="field">
      <svg className="input-icon" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
      <path d="M80 192V144C80 64.47 144.5 0 224 0C303.5 0 368 64.47 368 144V192H384C419.3 192 448 220.7 448 256V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V256C0 220.7 28.65 192 64 192H80zM144 192H304V144C304 99.82 268.2 64 224 64C179.8 64 144 99.82 144 144V192z"></path></svg>
      <input id="logpass" placeholder="Password" className="input-field" name="password" type="password" onChange={GetData}/>
    </div>
    <div className="field">
      <svg className="input-icon" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
      <path d="M80 192V144C80 64.47 144.5 0 224 0C303.5 0 368 64.47 368 144V192H384C419.3 192 448 220.7 448 256V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V256C0 220.7 28.65 192 64 192H80zM144 192H304V144C304 99.82 268.2 64 224 64C179.8 64 144 99.82 144 144V192z"></path></svg>
      <input id="logpass" placeholder="Confirm Password" className="input-field" name="confirmpassword" type="password" onChange={GetData}/>
    </div>
    <button className="btn" type="submit" onClick={SignUp} >Sign Up</button>
    {/* <a href="#" className="btn-link">Forgot your password?</a> */}
   <Link to='/admin'  className="btn-link">I Have an account</Link>
  </form>
</div>
    </div>
  )
}

export default AdminRegister
