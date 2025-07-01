import React from 'react';
import { Fade } from 'react-awesome-reveal';
import { GiPlantWatering, GiRecycle, GiTeamIdea } from 'react-icons/gi';

const WhyChooseUs = () => {
  return (
    <section className="bg-green-50 py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <Fade cascade damping={0.2} triggerOnce>
          <h2 className="text-4xl font-bold text-green-800 mb-6">
            Why Choose LeafyLife?
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto mb-10 text-lg">
            We combine expert knowledge with passion for plants to bring you personalized gardening solutions. 
            From beginners to green thumbs, LeafyLife supports your journey with tips, tools, and community.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center">
              <GiPlantWatering className="text-green-600 text-4xl mb-4 mx-auto" />
              <h3 className="text-green-700 font-semibold text-xl mb-2">Expert Guidance</h3>
              <p className="text-gray-600">
                Get advice from experienced gardeners and plant experts to keep your greens thriving.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center">
              <GiRecycle className="text-green-600 text-4xl mb-4 mx-auto" />
              <h3 className="text-green-700 font-semibold text-xl mb-2">Eco-Friendly</h3>
              <p className="text-gray-600">
                We promote sustainable gardening practices that help the environment flourish.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center">
              <GiTeamIdea className="text-green-600 text-4xl mb-4 mx-auto" />
              <h3 className="text-green-700 font-semibold text-xl mb-2">Community Support</h3>
              <p className="text-gray-600">
                Join a vibrant community of plant lovers sharing tips, stories, and inspiration.
              </p>
            </div>
          </div>
        </Fade>
      </div>
    </section>
  );
};

export default WhyChooseUs;
