import React, { useState, useEffect } from 'react';
import image1 from './top/images/scrap1.webp';
import image2 from './top/images/scrap2.jpg';
import image3 from './top/images/scrap3.jpg';
import image4 from './top/images/scrap4.jpg';
import paymentImage from './images/payment.png';
import pickupImage from './images/pickup.jpg';
import scheduleImage from './images/schedule.jpg';
import weight from './whyus/images/weight.png';
import instantPayment from './whyus/images/moneyTransfer.png';
import convenience from './whyus/images/convenience.png';

const images = [image1, image2, image3, image4];

function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFade(true);
      }, 1000);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-full h-full overflow-hidden rounded-lg shadow-lg mx-auto">
      <img
        src={images[currentIndex]}
        alt="Slideshow"
        className={`w-full h-full object-cover transition-opacity duration-1000 ${fade ? 'opacity-100' : 'opacity-10'}`}
      />
    </div>
  );
}

const Top = () => {
  return (
    <div className="w-full bg-gray-100 flex items-center justify-center py-10 md:py-20">
      <div className="w-full max-w-5xl flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-lg shadow-lg">
        <div className="md:w-1/2 p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            RecycleHub: The Global Platform for Buying and Selling Scrap Metals
          </h2>
          <p className="text-gray-700 text-lg">
            RecycleHub simplifies the buying and selling of scrap and recyclable metals across more than 100 countries. Our platform
            provides a secure environment where businesses can verify materials, secure advance payments, and manage logistics without
            travel or language barriers. Find, negotiate, and connect with verified companies in the industry for the materials you need,
            and let us take care of the rest.
          </p>
        </div>
        <div className="md:w-1/2 mt-6 md:mt-0">
          <ImageCarousel />
        </div>
      </div>
    </div>
  );
};

const HowItWorks = () => {
  return (
    <div className="bg-gray-100 py-10 px-6 rounded-lg shadow-lg text-center">
      <h2 className="text-3xl font-semibold mb-8 text-gray-800">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
          <img src={scheduleImage} alt="Schedule Pickup" className="w-[75%] h-30 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800">Schedule a Pickup</h3>
          <p className="text-gray-600">Select a convenient time for pickup.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
          <img src={pickupImage} alt="Doorstep Pickup" className="w-25 h-25 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800">Pickup at Your Doorstep</h3>
          <p className="text-gray-600">Our team arrives at your doorstep.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
          <img src={paymentImage} alt="Get Paid" className="w-[57%] h-18 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800">Instant Payment</h3>
          <p className="text-gray-600">Receive payment on the spot.</p>
        </div>
      </div>
    </div>
  );
};

const WhyUs = () => {
  return (
    <div className="bg-red-50 py-10 px-6 rounded-lg shadow-lg text-center">
      <h2 className="text-3xl font-semibold mb-8 text-gray-800">Why Us</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
          <img src={weight} alt="Accurate Weight" className="w-[60%] h-22 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800">Accurate Weight</h3>
          <p className="text-gray-600">Digital weighing for trustworthy prices.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
          <img src={instantPayment} alt="Instant Payment" className="w-[60%] h-27 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800">Instant Payment</h3>
          <p className="text-gray-600">Get paid instantly for your scrap.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
          <img src={convenience} alt="Convenience" className="w-[57%] h-18 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800">Convenience</h3>
          <p className="text-gray-600">Easy pickups across Hyderabad.</p>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="space-y-10">
      <Top />
      <HowItWorks />
      <WhyUs />
    </div>
  );
};

export default Home;
