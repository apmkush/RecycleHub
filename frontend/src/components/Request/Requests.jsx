import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import RequestCard from './RequestCard';
import{backendUrl}from '../../service/url';

const Requests = () => {
    const [Items, setItems] = useState([]);
    const isDarkMode = useSelector((state) => state.theme.darkMode); // Get dark mode state
    const { token } = useSelector((state) => state.auth);

    // Function to fetch requests from the backend
    const fetchRequests = async () => {
        try {
            const response = await axios.get(`${backendUrl}/get-requests`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };

    useEffect(() => {
        fetchRequests();  
    }, []);

    const availableRequests = Items.filter(item => item.status === 'not accepted');
    
    return (
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 
            ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}> 
            {availableRequests.map((item, index) => (
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
