import './App.css'
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar.jsx";
import Home from "./Pages/Home.jsx";
import Footer from './Components/Footer.jsx';
import About from './Pages/About.jsx';
import OurFarm from './Pages/OurFarm.jsx';
import Login from "./Pages/Login";
import Signup from "./Pages/SignupPage";
import Agriculture from './Pages/Agriculture.jsx';
import Visit from './Pages/Visit.jsx';
import Contact from './Pages/Contact.jsx';
import ProductsPage from './Pages/Products.jsx';
import CartPage from "./Pages/CartPage";
import PlaceOrder from './Pages/PlaceOrder.jsx';
import ProductItem from './Components/ProductItem.jsx';
import Orders from './Pages/Orders.jsx';
import NotFound from './Pages/NotFound.jsx';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './Pages/Verify.jsx';


function App() {
  return (
    <>
      <ToastContainer />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/about' element={<About />} />
        <Route path='/farm' element={<OurFarm />} />
        <Route path='/agriculture' element={<Agriculture />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/products/:productId' element={<ProductItem />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path='/visit' element={<Visit />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/verify' element={<Verify />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
