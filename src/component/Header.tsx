"use client";

import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import DropDown from "./DropDown";
import "../styles/Header.style.css";
function Header() {
  const [textSearch, setSearchText] = useState("");
  const [scale, setScale] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const handleSearch = () => setScale(true);
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll < 40) {
        setIsVisible(true);
        return;
      }
      if (currentScroll > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScroll);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <motion.header
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className={`sticky top-0 z-[100] transition-all duration-300 bg`}
    >
      <motion.div className="shadowDark shadow-xl flex p-4 justify-between w-full items-center">
        <motion.div className="w-full">
          <motion.p className="capitalize font-bold text-white">Trips</motion.p>
        </motion.div>

        <motion.div
          className={`flex ${
            scale ? "justify-between" : "justify-end"
          } w-full items-center gap-3`}
        >
          <motion.div
            className="relative cursor-pointer border rounded-xl shadowDark flex"
            onClick={handleSearch}
            animate={{ x: scale ? -100 : 0, width: scale ? "100%" : "" }}
            transition={{ duration: 0.5 }}
          >
            <motion.input
              type="text"
              onChange={(e) => setSearchText(e.target.value)}
              placeholder={`${scale ? "Search for your move" : ""}`}
              value={textSearch}
              className={`${
                scale ? "w-full" : "w-0"
              } border-none p-1 pl-8 outline-none text-white`}
              animate={{ width: scale ? "100%" : "0" }}
              transition={{ duration: 0.5 }}
            />
            <motion.div className="absolute p-2 left-1 top-1/2 text-white -translate-y-1/2">
              <FaSearch />
            </motion.div>

            {scale && textSearch.length >= 3 && (
              <motion.button
                initial={{ opacity: 0.6, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="border text-blue-400 rounded-xl cursor-pointer flex flex-row items-center pl-1 pr-1 font-bold m-0 gap-2"
              >
                <span>Search</span> <FaSearch />
              </motion.button>
            )}
          </motion.div>
          <motion.div className="cursor-pointer text-white">
            <DropDown />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.header>
  );
}

export default Header;
