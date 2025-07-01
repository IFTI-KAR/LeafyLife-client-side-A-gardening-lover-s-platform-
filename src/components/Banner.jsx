import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import banner1 from "../assets/images/banner1.webp";
import banner2 from "../assets/images/banner2.webp";
import banner3 from "../assets/images/banner-3.webp";

const slides = [
  {
    image: banner1,
    title: "Spring Gardening Festival",
    description: "Join us for workshops, contests, and plant swaps!",
    button: "Learn More",
  },
  {
    image: banner2,
    title: "LeafyLife Earth Day Special",
    description: "Celebrate with eco-friendly gardening ideas.",
    button: "Explore Now",
  },
  {
    image: banner3,
    title: "Summer Plant Sale",
    description: "Grab your favorite plants at unbeatable prices!",
    button: "Shop Now",
  },
];

const Banner = () => {
  return (
    <div className="w-full ">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={true}
        className="rounded-lg"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-[80vh] md:h-[75vh] bg-cover bg-center flex items-center justify-center text-white relative"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              <div className="bg-black/50 p-6 rounded-lg text-center max-w-xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-3">
                  {slide.title}
                </h2>
                <p className="mb-5 text-sm md:text-base">{slide.description}</p>
                <button className="bg-green-600 hover:bg-green-700 transition px-5 py-2 text-sm md:text-base rounded text-white font-medium">
                  {slide.button}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
