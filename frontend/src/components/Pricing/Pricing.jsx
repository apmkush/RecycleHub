import React from 'react';
import { useEffect , useState } from 'react';
import axios, { Axios } from 'axios';;
import Card from './Card';
import AddItem from './AddItem';
import AddDetails from './AddDetails';

const Pricing = ({userRole}) => {
  const [scrapItems, setScrapItems] = React.useState([]);
  const [showAddDetails, setShowAddDetails] = useState(false);

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
            <AddItem setShowAddDetails = {setShowAddDetails} />
            {showAddDetails && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <AddDetails 
                  setShowAddDetails={setShowAddDetails}
                  category = {category}
                />
              </div>
            )}
          </div>
        </section>
      ))} 
    </div>
  );
};

export default Pricing;

