import React, { useContext } from 'react';
import { AuthContext } from "../provider/AuthProvider";
import Header from './Header';
import Footer from './Footer';
import Swal from 'sweetalert2';

const ShareGardenTips = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        const tip = {
            title: form.title.value,
            plantType: form.plantType.value,
            difficulty: form.difficulty.value,
            description: form.description.value,
            image: form.image.value,
            category: form.category.value,
            availability: form.availability.value,
            name: user?.displayName || "N/A",
            email: user?.email || "N/A",
            createdAt: new Date()
        };

        try {
            const res = await fetch('http://localhost:3000/tips', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tip)
            });

            const data = await res.json();
            if (res.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Tip Submitted!',
                text: 'Thanks for sharing your gardening wisdom 🌿',
                confirmButtonColor: '#4CAF50'
                });
            form.reset();
            } else {
            alert(data.message || "Something went wrong.");
            }
        } catch (err) {
            alert("Network error: " + err.message);
        }
        };

  const { user } = useContext(AuthContext);

  return (
    <div className=''>
        <Header></Header>
    <div className="min-h-screen bg-green-50 py-10 px-4 flex justify-center items-start">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">Share a Garden Tip</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>

          {/* Title */}
          <div>
            <label className="block text-green-700 font-semibold mb-1">Title</label>
            <input
              type="text"
              name="title"
              placeholder='e.g., "How I Grow Tomatoes Indoors"'
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Plant Type / Topic */}
          <div>
            <label className="block text-green-700 font-semibold mb-1">Plant Type / Topic</label>
            <input
              type="text"
              name="plantType"
              placeholder="e.g., Tomatoes, Indoor Plants"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Difficulty Level */}
          <div>
            <label className="block text-green-700 font-semibold mb-1">Difficulty Level</label>
            <select name="difficulty" className="select select-bordered w-full" required>
              <option value="">Select Difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-green-700 font-semibold mb-1">Description</label>
            <textarea
              name="description"
              rows="4"
              placeholder="Write your gardening tip here..."
              className="textarea textarea-bordered w-full"
              required
            ></textarea>
          </div>

          {/* Images URL */}
          <div>
            <label className="block text-green-700 font-semibold mb-1">Image URL</label>
            <input
              type="text"
              name="image"
              placeholder="Paste image URL"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-green-700 font-semibold mb-1">Category</label>
            <select name="category" className="select select-bordered w-full" required>
              <option value="">Select Category</option>
              <option value="Composting">Composting</option>
              <option value="Plant Care">Plant Care</option>
              <option value="Vertical Gardening">Vertical Gardening</option>
              <option value="Indoor Gardening">Indoor Gardening</option>
              <option value="Container Gardening">Container Gardening</option>
            </select>
          </div>

          {/* Availability */}
          <div>
            <label className="block text-green-700 font-semibold mb-1">Availability</label>
            <select name="availability" className="select select-bordered w-full" required>
              <option value="">Select Availability</option>
              <option value="Public">Public</option>
              <option value="Hidden">Hidden</option>
            </select>
          </div>

          {/* User Info (read-only) */}
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

          {/* Submit Button */}
          <button
            type="submit"
            className="btn bg-green-700 hover:bg-green-800 text-white w-full rounded-xl mt-4"
          >
            Submit Garden Tip
          </button>
        </form>
      </div>
    </div>
    <Footer></Footer>
    </div>
  );
};

export default ShareGardenTips;
