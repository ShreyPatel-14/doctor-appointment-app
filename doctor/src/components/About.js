import React from 'react'
import pic from './about.jpg'
import './about.scss'
function About() {
  return (
    <>
      <div className="main px-2">
        <div className='d-lg-flex container'>
          <div className='mx-3 w-50 content1'>
            <img className='img w-100' src={pic} alt="not found"/>
          </div>
          <div className='w-50 mx-3 content2'>
            <div>
              <h1>About Us</h1>
              <p>Welcome to Care & Cure, your trusted partner in simplifying healthcare access through convenient and efficient doctor appointment booking. Our platform was born out of a shared vision to bridge the gap between patients and healthcare providers, making the process of booking appointments seamless and hassle-free.</p>
            </div>
          </div>
        </div>
        <h1 className='d-flex mt-4 justify-content-center'>Contact Us</h1>
        <div className='container d-flex justify-content-center'>
          <div className='mx-3 w-lg-50 w-md-75 '>
            <p>We value your feedback and are here to assist you. If you have any questions, concerns, or suggestions, please don't hesitate to get in touch with our friendly customer support team. You can reach us through below information.</p>
            <p>Thank you for choosing Care & Cure as your partner in prioritizing your health. We look forward to being a part of your wellness journey.</p>
          </div>
        </div>
        <div className='row mt-5'>
            <div className='col-sm-6 col-md-3 mt-2 ' >
              <div className='content3 mb-4'><i class="fa fa-solid fa-phone fa-2xl"></i></div>
              <h5 className='content3'>CALL TODAY</h5>
              <p className='content3'>+91 77004840</p>
            </div>
            <div className='col-sm-6 col-md-3 mt-2' >
              <div className='content3 mb-4'><i class="fa-solid fa-location-dot fa-2xl"></i></div>
              <h5 className='content3'>ADDRESS</h5>
              <p className='content3'>Iscon,Ahmedabad-380015</p>
            </div>
            <div className='col-sm-6 col-md-3 mt-2' >
              <div className='content3 mb-4'><i class="fa-solid fa-envelope fa-2xl"></i></div>
              <h5 className='content3'>EMAIL US</h5>
              <p className='content3'>care&cure247@gmail.com</p>
            </div>
            <div className='col-sm-6 col-md-3 mt-2' >
              <div className='content3 mb-4'><i class="fa-solid fa-clock fa-2xl"></i></div>
              <h5 className='content3'>OPENING HOURS</h5>
              <p className='content3 mb-1'>Mon-Fri 9:00 AM - 10:00 PM</p>
              <p className='content3'>Sat-Sun 11:00 AM - 5:00 PM</p>
            </div>
          
        </div> 
      </div>
    </>
  )
}

export default About