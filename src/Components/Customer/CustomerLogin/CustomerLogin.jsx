import React, { useState } from 'react'
import './CustomerLogin.scss'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
const CustomerLogin = () => {
    const navigate=useNavigate()
    const [val,setVal]=useState({
        email:"",
        password:""
    })
    const GetData=(e)=>{
        setVal((pre)=>({...pre,[e.target.name]:e.target.value}))
        console.log(val);
    }

    const Login=async(e)=>{
        e.preventDefault()
        const res=await axios.post("http://localhost:7000/sportstrack/customerLogin",{...val})
        console.log(res.data);
        const data=res.data
        if(res){
            alert("Seccessfully Logined")
            const customer_token=data.token
            localStorage.setItem("customer_token",JSON.stringify(customer_token))
            navigate("/")
        }
    }
    
  return (
    <div className='cus-login'>
        <div className="CustRegMain">
        <div className="CustRegLeft">
          <Link className='backBtn' to='/'>Back</Link>
          <div className="CusRegLeftContent">
            <h1>Sports Track.</h1>
            <div className="ul"></div>
            <h2>Let's go!</h2>
            <p>Create an account once and log all SportsTrack sites and partners in one click!</p>
          </div>
        </div>
        <div className="CustRegRight">
          <h2>Sign In</h2>
          <div className="formMainDiv">
            <form action="" onSubmit={Login}>
            
                 <div><input type="text"  placeholder='Email' name='email' onChange={GetData}/></div>
                 <div><input type="password"  placeholder='password' name='password' onChange={GetData}/></div>
             
             <div> <button className='resgiter-btn'>Login</button></div>
            <Link className='iHaveAccount' to='/custemerReg'>New Customer ?</Link>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerLogin
