import React, { useEffect, useState } from 'react'
import './AllCustomers.scss'
import axios from 'axios'

const AllCustomers = () => {
  const [getCustomer,setCustomer]=useState([])

  const getAllcustomer=async()=>{
    const res=await axios.get("http://localhost:7000/sportstrack/getAllCustomers")
    console.log(res.data);
    setCustomer(res.data)
    console.log(getCustomer);
  }
  useEffect(()=>{
    getAllcustomer()
  },[])
  return (
    <div className='allCustomersMain'>
   {
      getCustomer.map((data,index)=> <div className="main" key={index}>
      <div className="dp-div">
        <div className="dp"><img src={data.photo} alt="" /></div>
      </div>
      <div className="name-div">
        <h4>{data.name}</h4>
      </div>
    </div>)
   }
    </div>
  )
}

export default AllCustomers
