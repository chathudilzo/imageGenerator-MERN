import React from "react";

const PriceCard = ({
  image,
  title,
  price,
  features = [],
  highlight = false,
  buttonColor = "#00df9a",
  buttonTextColor = "black",
}) => {
  return (
    <div
      className={` z-50 text-black w-full shadow-xl flex flex-col p-4 rounded-lg transition-transform duration-300 hover:scale-105 ${
        highlight ? "scale-105 bg-gray-100" : "bg-white"
      }`}
    >
      <img src={image} className="w-20 mx-auto mt-[-3rem] bg-white/60" />
      <h2 className="text-2xl font-bold text-center py-8">{title}</h2>
      <div>
        {features.map((f, idx) => (
          <p key={idx} className="py-2 border-b mx-8">
            {f}
          </p>
        ))}
      </div>
      <button
        className="rounded-md font-medium w-[200px] mx-auto my-6 px-6 py-3 "
        style={{ backgroundColor: buttonColor, color: buttonTextColor }}
      >
        Start Trial
      </button>
    </div>
  );
};

export default PriceCard;
