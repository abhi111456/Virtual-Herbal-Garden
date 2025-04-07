import React, { useState } from "react";

const ImageUploader = () => {
  const [images, setImages] = useState(() => JSON.parse(localStorage.getItem("uploadedImages")) || []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const newImages = [...images, reader.result];
      setImages(newImages);
      localStorage.setItem("uploadedImages", JSON.stringify(newImages));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="mt-6 w-full max-w-lg p-4 bg-white shadow-md rounded-lg">
      <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4 w-full" />
      <div className="grid grid-cols-3 gap-2">
        {images.map((src, index) => (
          <img key={index} src={src} alt="Uploaded" className="w-full h-24 object-cover rounded-lg" />
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
