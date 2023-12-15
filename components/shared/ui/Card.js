"use client";

const Card = ({ children }) => {
  return (
    <div className="bg-[#0a0d28] p-4 w-fit h-fit shadow-md rounded-xl overflow-hidden">
      {children}
    </div>
  );
};

export default Card;
