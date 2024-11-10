import React from 'react';
import Card from './Card';

const Pricing = ({userRole}) => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      {/* Non Recyclables Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Non Recyclables</h2>
        <Card
          image={'./images/NonRecyclable/Bottles.png'}
          price={10}
          scrapType={'Aluminium'}
          userRole={'admin'}
        />
        
      </section>

      {/* Large Appliances Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Large Appliances</h2>
        <Card
          image={'./images/LargeAppliances/AC.png'}
          price={50}
          scrapType={'Washing Machine'}
          userRole={'customer'}
        />
      </section>

      {/* Small Appliances Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Small Appliances</h2>
        <Card
          image={'./images/SmallAppliances/battery.png'}
          price={15}
          scrapType={'Toaster'}
          userRole={'customer'}
        />
      </section>

      {/* Mobile Computers Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Mobile Computers</h2>
        <Card
          image={'./images/MobileComputers/Laptop.png'}
          price={100}
          scrapType={'Laptop'}
          userRole={'customer'}
        />
      </section>

      {/* Others Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Others</h2>
        <Card
          image={'./images/Others/Bike.png'}
          price={8}
          scrapType={'Bike'}
          userRole={'customer'}
        />
      </section>
    </div>
  );
};

export default Pricing;



{/* <Card image = {'./images/NonRecyclable/Aluminium.png'} 
                price = {10}
                scrapType={'Aluminium'}
                userRole={'customer'}
            />  */}