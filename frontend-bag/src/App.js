import React from "react";
import CouponFinder from "./Components/CouponFinder";
import { useEffect, useState } from "react"; // I added this here to call the backend - Vraj

function App() {                                
   const [data, setData] =  useState([{}])   

   useEffect(() => {
       fetch("/test").then(  
         res => res.json()

       ).then(
         data =>  {
           setData(data)     
           console.log(data)    
                               
        }
       )
     }, [])
  return (
    <div className="bg-gray-900 min-h-screen p-4">
    <main className="max-w-3xl mx-auto bg-gray-900 rounded-lg shadow-md p-6">
      <CouponFinder />
    </main>
  </div>
  );
}

export default App;

