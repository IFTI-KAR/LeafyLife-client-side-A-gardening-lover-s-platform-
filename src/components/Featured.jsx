import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaLeaf } from 'react-icons/fa';

const Featured = () => {
  const [gardeners, setGardeners] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/gardeners/featured')
      .then(res => res.json())
      .then(data => setGardeners(data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Title with icon */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl font-extrabold mb-12 text-center text-green-800 flex items-center justify-center gap-3"
      >
        <FaLeaf className="text-green-600 animate-pulse" />
        Featured Gardeners
      </motion.h2>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {gardeners.map((gardener, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 1.2, ease: 'easeOut' }}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl shadow-md border border-green-100 overflow-hidden hover:shadow-2xl transition-all duration-300"
          >
            <img
              src={gardener.image}
              alt={gardener.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold text-green-900 mb-2">
                {gardener.name}
              </h3>
              <p className="text-sm text-gray-600 italic">
                {gardener.specialty}
              </p>
            </div>
            <div className="h-1 bg-gradient-to-r from-green-500 via-lime-400 to-green-500" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
