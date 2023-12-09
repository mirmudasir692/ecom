import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, useNavigate } from 'react-router-dom'
import Login from './components/UserOperations/login.jsx'
import Body from './components/main/body.jsx'
import { Provider } from 'react-redux'
import store from './app/store.js'
import Register from './components/partner/register.jsx'
import Intro from './components/partner/intro.jsx'
import Shop from './components/partner/Shop.jsx'
import ManageProduct from './components/partner/manageproducts.jsx'
import Orders from './components/partner/orders.jsx'
import { ApolloProvider } from '@apollo/client'
import AddProduct from './components/partner/addProduct.jsx'
import EditProduct from './components/partner/editproduct.jsx'
import Index from './components/main/index.jsx'
import client from './graphql/partner/apollo.js'
import Products from './components/main/products.jsx'
import Categories from './components/main/categories.jsx'
import CheckOutProduct from './components/main/checkoutproduct.jsx'
import WishList from './components/main/wishlist.jsx'
import Order from './components/main/payment/order.jsx'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import PlaceOrder from './components/main/placeorder.jsx'
import OrderList from './components/main/orderslist.jsx'
import CustomerService from './components/main/customerservice/customerservice.jsx'
import Query from "./components/main/customerservice/addquery.jsx"
import { default as CustomerIntro } from "./components/main/customerservice/intro.jsx"
import { default as UserRegister } from "../src/components/UserOperations/register.jsx"
import CartList from './components/main/cartlist.jsx'
import UserProfile from './components/UserOperations/Profile.jsx'



const routers=createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Body/>}>
    <Route path="" element={<Index/>}/>
    <Route path='products/:category_id' element={<Products/>} />
    <Route path='categories' element={<Categories/>}/>
    <Route path='product/:product_id' element={<CheckOutProduct/>}/>
    <Route path='login' element={<Login/>}/>
    <Route path="partner/register_partner" element={<Register/>}/>
    <Route path='partner/partner_intro' element={<Intro/>}/>
    <Route path='order/:product_id' element={<PlaceOrder/>}/>
    <Route path='orders' element={<OrderList/>}/>
    <Route path='register' element={<UserRegister/>}/>
    <Route path='cart_list' element={<CartList/>}/>
    <Route path='profile' element={<UserProfile/>}/>
    <Route path='customer_service' element={<CustomerService/>}>
      <Route path="" element={<CustomerIntro/>}/>
      <Route path="query" element={<Query/>}/>
    </Route>
    <Route path='partner/shop/' element={<Shop/>}>
      <Route path='' element={<ManageProduct/>}/>
      <Route path='orders' element={<Orders/>}/>
      <Route path='add_product' element={<AddProduct/>}/>        
      <Route path="edit_product/:product_id" element={<EditProduct/>}/>
      
                {/* these urls will handle the partners operations */}

                
    </Route>
    <Route path='wishlist' element={<WishList/>}/>
    
  </Route>
))

const stripePromise = loadStripe("pk_test_51OG1eNSHKEthz7zgFCNyArU7QauGyurIZobCIAFTipndVgB2pJf0eBWf3Zf8tSqVBImDg5gy4OATpocODeBV4xA200AsJChdqR")
ReactDOM.createRoot(document.getElementById('root')).render(
<>
{/* for using first Graphql api client 1 */}
<Elements stripe={stripePromise}>
<ApolloProvider client={client}>
<Provider store={store}>
<RouterProvider router={routers}/>
</Provider>
</ApolloProvider>
</Elements>

{/*  */}

</>
)
