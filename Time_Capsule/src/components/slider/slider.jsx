import { useState, useEffect, useRef, useCallback } from "react";
import "./slider.css";

const Slider = ({ images }) => {
  const [active, setActive] = useState(0);
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);

  // Memoize nextSlide so it doesn't get recreated on every render
  const nextSlide = useCallback(() => {
    setActive((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = () => setActive((prev) => (prev - 1 + images.length) % images.length);

  useEffect(() => {
    if (images.length > 0) {
      intervalRef.current = setInterval(nextSlide, 3000);
      return () => clearInterval(intervalRef.current);
    }
  }, [images, nextSlide]); // ✅ Now nextSlide is included

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.left = `-${active * 100}%`;
    }
    clearInterval(intervalRef.current);
    if (images.length > 0) {
      intervalRef.current = setInterval(nextSlide, 3000);
    }
  }, [active, images, nextSlide]); // ✅ Include nextSlide here too

  return (
    <div className="slider">
      {images.length === 0 ? (
        <p className="no-images">Upload images to see the carousel!</p>
      ) : (
        <>
          <div className="list" ref={sliderRef}>
            {images.map((src, index) => (
              <div className="item" key={index}>
                <img src={src} alt={`Slide ${index + 1}`} />
              </div>
            ))}
          </div>
          <div className="buttons">
            <button onClick={prevSlide}>&lt;</button>
            <button onClick={nextSlide}>&gt;</button>
          </div>
          <ul className="dots">
            {images.map((_, index) => (
              <li
                key={index}
                className={index === active ? "active" : ""}
                onClick={() => setActive(index)}
              ></li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Slider;
