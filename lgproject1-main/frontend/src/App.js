import "./App.css";
import Layout from "./components/Layout/Layout";

import React,{useState} from "react";
import IdContext from "./IdContext";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");

  return (
    
  <div>
  <Layout/>;
   
   {/* <AuthContext.Provider
    value={[isLoggedIn, setIsLoggedIn]} 
  > */}
    <IdContext.Provider value={{userId, setUserId}}> 
    {/* <RouterProvider router={router} /> */}
    </IdContext.Provider> 
  {/* </AuthContext.Provider>   */}
   </div>

  )
  

 
}

export default App;
