import React from 'react'
import Airadminnavbar from './Airadminnavbar'
import Passengernavbar from './Passengernavbar'
import Homenavbar from './Homenavbar1'

export default function Home() {

  const user = JSON.parse(localStorage.getItem("userinfo"));

  return (
    <div>

      {/* 🔹 Dynamic Navbar */}
      {
        user?.role === "ADMIN" 
          ? <Airadminnavbar />
          : user?.role === "PASSENGER"
            ? <Passengernavbar />
            : <Homenavbar />
      }

      {/* 🔹 Background Images Carousel */}
      <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
        
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"></button>
        </div>

        <div className="carousel-inner">

          <div className="carousel-item active">
            <img 
              src="https://wallpaperaccess.com/full/254381.jpg" 
              className="d-block w-100" 
              alt="slide1" 
            />
          </div>

          <div className="carousel-item">
            <img 
              src="https://wallpapercave.com/wp/wp9362106.jpg" 
              className="d-block w-100" 
              alt="slide2" 
            />
          </div>

          <div className="carousel-item">
            <img 
              src="https://i.pinimg.com/originals/f3/6a/9e/f36a9e9d8344fdf78efc719b6255cf16.jpg" 
              className="d-block w-100" 
              alt="slide3" 
            />
          </div>

        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>

        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>

      </div>

    </div>
  )
}
