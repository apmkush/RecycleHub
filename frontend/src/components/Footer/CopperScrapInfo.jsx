import React from 'react';
import { Link } from 'react-router-dom';

function CopperScrapInfo() {
  return (
    <div className="container mx-auto p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-green-700 mb-8 sm:mb-12">Copper Scrap</h1>

      <section className="bg-white shadow-md rounded-lg p-6 mb-8">
        <p className="text-gray-700 text-lg leading-relaxed">
          Copper scrap is one of the most valuable forms of scrap metal due to its versatility and high demand in the recycling industry. 
          Recycling copper is essential as it helps conserve natural resources, reduces energy usage, and limits waste sent to landfills.
        </p>
      </section>

      <section className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">Types of Copper Scrap</h2>
        <ul className="list-disc ml-5 space-y-2 text-gray-700 text-lg">
          <li>Bright Copper Wire</li>
          <li>Insulated Copper Wire</li>
          <li>Mixed Copper Scrap</li>
          <li>Copper Tubing</li>
          <li>Copper Turnings and Shavings</li>
        </ul>
      </section>

      <section className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">Benefits of Selling Copper Scrap</h2>
        <p className="text-gray-700 text-lg">
          Selling copper scrap is an excellent way to earn extra income while helping to sustain the environment.
          Dealers are often eager to buy copper scrap due to its high resale value and recyclability. By selling copper scrap,
          customers contribute to a circular economy and promote a sustainable future.
        </p>
      </section>

      <section className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">How to Sell Your Copper Scrap</h2>
        <p className="text-gray-700 text-lg">
          If you're interested in selling copper scrap, <Link to="/register" className="text-green-600 hover:underline font-semibold">register with us</Link> to get started. 
          Dealers looking for copper scrap can <Link to="/search" className="text-green-600 hover:underline font-semibold">search our listings</Link> based on their needs.
        </p>
      </section>

      <footer className="text-center mt-12">
        <p className="text-gray-600 text-sm">&copy; 2024 Recycle Hub. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default CopperScrapInfo;
