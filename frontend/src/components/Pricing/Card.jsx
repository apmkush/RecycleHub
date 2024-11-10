import React from 'react';
import { Link } from 'react-router-dom';
import CardDetails from './CardDetails'; // Import CardDetails component

const Card = ({ image, price, scrapType, userRole }) => {
  return (
    <div className="text-center p-4">
      {/* Conditionally render the Link only for customers */}
      {userRole === 'customer' ? (
        <Link
          to="/Pickup"
          state={{ item: scrapType }} // Passing scrapType as item to PickupForm
          className="block w-full" // Ensures the link wraps the entire card
        >
          {/* Render CardDetails Component */}
          <CardDetails
            image={image}
            price={price}
            scrapType={scrapType}
            userRole={userRole}
          />
        </Link>
      ) : (
        // Render only the card if userRole is not 'customer'
        <CardDetails
          image={image}
          price={price}
          scrapType={scrapType}
          userRole={userRole}
        />
      )}
    </div>
  );
};

export default Card;
