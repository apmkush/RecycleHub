import React from 'react';
// import brassScrapImage from ''; // Replace with your actual image path

function BrassScrapInfo() {
  return (
    <div className="container mx-auto p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-yellow-700 mb-8 sm:mb-12">Brass Scrap</h1>
      
      <section className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row items-center mb-8">
        <img 
          src='' 
          alt="Brass Scrap" 
          className="w-full md:w-1/3 rounded-lg shadow-lg mb-4 md:mb-0 md:mr-6" 
        />
        <div className="text-gray-700 md:flex-1">
          <p className="text-lg leading-relaxed mb-4">
            Brass scrap is a valuable commodity within the recycling industry due to its composition of copper and zinc, 
            which give it durability, resistance to corrosion, and a broad range of applications. Brass recycling is an essential 
            part of metal recovery, reducing the need for mining and conserving natural resources. 
          </p>
          <p className="text-lg leading-relaxed mb-4">
            Recycling brass not only saves energy but also reduces environmental impact, as producing brass from raw materials 
            requires significantly more energy. By participating in brass scrap recycling, individuals and businesses contribute 
            to a more sustainable, eco-friendly world.
          </p>
        </div>
      </section>

      <section className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-yellow-700 mb-4">Types of Brass Scrap</h2>
        <ul className="list-disc ml-5 space-y-2 text-gray-700 text-lg">
          <li>Yellow Brass: Commonly used in plumbing, with a high zinc content.</li>
          <li>Red Brass: Contains more copper, making it ideal for valves and fixtures.</li>
          <li>Cartridge Brass: Known for its use in bullet casings and industrial machinery.</li>
          <li>Plumbing Brass: Often includes fittings and pipe joints.</li>
          <li>Brass Shell Casings: Popular in ammunition recycling.</li>
        </ul>
      </section>

      <section className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-yellow-700 mb-4">Benefits of Selling Brass Scrap</h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          Selling brass scrap provides numerous benefits, including earning extra income and promoting environmental sustainability. 
          Brass retains its value in the recycling market due to its durability and the high demand for recycled metals. 
          By selling brass scrap, individuals can contribute to a circular economy, which keeps valuable materials in use.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed">
          Additionally, businesses can benefit from reduced waste disposal costs and a positive environmental reputation. 
          Recycling brass helps prevent metal from ending up in landfills, reducing soil and water contamination risks.
        </p>
      </section>

      <section className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-yellow-700 mb-4">How to Sell Your Brass Scrap</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          If you're interested in selling brass scrap, 
          Dealers looking for brass scrap can. 
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mt-4">
          Our platform connects sellers and buyers in the scrap metal industry, ensuring a smooth and reliable transaction process.
          Whether you're looking to sell in bulk or small quantities, we provide a marketplace that values transparency and quality.
        </p>
      </section>

      
    </div>
  );
}

export default BrassScrapInfo;
