import React, { useEffect, useState } from 'react';
import { Link } from 'react-router'; 
import { FaEye } from 'react-icons/fa'; 
import Header from './Header';

const BrowseTips = () => {
  const [tips, setTips] = useState([]);
  const [filteredTips, setFilteredTips] = useState([]);
  const [difficultyFilter, setDifficultyFilter] = useState('All');

  useEffect(() => {
    fetch('https://leafylife-server.vercel.app/tips')
      .then(res => res.json())
      .then(data => {
        setTips(data);
        setFilteredTips(data); // Initially show all
      })
      .catch(err => console.error('Error fetching tips:', err));
  }, []);

  useEffect(() => {
    if (difficultyFilter === 'All') {
      setFilteredTips(tips);
    } else {
      const filtered = tips.filter(tip => tip.difficulty === difficultyFilter);
      setFilteredTips(filtered);
    }
  }, [difficultyFilter, tips]);

  return (
    <div>
      <Header />

      <div className="p-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-green-800 text-center">Browse Public Garden Tips</h2>

        {/* Filter Dropdown */}
        <div className="mb-6 flex justify-center">
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="select select-bordered w-full max-w-xs"
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table w-full border rounded-lg shadow-md">
            <thead className="bg-green-100 text-green-800">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Category</th>
                <th>Difficulty</th>
                <th>Image</th>
                <th>See More</th>
              </tr>
            </thead>
            <tbody>
              {filteredTips.map((tip, index) => (
                <tr key={tip._id} className="hover:bg-green-50 transition-all">
                  <td>{index + 1}</td>
                  <td>{tip.title}</td>
                  <td>{tip.category}</td>
                  <td>{tip.difficulty}</td>
                  <td>
                    <img src={tip.image} alt={tip.title} className="w-16 h-16 object-cover rounded" />
                  </td>
                  <td>
                    <Link
                      to={`/tips/${tip._id}`}
                      className="text-green-700 hover:text-green-900 text-xl"
                      title="See Details"
                    >
                      <FaEye />
                    </Link>
                  </td>
                </tr>
              ))}
              {filteredTips.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No tips found for selected difficulty.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BrowseTips;
