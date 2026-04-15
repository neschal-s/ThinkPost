export default function Slide({ slide }) {
  if (!slide) return null;

  return (
    <div
      className="w-[300px] h-[300px] p-4 rounded-xl shadow-md flex flex-col justify-center items-center text-center"
      style={{
        background: "linear-gradient(135deg, #FFF7E6, #FFE4B5)",
      }}
    >
      <p className="text-lg font-bold">{slide.text}</p>

      {/* {slide.visual && (
        <p className="text-xs mt-2 opacity-60">
          {slide.visual}
        </p>
      )} */}
    </div>
  );
}