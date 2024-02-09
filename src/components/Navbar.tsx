import React, { useEffect, useState } from "react";
import Logo from "../../public/Logo.jpg";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.screenY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="w-full bg-[#1B1B1B] fixed top-0 left-0 right-0 z-50">
      <nav
        className={` text-white flex flex-col justify-center items-center  ${
          isSticky
            ? "sticky top-0 left-0 right-0 border-b bg-[#1B1B1B] duration-300"
            : ""
        }`}
      >
        <img
          src={Logo}
          height={90}
          width={100}
          className="cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        />
        <hr className="w-full h-[1px] border-none bg-gray-700" />
        <div
          className="border-b-2 border-b-red-500 mt-2 flex justify-center"
          onClick={() => navigate("/")}
        >
          <span className="text-sm font-semibold py-2 text-start cursor-pointer hover:text-neutral-300">
            CHARACTERS
          </span>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
