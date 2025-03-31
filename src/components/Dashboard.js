import { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function Dashboard() {
    const [message, setMessage] = useState("Upload a file to analyze.");

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("http://localhost:5000/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage("Upload failed.");
        }
    };

    return (
        <div className="p-6 text-center">
            <h1 className="text-2xl font-bold">Process Capability Dashboard</h1>
            <input type="file" onChange={handleFileUpload} className="mt-4" />
            <p className="mt-4">{message}</p>
        </div>
    );
}
