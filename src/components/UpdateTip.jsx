import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import Swal from 'sweetalert2';
import Header from './Header';
import Footer from './Footer';

const UpdateTip = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [tipData, setTipData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/tips/${id}`)
      .then(res => res.json())
      .then(data => setTipData(data))
      .catch(err => console.error("Failed to fetch tip:", err));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedTip = {
      title: form.title.value,
      plantType: form.plantType.value,
      difficulty: form.difficulty.value,
      description: form.description.value,
      image: form.image.value,
      category: form.category.value,
      availability: form.availability.value,
    };

    try {
      const res = await fetch(`http://localhost:3000/tips/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTip),
      });

      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Tip Updated!',
          text: 'Your garden tip was successfully updated.',
          confirmButtonColor: '#4CAF50',
          timer: 1500,
          showConfirmButton: false,
        });
        navigate('/mytips');
      } else {
        throw new Error('Failed to update');
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Could not update tip.', 'error');
    }
  };

  if (!tipData) {
    return <div className="text-center mt-20">Loading tip data...</div>;
  }

  return (
    <div className="">
      <Header />
      <div className="min-h-screen bg-green-50 py-10 px-4 flex justify-center items-start">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">
          <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">Update Garden Tip</h1>

          <form className="space-y-4" onSubmit={handleUpdate}>
            <div>
              <label className="block text-green-700 font-semibold mb-1">Title</label>
              <input
                type="text"
                name="title"
                defaultValue={tipData.title}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="block text-green-700 font-semibold mb-1">Plant Type / Topic</label>
              <input
                type="text"
                name="plantType"
                defaultValue={tipData.plantType}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="block text-green-700 font-semibold mb-1">Difficulty Level</label>
              <select name="difficulty" className="select select-bordered w-full" defaultValue={tipData.difficulty} required>
                <option value="">Select Difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div>
              <label className="block text-green-700 font-semibold mb-1">Description</label>
              <textarea
                name="description"
                rows="4"
                defaultValue={tipData.description}
                className="textarea textarea-bordered w-full"
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-green-700 font-semibold mb-1">Image URL</label>
              <input
                type="text"
                name="image"
                defaultValue={tipData.image}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="block text-green-700 font-semibold mb-1">Category</label>
              <select name="category" className="select select-bordered w-full" defaultValue={tipData.category} required>
                <option value="">Select Category</option>
                <option value="Composting">Composting</option>
                <option value="Plant Care">Plant Care</option>
                <option value="Vertical Gardening">Vertical Gardening</option>
                <option value="Indoor Gardening">Indoor Gardening</option>
                <option value="Container Gardening">Container Gardening</option>
              </select>
            </div>

            <div>
              <label className="block text-green-700 font-semibold mb-1">Availability</label>
              <select name="availability" className="select select-bordered w-full" defaultValue={tipData.availability} required>
                <option value="">Select Availability</option>
                <option value="Public">Public</option>
                <option value="Hidden">Hidden</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-green-700 font-semibold mb-1">Your Name</label>
                <input
                  type="text"
                  value={user?.displayName || 'N/A'}
                  className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-green-700 font-semibold mb-1">Your Email</label>
                <input
                  type="email"
                  value={user?.email || 'N/A'}
                  className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                  readOnly
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn bg-green-700 hover:bg-green-800 text-white w-full rounded-xl mt-4"
            >
              Update Tip
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UpdateTip;
