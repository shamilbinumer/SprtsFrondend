
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
// import Navbar from './Components/Navbar/Navbar'
import IndexPage from './Components/Body/Index/IndexPage'
import AdminLogin from './Components/Admin/AdminLogin/AdminLogin'
import AdminRegister from './Components/Admin/AdminRegister/AdminRegister'
import AdminHome from './Components/Admin/AdminHomePage/AdminHome'
import AdminFrgtPwd from './Components/Admin/AdminFrgtPwd/AdminFrgtPwd'
import AddCategory from './Components/Admin/AddCategory/AddCategory'
import AddProduct from './Components/Admin/AddProduct/AddProduct'
import EditCategory from './Components/Admin/EditCategory/EditCategory'
import CustomerReg from './Components/Customer/CustomerReg/CustomerReg'
import ProductViewCatVise from './Components/Admin/ProductViewCatVise/ProductViewCatVise'
import CustomerLogin from './Components/Customer/CustomerLogin/CustomerLogin'
import EditProdect from './Components/Admin/EditProduct/EditProdect'
import ProductDetailsAdmn from './Components/Admin/ProductDetailsAdmn/ProductDetailsAdmn'
import ProductDetailsCustomer from './Components/Body/ProductDetailsCustome/ProductDetailsCustomer'
import AllCustomers from './Components/Admin/AllCustomers/AllCustomers'
import Cart from './Components/Customer/Cart/Cart'
import WishList from './Components/Customer/WishList/WishList'
import MyOrders from './Components/Customer/MyOrders/MyOrders'
import axios from 'axios'


function App() {
  axios.defaults.baseURL = location.origin;
  return (
    <>
  <BrowserRouter>
  <Routes>
    <Route path='/' Component={IndexPage}/>
    <Route path='/admin' Component={AdminLogin}/>
    <Route path='/adminResgiter' Component={AdminRegister}/>
    <Route path='/adminhome' Component={AdminHome}/>
    <Route path='/adminFrgtPwd' Component={AdminFrgtPwd}/>
    <Route path='/addCategory' Component={AddCategory}/>
    <Route path='/addProduct' Component={AddProduct}/>
    <Route path='/editCategory/:id' Component={EditCategory}/>
    <Route path='/custemerReg' Component={CustomerReg}/>
    <Route path='/prooood/:category' Component={ProductViewCatVise}/>
    <Route path='/editProduct/:id' Component={EditProdect}/>
    <Route path='/CustomerLogin' Component={CustomerLogin}/>
    <Route path='/productDetailsAdmn/:id' Component={ProductDetailsAdmn}/>
    <Route path='/productDetailsCustomer/:id' Component={ProductDetailsCustomer}/>
    <Route path='/AllCustomers' Component={AllCustomers}/>
    <Route path='/cart/:id' Component={Cart}/>
    <Route path='/whishList/:id' Component={WishList}/>
    <Route path='/myOreder/:id' Component={MyOrders}/>

  </Routes>
  </BrowserRouter>
    </>
  )
}

export default App
