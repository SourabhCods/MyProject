import { useState, useEffect } from "react";

const carouselContainerStyle = {
  position: "relative",
  width: "45.75rem",
  height: "30rem", // Increased height
  overflow: "hidden",
  borderRadius: "0.75rem",
  margin: "auto",
};

const slideStyle = {
  width: "100%",
  height: "30rem", // Increased height
  position: "absolute",
  transition: "transform 0.5s ease-in-out",
  objectFit: "contain", // Ensure the image is fully visible
};

const buttonStyle = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  background: "rgba(0, 0, 0, 0.5)",
  color: "white",
  border: "none",
  padding: "10px",
  cursor: "pointer",
  fontSize: "18px",
  zIndex: 2,
};

const dotsContainerStyle = {
  position: "absolute",
  bottom: "10px",
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  gap: "5px",
};

const dotStyle = (active) => ({
  width: "10px",
  height: "10px",
  background: active ? "white" : "gray",
  borderRadius: "50%",
  cursor: "pointer",
});

const CustomCarousel = ({ product }) => {
  const slides = [product.image, product.image, product.image, product.image]; // Keeping it as per requirement
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={carouselContainerStyle}>
      {/* Slides */}
      {slides.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Slide ${index + 1}`}
          style={{
            ...slideStyle,
            transform: `translateX(${(index - currentIndex) * 100}%)`,
          }}
        />
      ))}

      {/* Navigation Buttons */}
      <button style={{ ...buttonStyle, left: "10px" }} onClick={prevSlide}>
        ❮
      </button>
      <button style={{ ...buttonStyle, right: "10px" }} onClick={nextSlide}>
        ❯
      </button>

      {/* Dots Indicator */}
      <div style={dotsContainerStyle}>
        {slides.map((_, index) => (
          <div
            key={index}
            style={dotStyle(index === currentIndex)}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default CustomCarousel;
