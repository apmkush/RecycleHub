import React from 'react';
import { useEffect , useState } from 'react';
import axios, { Axios } from 'axios';;
import Card from './Card';
import AddItem from './AddItem';
import AddDetails from './AddDetails';

const Pricing = ({userRole}) => {
  const [scrapItems, setScrapItems] = React.useState([]);
  const [showAddDetails, setShowAddDetails] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchScrapItems = async () => {
    try {
      console.log(import.meta.env.VITE_BACKEND_URL);
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getPrice`);
      
      setScrapItems(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error('Error fetching scrap items:', error);
    }
  };

  useEffect(() => {
    fetchScrapItems();  
  }, []);

  const groupedItems = scrapItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  const handleAddItemClick = (category) => {
    setSelectedCategory(category);
    setShowAddDetails(true);
  };
  
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
                userRole="admin"
              />
            ))}
            <AddItem setShowAddDetails = {setShowAddDetails} setSelectedCategory = {setSelectedCategory} category={category}/>
            {showAddDetails && selectedCategory && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <AddDetails 
                  setShowAddDetails={setShowAddDetails}
                  category = {selectedCategory}
                  refreshItems={fetchScrapItems}
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

