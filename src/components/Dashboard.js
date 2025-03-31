import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { FaUpload } from "react-icons/fa";
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
        headers: { "Content-Type": "multipart/form-data" },
      });
      setData(response.data);
      setHistogram(response.data.histogram);
    } catch (error) {
      console.error("Upload failed", error.response?.data || error.message);
      setError(`Upload failed: ${error.response?.data?.message || error.message}`);
    }
  };      

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <header className="text-center py-4 text-2xl font-bold bg-blue-600 text-white rounded-lg">
        Anand I-Power Limited (Process Capability)
      </header>
      <div className="grid grid-cols-2 gap-6 mt-6">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Upload Data File</h2>
            <input type="file" onChange={handleFileChange} className="mb-4" />
            <Button onClick={handleUpload} className="ml-2">
              <FaUpload className="w-4 h-4 mr-2" /> Upload
            </Button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </CardContent>
        </Card>
        {data && (
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold">Process Capability Metrics</h2>
              <p><strong>Cp:</strong> {data.Cp}</p>
              <p><strong>Cpk:</strong> {data.Cpk}</p>
              <p><strong>Pp:</strong> {data.Pp}</p>
              <p><strong>Ppk:</strong> {data.Ppk}</p>
            </CardContent>
          </Card>
        )}
      </div>
      {histogram && (
        <Card className="mt-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold">Histogram with KDE</h2>
            <img src={histogram} alt="Histogram" className="w-full mt-4" />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
