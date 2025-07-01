import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { FaThumbsUp } from 'react-icons/fa';
import Header from './Header';
import Footer from './Footer';
import { motion } from 'framer-motion';

const TipDetails = () => {
  const { id } = useParams();
  const [tip, setTip] = useState(null);

  const fetchTip = () => {
    fetch(`http://localhost:3000/tips/${id}`)
      .then(res => res.json())
      .then(data => setTip(data));
  };

  useEffect(() => {
    fetchTip();
  }, [id]);

  const handleLike = async () => {
    await fetch(`http://localhost:3000/tips/like/${id}`, {
      method: 'PATCH'
    });
    fetchTip(); // Refresh after like
  };

  if (!tip) return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <p className="text-xl text-gray-500">Loading Tip Details...</p>
    </div>
  );

  return (
    <div className="bg-green-50 min-h-screen">
      <Header />

      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-2xl rounded-3xl overflow-hidden"
        >
          <img 
            src={tip.image} 
            alt={tip.title} 
            className="w-full h-72 object-cover" 
          />
          <div className="p-8">
            <h1 className="text-4xl font-bold text-green-800 mb-4">{tip.title}</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-gray-700">
              <p><strong>🌿 Category:</strong> {tip.category}</p>
              <p><strong>🪴 Plant Type:</strong> {tip.plantType}</p>
              <p><strong>⚙️ Difficulty:</strong> {tip.difficulty}</p>
            </div>

            <p className="text-gray-800 leading-relaxed whitespace-pre-line mb-6">
              <strong>Description:</strong><br />{tip.description}
            </p>

            <button
              onClick={handleLike}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 transition-colors text-white font-semibold py-2 px-5 rounded-full shadow-md"
            >
              <FaThumbsUp /> Like ({tip.totalLiked || 0})
            </button>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default TipDetails;
