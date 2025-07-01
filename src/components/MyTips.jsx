import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from "../provider/AuthProvider";
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import Header from './Header';
import Footer from './Footer';

const MyTips = () => {
  const { user } = useContext(AuthContext);
  const [myTips, setMyTips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/tips/user?email=${user.email}`)
        .then(res => res.json())
        .then(data => {
          setMyTips(Array.isArray(data) ? data : []);
        })
        .catch(err => {
          console.error("Error fetching tips:", err);
          setMyTips([]);
        })
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This tip will be permanently deleted!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/tips/${id}`, {
          method: 'DELETE'
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0) {
              setMyTips(prev => prev.filter(tip => tip._id !== id));
              Swal.fire('Deleted!', 'Tip has been deleted.', 'success');
            }
          });
      }
    });
  };

  return (
    <div className="min-h-screen bg-green-50">
      <Header />
      <div className="max-w-6xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-green-800 mb-6">My Garden Tips</h1>

        {loading ? (
          <p>Loading...</p>
        ) : myTips.length === 0 ? (
          <p>You haven't submitted any tips yet.</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow-md rounded-xl">
            <table className="table w-full table-zebra">
              <thead className="bg-green-100 text-green-800">
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Availability</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {myTips.map(tip => (
                  <tr key={tip._id}>
                    <td>{tip.title}</td>
                    <td>{tip.category}</td>
                    <td>{tip.availability}</td>
                    <td className="flex gap-2">
                      <Link to={`/update-tip/${tip._id}`}>
                        <button className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700">Update</button>
                      </Link>
                      <button onClick={() => handleDelete(tip._id)} className="btn btn-sm bg-red-600 text-white hover:bg-red-700">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyTips;
