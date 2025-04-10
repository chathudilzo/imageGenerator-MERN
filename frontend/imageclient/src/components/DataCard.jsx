import React from "react";

const DataCard = ({ title, text, onClick }) => {
  return (
    <div
      onClick={onclick}
      className=" z-50 mb-3 items-center justify-center bg-black p-4 rounded-3xl transition-all duration-300 border border-gray-500 hover:border-[2px] hover:border-purple-500 hover:shadow-[0_0_10px_2px_rgba(168,85,247,0.5)]"
    >
      <div>
        <h1 className="font-semibold text-white">{title}</h1>
      </div>
      <p className="text-gray-300">{text}</p>
    </div>
  );
};

export default DataCard;
