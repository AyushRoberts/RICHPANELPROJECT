import axios from "axios";
import React, { useEffect, useState } from "react";

const Upload = ({ setUpload }) => {
  const [file, setFile] = useState();
  const [uploadProgress, setUploadProgress] = useState(0);

  const getExtension = () => {
    if (file) {
      const ext = file.name.split(".")[file.name.split(".").length - 1];
      switch (ext.toLowerCase()) {
        case "avi":
        case "3gp":
        case "mov":
        case "mp4":
          return true;
      }
    }
  };

  const handleUpload = (event) => {
    event.preventDefault();

    if (getExtension()) {
      event.target.textContent = "Uploading...";
      const data = new FormData();
      data.append("ayushfile", file, file.name);
      axios
        .post("http://16.171.35.127:3000/upload", data, {
          onUploadProgress: (ProgressEvent) => {
            setUploadProgress(
              Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100)
            );
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else alert("Not a video");
  };

  return (
    <>
      <form className="box" onSubmit={handleUpload}>
        <input
          type="file"
          name="ayushfile"
          id="file-5"
          className="inputfile inputfile-4"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label htmlFor="file-5">
          <figure>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="17"
              viewBox="0 0 20 17"
            >
              <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" />
            </svg>
          </figure>
          <span>
            {uploadProgress < 100
              ? uploadProgress + "%"
              : "DONE! UPLOAD ANOTHER?"}
          </span>
        </label>
        <button className="submit" onClick={handleUpload}>
          Upload
        </button>
        <button className="submit" onClick={() => setUpload(false)}>
          Back
        </button>
      </form>
    </>
  );
};

export default Upload;
