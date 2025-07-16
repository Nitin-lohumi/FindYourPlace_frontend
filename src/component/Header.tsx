"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import DropDown from "./DropDown";
import "../styles/Header.style.css";
import { useRouter } from "next/navigation";

function Header() {
  const Router = useRouter();
  const [textSearch, setSearchText] = useState("");
  const [scale, setScale] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  const handleSearch = () => setScale(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll < 10) {
        setIsVisible(true);
      } else if (currentScroll > lastScrollY.current) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScroll;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY.current]);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && textSearch.trim().length >= 3) {
      Router.push(`/search?text=${textSearch}`);
    }
  };
  const handleSubmitSearch = () => {
    if (textSearch.trim().length >= 3) {
      Router.push(`/search?text=${textSearch}`);
    }
  };

  return (
    <motion.header
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-[1000] transition-all duration-300 bg"
    >
      <motion.div className="shadowDark shadow-xl flex p-4 justify-between w-full items-center">
        <motion.div className={`md:w-full ${!scale && "w-full"}`}>
          <motion.p className="capitalize font-bold text-white md:text-xl text-xs">
            Your Places
          </motion.p>
        </motion.div>

        <motion.div
          className={`flex ${
            scale ? "justify-between" : "justify-end"
          } w-full items-center gap-3`}
        >
          <motion.div
            className="relative cursor-pointer rounded-xl shadowDark flex"
            onClick={handleSearch}
            animate={{ x: scale ? -10 : 0, width: scale ? "100%" : "" }}
            transition={{ duration: 0.5 }}
          >
            <motion.input
              type="text"
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`${scale ? "Search for Place" : ""}`}
              value={textSearch}
              className={`${
                scale ? "w-full" : "w-0"
              } border-none p-1 md:pl-9 pl-8 md:text-xl text-sm outline-none text-white`}
              animate={{ width: scale ? "100%" : "0" }}
              transition={{ duration: 0.5 }}
            />
            <motion.div className="absolute p-2 left-1 top-1/2 text-white -translate-y-1/2">
              <FaSearch />
            </motion.div>
            {scale && textSearch.length >= 3 && (
              <motion.button
                initial={{ opacity: 0.6, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                onClick={handleSubmitSearch}
                className="text-blue-400 flex flex-row gap-2 items-center rounded-xl border border-white cursor-pointer pl-1 pr-1 md:font-bold font-medium m-0"
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
