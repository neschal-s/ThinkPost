import { useState } from "react";
import Slide from "./Slide";

function App() {
  const [prompt, setPrompt] = useState("");
  const [slides, setSlides] = useState([]);
  const [format, setFormat] = useState("square");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const generateSlides = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      console.log("API RESPONSE:", data);

      if (Array.isArray(data.slides)) {
        setSlides(data.slides);
      } else {
        setSlides([]);
        setError("Invalid response from server");
      }
    } catch (err) {
      console.error("Frontend error:", err);
      setSlides([]);
      setError("Something went wrong. Try again.");
    }

    setLoading(false);
  };

const editSlide = async (index) => {
  const instruction = prompt("How do you want to edit this slide?");
  if (!instruction) return;

  const res = await fetch("http://localhost:5000/edit-slide", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      slide: slides[index],
      instruction,
    }),
  });

  const data = await res.json();

  const newSlides = [...slides];
  newSlides[index] = data.slide;
  setSlides(newSlides);
};








  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* 🔥 Header */}
        <div>
          <h1 className="text-4xl font-bold">ThinkPost</h1>
          <p className="text-gray-500">
            From thought to post in seconds
          </p>
        </div>

        {/* ✏️ Input + Button */}
        <div className="flex gap-3">
          <input
            className="border p-3 flex-1 rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-black"
            placeholder="Type your idea..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <button
            onClick={generateSlides}
            disabled={loading}
            className="bg-black text-white px-6 py-2 rounded-lg hover:opacity-80 transition disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>

        {/* 🎛️ Format Toggle */}
        <div className="flex gap-2 bg-gray-200 p-1 rounded-lg w-fit">
          <button
            onClick={() => setFormat("square")}
            className={`px-4 py-1 rounded ${
              format === "square" ? "bg-black text-white" : ""
            }`}
          >
            1:1
          </button>

          <button
            onClick={() => setFormat("story")}
            className={`px-4 py-1 rounded ${
              format === "story" ? "bg-black text-white" : ""
            }`}
          >
            9:16
          </button>
        </div>

        {/* ⚠️ Error Message */}
        {error && (
          <div className="text-red-500 font-medium">
            {error}
          </div>
        )}

        {/* 🧩 Slides */}
        {slides.length > 0 ? (
          <div className="flex gap-6 overflow-x-auto pb-4">
            {slides.map((slide, i) => (
              <Slide key={i} slide={slide} format={format} onClick={() => editSlide(i)} />
            ))}
          </div>
        ) : (
          !loading && (
            <div className="text-gray-400 text-center mt-10">
              <p>No slides yet.</p>
              <p>Try something like “why students procrastinate”</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default App;