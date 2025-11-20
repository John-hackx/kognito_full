import { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Step 1: Get signature from your backend
      const signRes = await axios.post(`/api/courses/upload/signed`, {
        folder: "private_media/course_videos",
        resource_type: "video",
      });

      const { signature, timestamp, cloudName, apiKey, folder } = signRes.data;

      // Step 2: Upload to Cloudinary with progress tracking
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);
      formData.append("api_key", apiKey);

      const uploadRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1)
            );
            setUploadProgress(percentCompleted);
            console.log(`Upload Progress: ${percentCompleted}%`);
          },
        }
      );

      console.log("Upload successful:", uploadRes.data);
      alert("Upload complete!");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed!");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        accept="video/*"
      />

      <button onClick={handleUpload} disabled={!file || isUploading}>
        {isUploading ? "Uploading..." : "Upload"}
      </button>

      {isUploading && (
        <div style={{ marginTop: "20px" }}>
          <div style={{ marginBottom: "10px" }}>
            Uploading: {uploadProgress}%
          </div>

          {/* Simple progress bar */}
          <div
            style={{
              width: "100%",
              height: "20px",
              backgroundColor: "#e0e0e0",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${uploadProgress}%`,
                height: "100%",
                backgroundColor: "#4caf50",
                transition: "width 0.3s ease",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
