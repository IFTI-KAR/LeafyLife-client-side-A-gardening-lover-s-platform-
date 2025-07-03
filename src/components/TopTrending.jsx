import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaFire, FaThumbsUp } from 'react-icons/fa';
import { Link } from 'react-router';

const TopTrending = () => {
  const [tips, setTips] = useState([]);
  const [likedTips, setLikedTips] = useState(() => {
    // Store liked tips IDs in localStorage to disable multiple likes
    const saved = localStorage.getItem('likedTips');
    return saved ? JSON.parse(saved) : [];
  });

  // Fetch tips sorted by totalLiked desc
  const fetchTips = () => {
    fetch('https://leafylife-server.vercel.app/tips/trending')
      .then(res => res.json())
      .then(data => {
        // Sort tips by totalLiked descending
        const sortedTips = data.sort((a, b) => (b.totalLiked || 0) - (a.totalLiked || 0));
        setTips(sortedTips);
      });
  };

  useEffect(() => {
    fetchTips();
  }, []);

  const handleLike = async (tipId) => {
    if (likedTips.includes(tipId)) return; // Already liked

    try {
      const res = await fetch(`https://leafylife-server.vercel.app/tips/like/${tipId}`, {
        method: 'PATCH',
      });
      if (res.ok) {
        // Update liked tips locally and refresh list
        const newLikedTips = [...likedTips, tipId];
        setLikedTips(newLikedTips);
        localStorage.setItem('likedTips', JSON.stringify(newLikedTips));
        fetchTips();
      } else {
        alert('Failed to like tip. Try again later.');
      }
    } catch (err) {
      alert('Network error: ' + err.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold mb-12 text-center text-orange-700 flex justify-center items-center gap-3">
        <FaFire className="text-red-500 animate-bounce" />
        Top Trending Garden Tips
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {tips.map((tip, index) => (
          <motion.div
            key={tip._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border flex flex-col"
          >
            <img
              src={tip.image}
              alt={tip.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-lg font-bold text-green-900 mb-2">{tip.title}</h3>
              <p className="text-sm text-gray-600 flex-grow">{tip.description.length > 100 ? tip.description.slice(0, 100) + '...' : tip.description}</p>
              
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-green-700 font-semibold">
                  <FaThumbsUp />
                  <span>{tip.totalLiked || 0}</span>
                </div>

                <button
                  onClick={() => handleLike(tip._id)}
                  disabled={likedTips.includes(tip._id)}
                  className={`flex items-center gap-2 px-3 py-1 rounded-md text-white ${
                    likedTips.includes(tip._id)
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700'
                  } transition-colors duration-300`}
                  title={likedTips.includes(tip._id) ? 'Already liked' : 'Like this tip'}
                >
                  <FaThumbsUp />
                  Like
                </button>
              </div>

              <Link
                to={`/tips/${tip._id}`}
                className="mt-3 inline-block text-blue-600 hover:underline"
              >
                Read more →
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TopTrending;
