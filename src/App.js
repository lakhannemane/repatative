import React, { useEffect, useState } from "react";
import axiosInstance from "./Axios/Instance";
import cameraimg from "./cameraImg.png";

function App() {
  const [file, setFile] = useState();
  const fetchAllPostData = async () => {
    try {
      const response = await axiosInstance.get("/posts");
      console.log(response.data, "post response");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      await fetchAllPostData();
    };

    fetchData();

    return () => {
      // Cleanup function to be executed when the component unmounts
      isMounted = false;
    };
  }, []);

  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  console.log(file, "files");

  return (
    <div className="App">
      <div class="input-wrapper">
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          onChange={handleChange}
        />
        <label for="image-upload">
          <img src="camera-icon.png" alt="Camera Icon" />
        </label>
      </div>
    </div>
  );
}

export default App;
