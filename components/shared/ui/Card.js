"use client";

const Card = ({ children }) => {
  return (
    <div className=" card_charts p-4 w-full h-fit shadow-md rounded-xl overflow-hidden">
      {children}
    </div>
  );
};

export default Card;
