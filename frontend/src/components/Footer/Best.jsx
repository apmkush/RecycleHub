import React from 'react';
import steel from './steel.png';

function BestSteelScrapBuyers() {
  return (
    <div className="container mx-auto p-8 bg-gray-200 min-h-screen">
      <h1 className="text-5xl font-bold text-center text-blue-800 mb-8 sm:mb-12">Best Steel Scrap Buyers in India</h1>
      
      <section className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row items-center mb-8">
        <img 
          src={steel} 
          alt="Steel Scrap" 
          className="w-full md:w-1/3 rounded-lg shadow-md mb-4 md:mb-0 md:mr-6" 
        />
        <div className="text-gray-800 md:flex-1">
          <p className="text-lg leading-relaxed mb-4">
            Looking to sell steel scrap in India? Our platform connects you with the best steel scrap buyers across the country, ensuring a seamless and rewarding experience. 
            Whether you're an individual or a business, we offer reliable and convenient services to help you sell your scrap metal quickly and easily.
          </p>
          <p className="text-lg leading-relaxed mb-4">
            With a growing network of verified buyers, we make it easier than ever to find a trustworthy dealer near you, receive instant payments, and get the best market prices for your steel scrap.
          </p>
        </div>
      </section>

      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-3xl font-semibold text-blue-800 mb-4">Why Choose Our Platform?</h2>
        <ul className="list-disc ml-5 space-y-3 text-gray-700 text-lg">
          <li><span className="font-semibold text-blue-700">Find Dealers in Your Neighborhood:</span> Locate steel scrap buyers in your area with ease, ensuring quick and convenient transactions.</li>
          <li><span className="font-semibold text-blue-700">Instant Payments:</span> Receive payments instantly upon sale completion, providing you with immediate financial benefits.</li>
          <li><span className="font-semibold text-blue-700">Best Market Prices:</span> Our platform ensures competitive pricing, helping you maximize your profit on each sale.</li>
          <li><span className="font-semibold text-blue-700">Verified and Trusted Buyers:</span> We only partner with reputable dealers, so you can have confidence in each transaction.</li>
          <li><span className="font-semibold text-blue-700">Hassle-Free Process:</span> Our streamlined platform is designed for a user-friendly experience from start to finish.</li>
        </ul>
      </section>

      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-3xl font-semibold text-blue-800 mb-4">How to Get Started</h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          Selling your steel scrap with us is simple. <a href="http://localhost:5173/login" className="text-blue-500 hover:underline font-semibold">Register</a> on our platform and create a listing. 
          We will connect you with local buyers who are ready to offer competitive prices. 
          You can even browse through available buyers and choose the one that best suits your needs.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed">
          We are committed to making the scrap selling process as easy and rewarding as possible. Experience hassle-free scrap selling with fast transactions, trusted dealers, 
          and instant payments.
        </p>
      </section>

    </div>
  );
}

export default BestSteelScrapBuyers;
