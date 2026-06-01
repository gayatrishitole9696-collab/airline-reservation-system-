import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import React, { useRef } from 'react';
// impot { BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Home from "./Home";
import OurServices from "./OurServices";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import Register from "./Register";
import Airadminnavbar from "./Airadminnavbar";
import Airadmindashboard from "./Airadmindashboard";
import Passengerdashboard from "./Passengerdashboard";
import Passengernavbar from "./Passengernavbar";
import Addflight from "./Addflight";
import Bookticket from "./Bookticket";
import Getflight from "./Getflight";
import Updateflight from "./Updateflight";
import Searchflights from "./Searchflights";
import Passengerlogin from "./Passengerlogin";
import Mybookings from "./Mybookings";
import Homenavbar1 from "./Homenavbar1";
import Homelayout from "./Homelayout";
import Updatebooking from "./Updatebooking";
import Payment from "./Payment";
import Alreadyregister from "./Alreadyregister";
import Viewbookings from "./Viewbookings";
import Homeadmin from "./homeadmin";
import Homepassenger from "./Homepassenger";
import Homenavbar from "./Homenavbar1";
import Availableflights from "./Availableflights";



function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path = "/" element = {<Home></Home>}></Route>
         <Route index element={<Home />} />
        <Route path = "/register" element = {<Register></Register>}></Route>
        {/* <Route path = "/airadminnavbar" element = {<Airadminnavbar></Airadminnavbar>}></Route> */}
        <Route path = "/airadmindashboard" element = {<Airadmindashboard></Airadmindashboard>}></Route>
        <Route path = "/passengerdashboard" element = {<Passengerdashboard></Passengerdashboard>}></Route>
         {/* <Route path = "/passengernavbar" element = {<Passengernavbar></Passengernavbar>}></Route> */}
         <Route path = "/bookticket" element = {<Bookticket></Bookticket>}></Route>
         <Route path = "/addflight" element = {<Addflight></Addflight>}></Route>
         <Route path = "/getflight" element = {<Getflight></Getflight>}></Route>
         <Route path = "/updateflight/:id" element = {<Updateflight></Updateflight>}></Route>
        <Route path = "/searchflights" element = {<Searchflights></Searchflights>}></Route>
        <Route path = "/passengerlogin" element = {<Passengerlogin></Passengerlogin>}></Route>
        <Route path = "/mybookings" element = {<Mybookings></Mybookings>}></Route>
        {/* <Route path = "/homenavbar1" element = {<Homenavbar1></Homenavbar1>}></Route> */}
        <Route path = "/updatebooking/:id" element = {<Updatebooking></Updatebooking>}></Route>
        <Route path = "/payment" element = {<Payment></Payment>}></Route>
        <Route path ="/alreadyregister" element = {<Alreadyregister></Alreadyregister>}></Route>
        <Route path = "/getallbookings" element = {<Viewbookings></Viewbookings>}></Route>
        <Route path = "/homeadmin" element = {<Homeadmin></Homeadmin>}></Route>
        <Route path = "/homepassenger" element = {<Homepassenger></Homepassenger>}></Route>
        <Route path = "/availableflights" element = {<Availableflights></Availableflights>}></Route>
        

        <Route path = "/home" element = {<Home></Home>}></Route>
        <Route path = "/aboutus" element = {<AboutUs></AboutUs>}></Route>
        <Route path = "/contactus" element = {<ContactUs></ContactUs>}></Route>
        <Route path = "/ourservices" element = {<OurServices></OurServices>}></Route>

      </Routes>
    </BrowserRouter>
    // <Home></Home>
    
  );
}

export default App;
