import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faFacebook, faTwitter, faPinterest, faInstagram } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer className="bg-gray-800 bg-opacity-90 text-gray-300 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Footer Section 1 */}
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold text-white">Recycle Hub</h1>
            <p className="text-md text-gray-300 mt-1">Recycle, Earn, Repeat</p>

            <div className="mt-4">
              <h4 className="text-white font-semibold text-xl mb-2">Social Media</h4>
              <div className="flex space-x-2">
                <a href="/" className="text-white text-2xl"><FontAwesomeIcon icon={faFacebook} /></a>
                <a href="/" className="text-white text-2xl"><FontAwesomeIcon icon={faTwitter} /></a>
                <a href="/" className="text-white text-2xl"><FontAwesomeIcon icon={faPinterest} /></a>
                <a href="/" className="text-white text-2xl"><FontAwesomeIcon icon={faInstagram} /></a>
              </div>
            </div> 
          </div>

          {/* Footer Section 2 */}
          <div>
            <h4 className="font-semibold text-2xl mb-2 text-white">Company</h4>
            <div className="grid grid-cols-2 gap-2 text-md text-gray-300">
              <ul className="space-y-2">
                <li><Link to="/Home" className="hover:underline hover:text-maroon">Home</Link></li>
                <li><a href="#" className="hover:underline hover:text-maroon">About Us</a></li>
                <li><a href="#" className="hover:underline hover:text-maroon">FAQ</a></li>
                <li><a href="#" className="hover:underline hover:text-maroon">Privacy Policy</a></li>
                <li><a href="#" className="hover:underline hover:text-maroon">Services</a></li>
              </ul>
              <ul className="space-y-2">
                <li><Link to="/CopperScrapInfo" className="hover:underline hover:text-maroon">Copper Scrap</Link></li>
                <li><Link to="/BrassScrapInfo" className="hover:underline hover:text-maroon">Brass Scrap</Link></li>
                <li><Link to="/ElectronicScrapInfo" className="hover:underline hover:text-maroon">Electronic Scrap</Link></li>
                <li><Link to="/Best" className="hover:underline hover:text-maroon">Best Steel Scrap Buyers in India</Link></li>
              </ul>
            </div>
          </div>

          {/* Footer Section 3 */}
          <div className="flex flex-col items-start">
            <h4 className="font-semibold text-2xl text-white mb-4">Contact Us</h4>
            <p className="text-md text-gray-300">
              <strong>E-Mail:</strong> 
              <a href="mailto:birjesh.20225024@mnnit.ac.in" className="hover:underline ml-1 text-gray-300">
                birjesh.20225024@mnnit.ac.in
              </a>
            </p>
            <p className="text-sm text-gray-300">
              <strong>Phone:</strong> 
              <a href="tel:+918081955858" className="hover:underline ml-1 text-gray-300">
                +91 8081955858
              </a>
            </p>
            <p className="text-md text-white-400 mt-4">Get in touch through our social media channels or email.</p>
          </div>
        </div>
        <div className="text-center mt-8 text-md">&copy; 2024 VidyaSetu. All rights reserved.</div>
      </div>
    </footer>
  );
}

export default Footer;
