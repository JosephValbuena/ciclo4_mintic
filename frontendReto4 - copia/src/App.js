import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Styles
import './App.css';

//Components
import Auth from './components/auth';
import ProductList from './components/products/productList'
import Header from './components/layout/header';
import UserList from './components/users/userList';
import CreateProduct from './components/products/createProduct';
import CreateUser from './components/users/createUser';
import Profile from './components/users/profile';
import Register from './components/register';
import TableOrder from './components/orders/tableOrders';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Router>
        <Routes>
          <Route path="/auth" element={<Auth/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/products" element={<ProductList/>}/>
          <Route path="/users" element={<UserList/>}/>
          <Route path="/createProduct" element={<CreateProduct/>}/>
          <Route path="/createUser" element={<CreateUser/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/orders" element={<TableOrder/>}/>
          <Route path="*" element={<Auth/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;


