"use client"
import React, { useState } from 'react'
import { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from "./Components/Navbar"
import Mainimg from './Components/Mainimg';
import Showcase from './Components/Showcase';
import Footer from './Components/Footer';


const page = () => {
  useEffect(()=>{
    import("bootstrap/dist/js/bootstrap");
},[])
  const[pizzaitem,setPizzaitem]=useState([]);
  const loadData = async()=>{
    let response = await fetch("http://localhost:5000/api/pizzadata",{
      method:"POST",
      headers:{
        "Content-Type": "application/json"
      }
    })

    response= await response.json();
    setPizzaitem(response)
  }
  useEffect(()=>{
    loadData()
  },[])
  return (
    <>
    <Navbar/>
    <Mainimg/>
    <div className='container row  ml-3'>
    {
      pizzaitem.map((item)=>{return(
        <div key={item._id} className=' col-12 col-md-6 col-lg-3'>
          <Showcase
      foodName={item.name}
      options={item.options[0]}
      imgSrc={item.img}
      Desc={item.description}
    />
        </div>
      )})

    }
    </div>
    <Footer/>
    </>
    
  )
}

export default page
