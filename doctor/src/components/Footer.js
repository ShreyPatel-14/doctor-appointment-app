import React from 'react'
import './footer.css'
import fb from '../assets/fbimg.png'
import twitter from '../assets/twitterimg.png'
import linkedin from '../assets/linkedimg.png'
import insta from '../assets/instaimg.png'
function Footer() {
  return (
    <div className='footer'>
        <div className='sb_footer section_padding'>
            <div className='sb__footer-links'>
                
                <div className='sb__footer-links_div'>
                <h4>For Business</h4>
                    <a href="/employer">
                        <p>Employer</p>
                    </a>
                    <a href="/healthplan">
                        <p>Health Plan</p>
                    </a>
                    <a href="/individual">
                        <p>Individual</p>
                    </a>
                </div>
                <div className='sb__footer-links_div'>
                <h4>Company</h4>
                    <a href="/about">
                        <p>Employer</p>
                    </a>
                    
                </div>
                <div className='sb__footer-links_div'>
                <h4>Support</h4>
                    <a href="/employer">
                        <p>Contact Us</p>
                    </a>
                    <a href="/healthplan">
                        <p>Terms of Use</p>
                    </a>
                    <a href="/individual">
                        <p>Privacy Policy</p>
                    </a>
                </div>
                <div className='sb__footer-links_div'>
                <h4>Follow Us</h4>
                    <div className='socialmedia'>
                        <p><img src={fb} alt=""   /></p>
                        <p><img src={twitter} alt=""    /></p>
                        <p><img src={insta} alt=""    /></p>
                        <p><img src={linkedin} alt=""    /></p>
                    </div>
                </div>
            </div>
            <hr />
            <div className='sb__footer-below'>
                <div className='sb__footer-copyright'>
                    <p>
                        @{new Date().getFullYear()} - All rights reserved.
                    </p>
                </div>
                <div className='sb__footer-below-links'>
                    <a href="/terms">
                            <p>Terms & Conditions</p>
                    </a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer