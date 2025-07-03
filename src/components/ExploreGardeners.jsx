import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaLeaf } from 'react-icons/fa';
import Header from './Header';
import Footer from './Footer';

// Helpers to generate random data
const randomAge = () => Math.floor(Math.random() * 40) + 20; // 20-59 years
const randomGender = () => (Math.random() < 0.5 ? 'Male' : 'Female');
const randomStatus = () => (Math.random() < 0.7 ? 'Active' : 'Inactive');
const randomExperience = () => Math.floor(Math.random() * 20) + 1; // 1-20 years
const randomTips = () => Math.floor(Math.random() * 100); // 0-99 tips

const ExploreGardeners = () => {
  const [gardeners, setGardeners] = useState([]);

  useEffect(() => {
    fetch('https://leafylife-server.vercel.app/gardeners')
      .then(res => res.json())
      .then(data => {
        const augmented = data.map(g => ({
          ...g,
          age: randomAge(),
          gender: randomGender(),
          status: randomStatus(),
          experience: randomExperience(),
          totalSharedTips: randomTips(),
          otherInfo: 'Loves gardening and plants 🌱',
        }));
        console.log('Augmented gardeners:', augmented);
        setGardeners(augmented);
      })
      .catch(err => console.error('Failed to fetch gardeners:', err));
  }, []);

  console.log('Rendering gardeners:', gardeners);

  return (
    <div><Header></Header>
    <div className="max-w-7xl mx-auto px-4 py-16">
        
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl font-extrabold mb-12 text-center text-green-800 flex items-center justify-center gap-3"
      >
        <FaLeaf className="text-green-600 animate-pulse" />
        All Gardeners
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {gardeners.map((gardener, index) => (
          <motion.div
            key={gardener._id}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 1.2, ease: 'easeOut' }}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl shadow-md border border-green-100 overflow-hidden hover:shadow-2xl transition-all duration-300"
          >
            <img
              src={gardener.image || 'https://i.ibb.co/3B8F5kL/default-user.png'}
              alt={gardener.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-6 text-center space-y-1">
              <h3 className="text-xl font-semibold text-green-900 mb-1">{gardener.name}</h3>
              <p className="text-sm text-gray-600 italic">{gardener.specialty || 'No specialty provided'}</p>

              {/* Randomized details */}
              <p className="text-sm text-gray-700">
                <strong>Age:</strong> {gardener.age} &nbsp; | &nbsp;
                <strong>Gender:</strong> {gardener.gender}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Status:</strong> {gardener.status} &nbsp; | &nbsp;
                <strong>Experience:</strong> {gardener.experience} years
              </p>
              <p className="text-sm text-gray-700">
                <strong>Total Shared Tips:</strong> {gardener.totalSharedTips}
              </p>
              <p className="text-xs italic text-green-600">{gardener.otherInfo}</p>
            </div>
            <div className="h-1 bg-gradient-to-r from-green-500 via-lime-400 to-green-500" />
          </motion.div>
        ))}
      </div>
    </div>
    <Footer></Footer>
    </div>
  );
};

export default ExploreGardeners;
