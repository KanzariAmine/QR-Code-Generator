import React from "react";
import photo from "../assets/Kanpower_website.jpg";
const Home = () => {
  return (
    <div className="w-full h-full flex justify-center items-center overflow-hidden">
      <img src={photo} alt="" className="w-full h-full object-cover" />
    </div>
  );
};

export default Home;
