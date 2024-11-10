import React from 'react';
import { useEffect } from 'react';
import axios, { Axios } from 'axios';;
import Card from './Card';

const Pricing = ({userRole}) => {
  const [scrapItems, setScrapItems] = React.useState([]);

  useEffect(() => {
    const fetchScrapItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getPrice');
        setScrapItems(response.data);
      } catch (error) {
        console.error('Error fetching scrap items:', error);
      }
    };
    fetchScrapItems();
  }, []);

  const groupedItems = scrapItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {Object.entries(groupedItems).map(([category, items], index) => (
        <section className="mb-8" key={index}>
          <h2 className="text-2xl font-semibold mb-4 text-center">{category}</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {items.map((item, idx) => (
              <Card
                key={idx}
                id={item._id}
                image={item.image}
                price={item.price}
                material={item.material}
                userRole={userRole}
              />
            ))}
          </div>
        </section>
      ))}
    </div>


  );
};

export default Pricing;



{/* <Card image = {'./images/NonRecyclable/Aluminium.png'} 
                price = {10}
                material={'Aluminium'}
                userRole={'customer'}
            />  */}