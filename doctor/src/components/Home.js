import React from "react";
import "./home.css";
import Doctor_image from "../doctor.webp";
import Doctor_image2 from "../doctor2.webp";
import { Link } from "react-router-dom";
import pic from "./about.jpg";
import "./about.scss";
import Main from "../Doctor/Main";
function Home() {
  return (
    <>
    { localStorage.getItem("is_doctor") ? (
      <>
      
      </>
    ) : (
    <div className="container main-page" data-bs-smooth-scroll="true">
      <div className="title">
        <div className="heading">
          <h1>
            We Care About <span>You</span> and Your <span>Families</span>
          </h1>
        </div>
        <div className="info">
          <p>
            Check out your families health by contacting our Profressional
            Doctors by a simple Appointment.
          </p>
        </div>
      </div>
      <div className="features">
        <div className="advantages">
          <h3>Our Features</h3>
          <ul type="none" className="items">
            <li>
              <i className="fa-solid fa-calendar"></i>Make an appointment
            </li>
            <li>
              <i className="fa-solid fa-user"></i>User Dashboard
            </li>
            <li>
              <i className="fa-solid fa-user-doctor"></i>Doctor Dashboard
            </li>
          </ul>
        </div>
        <div className="image1">
          <img src={Doctor_image} alt="doctor_image" />
        </div>
      </div>
      <div className="appointment">
        <div className="image2">
          <img src={Doctor_image2} alt="doctor_image" />
        </div>
        <div className="options">
          <h6>Quick Solution</h6>
          <h2>
            Easy <span>Same</span> or Next-day Appointments
          </h2>
          <p>
            Easily make appointment with our best doctor for your families in
            same day or the next day.
          </p>
          <ul type="none" className="items">
            <li>
              <i className="fa-solid fa-calendar-week"></i>Easy Online Booking
              Here
            </li>
            <li>
              <i className="fa-solid fa-calendar-check"></i>Best quality
              Appointment services
            </li>
          </ul>
          <div className="booking">
            <button className="book">Book Appointment</button>
          </div>
        </div>
      </div>
      <div className="services">
        <div className="heading">
          <h1>
            The <span>Best Quality</span> Service for Your Family
          </h1>
        </div>
        <div className="type_cards">
          <div className="card">
            <div className="icon">
              <div>
                <i className="fa-solid fa-stethoscope"></i>
              </div>
              <div>
                <p>Primary Care</p>
              </div>
            </div>
            <div className="desc">
              <p>
                Our certified doctors provide best medical care to help keep you
                happy.
              </p>
            </div>
            <div className="learnMore">
              <h6>Learn More</h6>
              <i className="fa-solid fa-arrow-right"></i>
            </div>
          </div>
          <div className="card">
            <div className="icon">
              <div>
                <i className="fa-solid fa-heart-pulse"></i>
              </div>
              <div>
                <p>Heart Care</p>
              </div>
            </div>
            <div className="desc">
              <p>
                The most advance doctor and facility heart care in region
                happens Care and Cure.
              </p>
            </div>
            <div className="learnMore">
              <h6>Learn More</h6>
              <i className="fa-solid fa-arrow-right"></i>
            </div>
          </div>
          <div className="card">
            <div className="icon">
              <div>
                <i className="fa-solid fa-heart-pulse"></i>
              </div>
              <div>
                <p>Dermatology</p>
              </div>
            </div>
            <div className="desc">
              <p>
                Talk with our Dermatologist doctor to keep your hair look
                beautiful everyday.
              </p>
            </div>
            <div className="learnMore">
              <h6>Learn More</h6>
              <i className="fa-solid fa-arrow-right"></i>
            </div>
          </div>
          <div className="card">
            <div className="icon">
              <div>
                <i className="fa-solid fa-heart-pulse"></i>
              </div>
              <div>
                <p>Urology</p>
              </div>
            </div>
            <div className="desc">
              <p>
                Care and Cure urologist are dedicated to delivering
                patient-centered urologic care to everyone.
              </p>
            </div>
            <div className="learnMore">
              <h6>Learn More</h6>
              <i className="fa-solid fa-arrow-right"></i>
            </div>
          </div>
          <div className="card">
            <div className="icon">
              <div>
                <i className="fa-solid fa-heart-pulse"></i>
              </div>
              <div>
                <p>Orthopaedics</p>
              </div>
            </div>
            <div className="desc">
              <p>
                Our expert team specializes in treatments to help you get back
                to normal acitivities.
              </p>
            </div>
            <div className="learnMore">
              <h6>Learn More</h6>
              <i className="fa-solid fa-arrow-right"></i>
            </div>
          </div>
          <div className="card">
            <div className="icon">
              <div>
                <i className="fa-solid fa-heart-pulse"></i>
              </div>
              <div>
                <p>Surgery</p>
              </div>
            </div>
            <div className="desc">
              <p>
                Surgeons at Care and Cure have expertise in colorectal, and
                general surguries.
              </p>
            </div>
            <div className="learnMore">
              <h6>Learn More</h6>
              <i className="fa-solid fa-arrow-right"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="doctor_head">
        <h1>
          Meet our <span>Specialists</span>
        </h1>
      </div>
      <div className="specialists">
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="doctor_card">
            <img src={Doctor_image2} alt="doc_image" />
            <h5>Dr. Dhairya Patel</h5>
            <p>Family Practice</p>
          </div>
        </Link>
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="doctor_card">
            <img src={Doctor_image2} alt="doc_image" />
            <h5>Dr. Jinay Doshi</h5>
            <p>Gynecologist</p>
          </div>
        </Link>
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="doctor_card">
            <img src={Doctor_image2} alt="doc_image" />
            <h5>Dr. Shrey Patel</h5>
            <p>Cardiologist</p>
          </div>
        </Link>
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="doctor_card">
            <img src={Doctor_image2} alt="doc_image" />
            <h5>Dr. Mansi Parmar</h5>
            <p>General Surgery</p>
          </div>
        </Link>
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="doctor_card">
            <img src={Doctor_image2} alt="doc_image" />
            <h5>Dr. Henil Patel</h5>
            <p>Dermatologist</p>
          </div>
        </Link>
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="doctor_card">
            <img src={Doctor_image2} alt="doc_image" />
            <h5>Dr. Jayveer Jadeja</h5>
            <p>Orthopedic</p>
          </div>
        </Link>
      </div>
      <div className="about">
        <div className="d-lg-flex">
          <div className="mx-3 w-50 content1">
            <img className="img w-100" src={pic} alt="not found" />
          </div>
          <div className="w-50 mx-3 content2" id="about">
            <div>
              <h1>About Us</h1>
              <p>
                Welcome to Care & Cure, your trusted partner in simplifying
                healthcare access through convenient and efficient doctor
                appointment booking. Our platform was born out of a shared
                vision to bridge the gap between patients and healthcare
                providers, making the process of booking appointments seamless
                and hassle-free.
              </p>
            </div>
          </div>
        </div>
        <h1 className="d-flex mt-4 justify-content-center" id="contact">
          Contact Us
        </h1>
        <div className="container d-flex justify-content-center">
          <div className="mx-3 w-lg-50 w-md-75 ">
            <p>
              We value your feedback and are here to assist you. If you have any
              questions, concerns, or suggestions, please don't hesitate to get
              in touch with our friendly customer support team. You can reach us
              through below information.
            </p>
            <p>
              Thank you for choosing Care & Cure as your partner in prioritizing
              your health. We look forward to being a part of your wellness
              journey.
            </p>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-sm-6 col-md-3 mt-2 ">
            <div className="content3 mb-4">
              <i class="fa fa-solid fa-phone fa-2xl"></i>
            </div>
            <h5 className="content3">CALL TODAY</h5>
            <p className="content3">+91 77004840</p>
          </div>
          <div className="col-sm-6 col-md-3 mt-2">
            <div className="content3 mb-4">
              <i class="fa-solid fa-location-dot fa-2xl"></i>
            </div>
            <h5 className="content3">ADDRESS</h5>
            <p className="content3">Iscon,Ahmedabad-380015</p>
          </div>
          <div className="col-sm-6 col-md-3 mt-2">
            <div className="content3 mb-4">
              <i class="fa-solid fa-envelope fa-2xl"></i>
            </div>
            <h5 className="content3">EMAIL US</h5>
            <p className="content3">care&cure247@gmail.com</p>
          </div>
          <div className="col-sm-6 col-md-3 mt-2">
            <div className="content3 mb-4">
              <i class="fa-solid fa-clock fa-2xl"></i>
            </div>
            <h5 className="content3">OPENING HOURS</h5>
            <p className="content3 mb-1">Mon-Fri 9:00 AM - 10:00 PM</p>
            <p className="content3">Sat-Sun 11:00 AM - 5:00 PM</p>
          </div>
        </div>
      </div>
    </div>)}
    </>
  )
  ;
}

export default Home;
