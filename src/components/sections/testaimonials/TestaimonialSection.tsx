"use client";

import ExportedImage from "next-image-export-optimizer";
import React, { useEffect, useState } from "react";
import "./TestaimonialSection.css";

const TestaimonialSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const testimonials = [
    {
      name: "Lorem P. Ipsum",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
      imgSrc: "/images/testamonials/1.jpeg",
    },
    {
      name: "Mr. Lorem Ipsum",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
      imgSrc: "/images/testamonials/2.jpg",
    },
    {
      name: "Lorem Ipsum",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
      imgSrc: "/images/testamonials/3.webp",
    },
    {
      name: "Lorem De Ipsum",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
      imgSrc: "/images/testamonials/4.webp",
    },
    {
      name: "Ms. Lorem R. Ipsum",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
      imgSrc: "/images/testamonials/5.webp",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % testimonials.length);
    }, 4500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide]);

  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleDotClick = (index: React.SetStateAction<number>) => {
    setCurrentSlide(index);
  };

  return (
    <section id="testim" className="testim mt-10">

      <div className="wrap">
        <span id="left-arrow" className="arrow left" onClick={handlePrev}>
          ❮
        </span>
        <span id="right-arrow" className="arrow right" onClick={handleNext}>
          ❯
        </span>
        <ul id="testim-dots" className="dots">
          {testimonials.map((_, index) => (
            <li
              key={index}
              className={`dot ${currentSlide === index ? "active" : ""}`}
              onClick={() => handleDotClick(index)}
            ></li>
          ))}
        </ul>
        <div id="testim-content" className="cont">
          {testimonials.map((testimonial, index) => (
            <div key={index} className={currentSlide === index ? "active" : ""}>
              <div className="img">
                <ExportedImage
                  src={testimonial.imgSrc}
                  alt={testimonial.name}
                  className="image object-cover"
                  width={100}
                  height={100}
                />
              </div>
              <h2>{testimonial.name}</h2>
              <p>{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestaimonialSection;
