import { Route,Routes } from "react-router-dom"
import Sign_in from "./pages/Sign_in"
import Sign_up from "./pages/Sign_up"
import Welcome from "./pages/Welcome"
import Admin_home from "./pages/Admin_home"
import Customer_home from "./pages/Customer_home"

import Product_manage from "./pages/Product_manage"
import Add_product from "./product/Add_product"
import View_Products from "./product/View_Products"
import Update_product from "./product/Update_product"


function App() {
  

  return (
    <>
     <Routes>
       <Route path="/" element={<Welcome />} />
        <Route path="/signUp" element={<Sign_up />} />
        <Route path="/signIn" element={<Sign_in/>}/>
        <Route path="/adminHome" element={<Admin_home/>}/>
        <Route path="/customerHome" element={<Customer_home/>}/>

        <Route path ="/productManage" element={<Product_manage/>}/>
        <Route path="/addProduct" element={<Add_product/>}/>
        <Route path="/getAllProducts" element={<View_Products/>}/>
        <Route path="/updateProduct/:id" element={<Update_product/>}/>
 
     </Routes>
    </>
  )
}

export default App
