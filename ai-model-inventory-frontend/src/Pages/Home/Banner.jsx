import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import slider1 from './../../assets/slider-images/slider-img (1).jpg'
import slider2 from "./../../assets/slider-images/slider-img (2).jpg";
import slider3 from "./../../assets/slider-images/slider-img (3).jpg";
import slider4 from "./../../assets/slider-images/slider-img (4).jpg";
import slider5 from "./../../assets/slider-images/slider-img (5).jpg";
import slider6 from "./../../assets/slider-images/slider-img (6).jpg";
import slider7 from "./../../assets/slider-images/slider-img (7).jpg";

const slideContent = [
  {
    id: 1,
    title: "Welcome to ModelVault",
    subtitle: "Centralized Management for All Your AI Models",
    image: slider1,
  },
  {
    id: 2,
    title: "Track Every Model",
    subtitle: "Monitor versions, status, and ownership with ease",
    image: slider2,
  },
  {
    id: 3,
    title: "Stay Organized",
    subtitle: "Structured inventory for models, datasets, and metadata",
    image: slider3,
  },
  {
    id: 4,
    title: "Improve Governance",
    subtitle: "Ensure compliance, traceability, and accountability",
    image: slider4,
  },
  {
    id: 5,
    title: "Faster Collaboration",
    subtitle: "Share models and insights across teams effortlessly",
    image: slider5,
  },
  {
    id: 6,
    title: "Deployment Ready",
    subtitle: "Keep your production and experimental models aligned",
    image: slider6,
  },
  {
    id: 7,
    title: "Build AI With Confidence",
    subtitle: "Make informed decisions with a clear model overview",
    image: slider7,
  },
];

const Banner = () => {
    return (
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        speed={1000}
        pagination={{ clickable: true }}
        className="relative w-full h-[50vh] md:h-[85vh] cursor-grab"
        draggable={true}
        navigation={{ enabled: false }}
        breakpoints={{
          768: {
            navigation: { enabled: true },
          },
        }}
      >
        {slideContent.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-r from-black/80 to-black/50" />
              <div className="absolute top-20 md:top-32 left-6 md:left-14 flex flex-col space-y-4">
                <h1 className="text-lg md:text-2xl font-bold text-white">
                  {slide.title}
                </h1>
                <p className="text-2xl md:text-5xl font-bold text-white leading-tight w-[90%] md:w-[80%]">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    );
};

export default Banner;