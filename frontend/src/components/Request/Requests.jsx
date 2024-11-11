import React from 'react';
import RequestCard from './RequestCard';

const Requests = () => {
    const items = [
        {
            image: './laptop.png',
            itemName: 'Scrap Metal',
            weight: '5 kg',
            price: '50',
            pickupDate: '2023-05-21',
            pickupTime: '14:30',
            address: '123 Junkyard Avenue, Cityville',
            description: 'A batch of scrap metal ready for recycling.',
            status: 'awaiting pickup',
        },
        {
            image: './metal.png',
            itemName: 'Iron Rods',
            weight: '10 kg',
            price: '80',
            pickupDate: '2023-05-22',
            pickupTime: '10:00',
            address: '456 Metal Road, Scrapville',
            description: 'Iron rods for recycling.',
            status: 'completed',
        },
        {
            image: './copper.png',
            itemName: 'Copper Wires',
            weight: '3 kg',
            price: '120',
            pickupDate: '2023-05-23',
            pickupTime: '09:30',
            address: '789 Copper Ave, Cityville',
            description: 'Copper wires to be recycled.',
            status: 'awaiting pickup',
        },
        // Add more items as needed
    ];

    // Filter items based on "awaiting pickup" status
    const awaitingPickupItems = items.filter(item => item.status === 'awaiting pickup');
    
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {awaitingPickupItems.map((item, index) => (
                <RequestCard key={index} details={item} />
            ))}
        </div>
    );
}

export default Requests;
