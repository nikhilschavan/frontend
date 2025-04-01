import React, { useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const [histogram, setHistogram] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file before uploading.");
      return;
    }

    setError(null);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setData(response.data);
      setHistogram(response.data.histogram);
    } catch (error) {
      console.error("Upload failed", error);
      setError(error.response?.data?.error || "Upload failed. Check the backend.");
    }
  };

  return (
    <div>
      <h2>Upload Data File</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data && (
        <div>
          <h2>Process Capability Metrics</h2>
          <p>Cp: {data.Cp}</p>
          <p>Cpk: {data.Cpk}</p>
          <p>Pp: {data.Pp}</p>
          <p>Ppk: {data.Ppk}</p>
          {histogram && <img src={`http://127.0.0.1:5000${histogram}`} alt="Histogram" />}
        </div>
      )}
    </div>
  );
}
