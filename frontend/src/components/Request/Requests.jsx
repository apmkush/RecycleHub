import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import RequestCard from './RequestCard';
import{backendUrl}from '../../service/url';

const Requests = () => {
    const [Items, setItems] = useState([]);
    const isDarkMode = useSelector((state) => state.theme.darkMode); // Get dark mode state

    // Function to fetch requests from the backend
    const fetchRequests = async () => {
        try {
            const response = await axios.get(`${backendUrl}/get-requests`);
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };

    useEffect(() => {
        fetchRequests();  
    }, []);

    // Filter items based on "awaiting pickup" status
    const awaitingPickupItems = Items.filter(item => item.status === 'awaiting pickup');
    
    return (
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 
            ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}> 
            {awaitingPickupItems.map((item, index) => (
                <RequestCard 
                    key={index} 
                    details={item} 
                    refreshpage={fetchRequests} 
                />
            ))}
        </div>
    );
}

export default Requests;
