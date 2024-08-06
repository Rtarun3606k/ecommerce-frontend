import React, { useState, useEffect } from "react";
import axios from "axios";

const ImageUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [message, setMessage] = useState("");
  const [images, setImages] = useState([]);
  const [imageId, setImageId] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchImages();
    handleFetchImage();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    if (selectedFiles) {
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("images", selectedFiles[i]);
      }
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(`Uploaded: ${response.data.saved_files.join(", ")}`);
      fetchImages(); // Fetch images again after uploading
    } catch (error) {
      setMessage(`Error: ${error.response.data.error}`);
    }
  };

  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:5000/images");
      setImages(response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleFetchImage = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/images/${2}`, {
        responseType: "arraybuffer",
      });

      const base64 = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );

      const mimeType = response.headers["content-type"];
      setImage(`data:${mimeType};base64,${base64}`);
      setError("");
    } catch (err) {
      setImage(null);
      setError("Image not found or an error occurred.");
    }
  };

  return (
    <div>
      <h2>Upload Images</h2>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {message && <p>{message}</p>}
      <h2>Uploaded Images</h2>
      <div>
        {images.map((image) => (
          <div key={image.id}>
            <img
              src={`http://localhost:5000/images/${image.id}`}
              alt={image.name}
              style={{ width: "200px", height: "auto" }}
            />
          </div>
        ))}
      </div>

      <h2>Fetch Image by ID</h2>
      <input
        type="text"
        value={imageId}
        onChange={(e) => setImageId(e.target.value)}
        placeholder="Enter Image ID"
      />
      <button onClick={handleFetchImage}>Fetch Image</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {image && (
        <div>
          <h3>Fetched Image:</h3>
          <img
            src={image}
            alt={`Fetched with ID ${imageId}`}
            style={{ width: "200px", height: "auto" }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
