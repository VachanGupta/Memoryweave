import { useState } from "react";
import { motion } from "framer-motion";
import "./imageSlider.css";

import img1 from "./images/1.jpg";
import img2 from "./images/2.jpg";
import img3 from "./images/3.jpeg";
import img4 from "./images/4.webp";
import img5 from "./images/5.jpeg";

const images = [img1, img2, img3, img4, img5];
const positions = ["left1", "left", "center", "right", "right1"];

const imageVariants = {
  center: { x: "0%", scale: 1, zIndex: 5 },
  left1: { x: "-100%", scale: 0.7, zIndex: 2 },
  left: { x: "-50%", scale: 0.8, zIndex: 3 },
  right: { x: "50%", scale: 0.8, zIndex: 3 },
  right1: { x: "100%", scale: 0.7, zIndex: 2 },
};

const ImageSlider = () => {
  const [positionIndexes, setPositionIndexes] = useState([0, 1, 2, 3, 4]);

  const handleNext = () => {
    setPositionIndexes((prev) => prev.map((i) => (i + 1) % 5));
  };

  const handleBack = () => {
    setPositionIndexes((prev) => prev.map((i) => (i + 4) % 5));
  };

  return (
    <div className="slider-container">
      {images.map((image, index) => (
        <motion.img
          key={index}
          src={image}
          alt={`Slide ${index + 1}`}
          className="slider-image"
          initial="center"
          animate={positions[positionIndexes[index]]}
          variants={imageVariants}
          transition={{ duration: 0.5 }}
        />
      ))}
      <div className="slider-controls">
        <button className="slider-button" onClick={handleBack}>Back</button>
        <button className="slider-button" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default ImageSlider;
