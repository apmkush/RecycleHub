import React from 'react';
// import electronicScrapImage from ''; // Replace with your actual image path

function ElectronicScrapInfo() {
  return (
    <div className="container mx-auto p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-green-700 mb-8 sm:mb-12">Electronic Scrap</h1>
      
      <section className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row items-center mb-8">
        <img 
          src='' 
          alt="Electronic Scrap" 
          className="w-full md:w-1/3 rounded-lg shadow-lg mb-4 md:mb-0 md:mr-6" 
        />
        <div className="text-gray-700 md:flex-1">
          <p className="text-lg leading-relaxed mb-4">
            Electronic scrap, also known as e-waste, consists of discarded electronic devices and components that are no longer functional or have been replaced by newer technology. With the rapid growth of electronics, e-waste recycling has become essential to manage waste and recover valuable materials.
          </p>
          <p className="text-lg leading-relaxed mb-4">
            Recycling electronic scrap not only conserves resources but also reduces environmental pollution caused by toxic elements found in electronic devices, such as lead, mercury, and cadmium. By recycling e-waste, we help protect the environment and reduce the demand for mining raw materials.
          </p>
        </div>
      </section>

      <section className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">Types of Electronic Scrap</h2>
        <ul className="list-disc ml-5 space-y-2 text-gray-700 text-lg">
          <li>Printed Circuit Boards (PCBs): Contain valuable metals such as gold, silver, and copper.</li>
          <li>Computer Components: Includes CPUs, RAM, and hard drives, which can be recycled for precious metals.</li>
          <li>Mobile Phones and Tablets: Often contain rare earth metals and recyclable plastic.</li>
          <li>Batteries: Lithium-ion and other batteries can be hazardous and should be recycled properly.</li>
          <li>Televisions and Monitors: Contain glass, metals, and sometimes hazardous chemicals.</li>
        </ul>
      </section>

      <section className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">Benefits of Recycling Electronic Scrap</h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          Recycling electronic scrap offers significant environmental and economic benefits. Recovering metals and components from e-waste reduces the need for new mining, conserves natural resources, and reduces energy use. Additionally, proper e-waste recycling prevents hazardous materials from entering the environment, protecting both ecosystems and human health.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed">
          By recycling electronic scrap, businesses and individuals can also reduce their waste footprint and contribute to a sustainable circular economy, keeping valuable materials in use and reducing landfill demand.
        </p>
      </section>

      <section className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">How to Recycle Your Electronic Scrap</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          If you have electronic scrap to recycle,to get started. Our platform connects e-waste sellers with buyers who are seeking specific electronic materials for recycling.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mt-4">
          From large-scale e-waste to individual items, our marketplace provides a secure and reliable platform for recycling. Start recycling your electronic scrap with ease, knowing you’re contributing to a cleaner, more sustainable future.
        </p>
      </section>

      <footer className="text-center mt-12 text-sm text-gray-600">
        <p>&copy; 2024 Recycle Hub. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default ElectronicScrapInfo;
