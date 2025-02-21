import React from "react";
import CouponFinder from "./Components/CouponFinder";
import { useEffect, useState } from "react"; // I added this here to call the backend - Vraj

function App() {                                
  const [data, setData] =  useState([{}])   // This code will change state of data or something I saw it in a tutorial- Vraj

  useEffect(() => {
      fetch("/test").then(  // The json data exists in BagThat/flask-server/server.py in @app.route('/test') - Vraj
        res => res.json()

      ).then(
        data =>  {
          setData(data)     
          console.log(data)     // If you run the console, you can see the test: ['test1', 'test2', 'test3'] - Vraj
                                // You have to run the backend on another terminal, make sure to "python server.py" in the flask-server directory - Vraj
        }
      )
    }, [])
  return (
    <div className="bg-gray-950 min-h-screen p-4">
      
      <main className="max-w-3xl mx-auto bg-gray-950 rounded-lg shadow-md p-6 space-y-6">
        <CouponFinder />
      </main>
    </div>
  );
}

export default App;

