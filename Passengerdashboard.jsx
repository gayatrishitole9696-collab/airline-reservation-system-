import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Passengernavbar from './Passengernavbar';
import Homepassenger from './Homepassenger';

export default function Passengerdashboard() {
  return (
    
    <div>
        {/* <h1 className='w-100 bg-info text-light fs-1' style={{"height":"50px"}}>Welcome to PassengerDashboard</h1> */}
        <Passengernavbar></Passengernavbar>
        {/* <Homepassenger></Homepassenger> */}
    </div>
  )
  
}