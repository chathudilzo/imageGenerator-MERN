import React, { useState } from "react";
import axios from "axios";
const AiVideo = () => {
  const [prompt, setPrompt] = useState("");
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState("");

  const sampleVideo = "https://samplelib.com/lib/preview/mp4/sample-5s.mp4";
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const generateVideo = async () => {
    if (!prompt.trim()) return alert("Please enter a prompt");
    setIsLoading(true);
    setGeneratedVideo("");
    try {
      const response = await axios.post(
        `${serverUrl}/api/images/wan-video-gen`,
        { prompt: prompt },
        {
          responseType: "blob",
        }
      );
      const videoBlob = new Blob([response.data], { type: "video/mp4" });
      const videoUrl = URL.createObjectURL(videoBlob);
      setGeneratedVideo(videoUrl);
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">
        AI Video Generator
      </h1>
      <div className="mb-4">
        <label className="block mb-1">Enter a prompt</label>
        <input
          type="text"
          placeholder="e.g A futuristic city at night"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
        ></input>
      </div>
      <div className="mb-6 flex gap-4">
        <button
          onClick={() => setAspectRatio("16:9")}
          className={`px-4 py-2 rounded ${
            aspectRatio === "16:9"
              ? "bg-teal-500 text-white"
              : "bg-gray-700 text-gray-300"
          }`}
        >
          16:9
        </button>
        <button
          onClick={() => setAspectRatio("9:16")}
          className={`px-4 py-2 rounded ${
            aspectRatio === "9:16"
              ? "bg-teal-500 text-white"
              : "bg-gray-700 text-gray-300"
          }`}
        >
          9:16
        </button>
      </div>

      <button
        onClick={generateVideo}
        disabled={isLoading}
        className="w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-500 rounded shadow text-white font-semibold hover:from-teal-600 hover:to-emerald-600 transition"
      >
        {isLoading ? "Generating..." : "Generate Video"}
      </button>

      <div className="mt-10">
        {isLoading ? (
          <div>
            <div className="w-8 h-8 border-8 border-t-transparent border-real-500 border-solid rounded-full animate-spin"></div>
            <p>Generating video...</p>
          </div>
        ) : (
          <>
            <video
              controls
              src={generatedVideo || sampleVideo}
              className="w-full rounded-lg border border-gray-700 mt-6 shadow-lg"
            ></video>
            {generatedVideo && (
              <div>
                <a
                  href={generatedVideo}
                  download="deep-gen-video.mp4"
                  className="inline-block px-6 py-2 mt-2 bg-teal-600 text-white rounded over:bg-teal-700 transition"
                >
                  Download
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AiVideo;
