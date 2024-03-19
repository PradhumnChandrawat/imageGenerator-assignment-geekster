import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [inputText, setInputText] = useState("");
  const [images, setImages] = useState([]);

  const fetchImages = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?query=${inputText}&client_id=GJJUdnbxXkU2xjMVTEej7TIyz459m3jHfoqFcA7DUTQ`
      );
      setImages(response.data.results);
    } catch (error) {
      console.error("Error fetching images from Unsplash:", error);
      setImages([]);
    }
  };

  return (
    <div className="App">
      <h1>AI Image Generator</h1>
      <form onSubmit={fetchImages}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter keywords to search for images"
        />
        <button type="submit">Search Images</button>
      </form>
      <div className="images">
        {images.map((image) => (
          <img
            key={image.id}
            src={image.urls.small}
            alt={image.alt_description}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
