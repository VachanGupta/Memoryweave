import React, { useState } from 'react';
import Capsule from './components/landing_page/capsule.jsx';
import Slider from './components/slider/slider.jsx';

const App = () => {
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleUpload = (newImages) => {
    setUploadedImages((prevImages) => [...prevImages, ...newImages]); // Add new images
  };

  return (
    <div>
      <Capsule onUpload={handleUpload} />
      <Slider images={uploadedImages} />
    </div>
  );
}

export default App;
