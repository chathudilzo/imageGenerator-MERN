import React from "react";

const Profiles = () => {
  const images = [
    "assets/prof/image.png",
    "assets/prof/image-1.png",
    "assets/prof/image-2.png",
    "assets/prof/image-3.png",
    "assets/prof/image-4.png",
    "assets/prof/image-5.png",
    "assets/prof/image-6.png",
  ];
  return (
    <div className="flex flex-col items-center justify-center px-4 md:px-0">
      <div className="flex items-center justify-center space-x-[-30px]  overflow-x-auto">
        {images.map((src, index) => {
          const isFirst = index === 0;
          const isLast = index === images.length - 1;

          return (
            <div
              className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-black shadow-md z-[${index}]`}
            >
              <img src={src} className="w-full h-full object-cover" />
              {(isFirst || isLast) && (
                <div className="absolute inset-0 bg-black opacity-40 rounded-full"></div>
              )}
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-lg sm:text-xl md-text-3xl text-center bg-gradient-to-r from-purple-600 via-teal-500 to-pink-600 text-transparent bg-clip-text font-semibold">
        +150 Million Users{" "}
        <span className="text-white text-sm sm:text-base md:text-2xl">
          All Around The World
        </span>
      </p>
    </div>
  );
};

export default Profiles;
