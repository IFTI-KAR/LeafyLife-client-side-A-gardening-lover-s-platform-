import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { FaArrowRightLong, FaArrowLeftLong, FaStar } from 'react-icons/fa6';
import back from '../assets/images/testi-bg.webp';
import user1 from '../assets/images/user1.jpeg';
import user2 from '../assets/images/user2.jpeg';
import user3 from '../assets/images/user3.jpeg';
import user4 from '../assets/images/user4.jpeg';

const reviews = [
  {
    text:
      "Working with LeafyLife was a game-changer! Their attention to detail and commitment to excellence truly set them apart. I couldn't be happier wit...",
    name: 'Lisa John, Client',
    img: user1,
  },
  {
    text:
      'From the initial consultation to the final product, LeafyLife provided top-notch service. Their team is knowledgeable, responsive, and a... ',
    name: 'John Buffer, CEO Founder',
    img: user2,
  },
  {
    text:
      'I highly recommend LeafyLife to anyone looking for exceptional service and results. Their professionalism and attention to detail are unmatched.',
    name: 'Sandra Ellips, Client',
    img: user3,
  },
  {
    text:
      'Working with LeafyLife was a breeze from start to finish. They listened to our needs and delivered a product that exceeded our... ',
    name: 'Sally Ramsey, CEO Founder',
    img: user4,
  },
];

const Reviews = () => {
  return (
    <section
      className="bg-cover bg-center bg-no-repeat py-20"
      style={{ backgroundImage: `url(${back})` }}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title with Typewriter */}
        <h2 className="text-white text-4xl font-bold text-center mb-4">
          Testimonials
        </h2>

        {/* Section Subtitle with Typewriter */}
        <p className="text-gray-300 text-center max-w-xl mx-auto mb-12">
          <Typewriter
            words={[
              'Plants are photosynthetic and contain a green pigment called chlorophyll.',
            ]}
            loop={0}
            cursor
            cursorStyle="_"
            typeSpeed={40}
            deleteSpeed={30}
            delaySpeed={1000}
          />
        </p>

        {/* Review Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 text-sm text-gray-800 shadow-md hover:shadow-lg transition"
            >
              <div className="flex justify-center text-green-700 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-green-700 text-sm" />
                ))}
              </div>
              <p className="mb-4 line-clamp-4">{review.text}</p>
              <div className="flex items-center justify-center gap-2">
                <img
                  src={review.img}
                  alt={review.name}
                  className="w-10 h-10 object-cover rounded-full border"
                />
                <p className="font-semibold text-xs">{review.name}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-10 flex justify-center gap-4">
          <button className="flex items-center gap-1 text-sm bg-gray-100 px-4 py-2 rounded hover:bg-gray-200 transition">
            <FaArrowLeftLong />
          </button>
          <button className="flex items-center gap-2 text-sm bg-green-900 text-white px-6 py-2 rounded hover:bg-green-800 transition">
            VIEW ALL <FaArrowRightLong />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
