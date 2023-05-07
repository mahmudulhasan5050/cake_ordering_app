import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/appBar/Header';
import AuthComp from './components/AuthComp';
import Home from './pages/Home';
import MyOrders from './pages/MyOrders';
import OrderDetails from './pages/admin/OrderDetails';
import CakeDetails from './pages/admin/CakeDetails';
import UserDetails from './pages/admin/UserDetails';
import SignUpInForm from './pages/SignUpInForm';
import OrderCake from './components/orderCake/OrderCake';

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/orderCake/:cakeId/:userId' element={<OrderCake />} />
        <Route path='/myorders' element={<MyOrders />} />
        <Route
          path='/orderdetails'
          element={
            <AuthComp>
              <OrderDetails />
            </AuthComp>
          }
        />
        <Route
          path='/cakedetails'
          element={
            <AuthComp>
              <CakeDetails />
            </AuthComp>
          }
        />
        <Route
          path='/userdetails'
          element={
            <AuthComp>
              <UserDetails />
            </AuthComp>
          }
        />
        <Route path='/auth' element={<SignUpInForm />} />
      </Routes>
    </div>
  );
}

export default App;
