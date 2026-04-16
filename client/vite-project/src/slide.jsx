// 🎨 Helpers (keep at top)

const getBackground = (bg) => {
  if (!bg) return "linear-gradient(135deg, #FFF7E6, #FFE4B5)";

  if (bg.toLowerCase().includes("dark"))
    return "linear-gradient(135deg, #1e1e1e, #3a3a3a)";

  if (bg.toLowerCase().includes("bright"))
    return "linear-gradient(135deg, #ff9a9e, #fad0c4)";

  if (bg.toLowerCase().includes("pastel"))
    return "linear-gradient(135deg, #fdfbfb, #ebedee)";

  return "linear-gradient(135deg, #FFF7E6, #FFE4B5)";
};

const getEmoji = (visual) => {
  if (!visual) return "✨";

  const v = visual.toLowerCase();

  if (v.includes("math")) return "📘";
  if (v.includes("student")) return "👨‍🎓";
  if (v.includes("graph")) return "📈";
  if (v.includes("formula")) return "🧮";
  if (v.includes("confused")) return "😵";

  return "💡";
};

// 🚀 MAIN COMPONENT

export default function Slide({ slide, format = "square" }) {
  if (!slide) return null;

  const background = getBackground(slide.background);
  const emoji = getEmoji(slide.visual);

  // 📐 Format (size)
  const sizeClass =
    format === "story"
      ? "w-[300px] h-[500px]"
      : "w-[300px] h-[300px]";

  // 🧩 Layout logic
  let layoutClass = "flex flex-col items-center justify-center text-center";

  if (slide.layout === "split") {
    layoutClass = "flex flex-row items-center justify-between text-left";
  }

  if (slide.layout === "top-bottom") {
    layoutClass = "flex flex-col justify-between text-center";
  }

  return (
    <div
      className={`${sizeClass} ${layoutClass} p-6 rounded-xl shadow-md`}
      style={{ background }}
    >
      {/* 🧠 Split Layout */}
      {slide.layout === "split" ? (
        <>
          <p className="text-lg font-bold w-1/2">{slide.text}</p>
          <div className="text-4xl">{emoji}</div>
        </>
      ) : slide.layout === "top-bottom" ? (
        <>
          <p className="text-lg font-bold">{slide.text}</p>
          <div className="text-4xl mt-4">{emoji}</div>
        </>
      ) : (
        // 🎯 Default Center Layout
        <>
          <div className="text-4xl mb-3">{emoji}</div>
          <p className="text-lg font-bold">{slide.text}</p>
        </>
      )}
    </div>
  );
}