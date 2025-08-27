import React, { useState } from "react";
import axios from "axios";

const UploadImage = () => {
  const [imageUrl, setImageUrl] = useState(null);

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "museboard"); 
    // formData.append("folder", "");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/doqke1xv0/image/upload",
        formData
      );
      console.log("Uploaded URL:", res.data.secure_url);
      console.log("Public ID:", res.data.public_id);
      setImageUrl(res.data.secure_url); 
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  // ----- Extract public_id from Existing Image URL -----

  const getPublicIdFromUrl = (url) => {
    const matches = url.match(/\/upload\/(?:v\d+\/)?([^/.]+)/);
    return matches ? matches[1] : null;
  };
  
  const imageUrled = "https://res.cloudinary.com/doqke1xv0/image/upload/v1739371202/phwbzqns7sltqgpy3q8u";
  
  const publicId = getPublicIdFromUrl(imageUrled);
  console.log("Extracted Public ID:", publicId);



  // ------- Use public_id to Fetch Image Dynamically ------

  const cloudinaryUrl = (publicId) =>
    `https://res.cloudinary.com/doqke1xv0/image/upload/${publicId}`;
  
  console.log("Image URL:", cloudinaryUrl(publicId));







  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadToCloudinary(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} style={{border:"1px solid black"}} />
      {imageUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img src={imageUrl} alt="Uploaded" width="300px" />
        </div>
      )}
    </div>
  );
};

export default UploadImage;
