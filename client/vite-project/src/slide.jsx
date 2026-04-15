const getBackground = (bg) => {
  if (!bg) return "linear-gradient(135deg, #FFF7E6, #FFE4B5)";

  if (bg.includes("dark"))
    return "linear-gradient(135deg, #1e1e1e, #3a3a3a)";

  if (bg.includes("bright"))
    return "linear-gradient(135deg, #ff9a9e, #fad0c4)";

  if (bg.includes("pastel"))
    return "linear-gradient(135deg, #fdfbfb, #ebedee)";

  return "linear-gradient(135deg, #FFF7E6, #FFE4B5)";
};


const getEmoji = (visual) => {
  if (!visual) return "✨";

  if (visual.includes("math")) return "📘";
  if (visual.includes("student")) return "👨‍🎓";
  if (visual.includes("graph")) return "📈";
  if (visual.includes("formula")) return "🧮";
  if (visual.includes("confused")) return "😵";

  return "💡";
};


export default function Slide({ slide }) {
  if (!slide) return null;

  return (
    <div
      className="w-[300px] h-[300px] p-4 rounded-xl shadow-md flex flex-col justify-center items-center text-center"
      style={{ background }}
    >
        <div className="text-4xl mb-3">{emoji}</div>
      <p className="text-lg font-bold">{slide.text}</p>

    </div>
  );
}