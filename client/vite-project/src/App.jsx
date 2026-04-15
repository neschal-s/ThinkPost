import { useState } from "react";
import Slide from "./Slide";

function App() {
  const [prompt, setPrompt] = useState("");
  const [slides, setSlides] = useState([]);

  const theme = {
    background: "#FFF7E6",
    textColor: "#222",
    font: "sans-serif",
  };

  const generateSlides = async () => {
    const res = await fetch("http://localhost:5000/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setSlides(data.slides);
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Carousel AI Studio</h1>

      <input
        className="border p-3 w-full rounded"
        placeholder="Type your idea..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        onClick={generateSlides}
        className="bg-black text-white px-6 py-2 rounded"
      >
        Generate
      </button>

      <div className="flex gap-4 overflow-x-auto">
        {slides.map((slide, i) => (
          <Slide key={i} slide={slide} />
        ))}
      </div>
    </div>
  );
}

export default App;