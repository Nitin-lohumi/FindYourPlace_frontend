"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  setHasPhoneNumber,
  setOpenNowPlaces,
  setSelectedOptions,
  setSort,
  settypeSelectedOptions,
} from "@/store/Slices/FilterSlice";
function LayOutComp() {
  const dispatch = useDispatch();
  const { selectedOptions, typeSelectOptions, openNowPlaces, hasphnNo, sort } =
    useSelector((state: RootState) => state.Filters);
  console.log(
    selectedOptions,
    typeSelectOptions,
    openNowPlaces,
    hasphnNo,
    sort
  );
  const option = ["4 star & above", "3 stars", "2stars"];
  const typesSelect = ["restaurant", "cafe", "museum", "store", "park"];
  function handleChange(e: any) {
    const value = e.target.value;
    dispatch(setSelectedOptions(value));
  }
  useEffect(() => {}, []);
  return (
    <motion.div className="">
      <motion.h1
        initial={{ x: -100, opacity: 0, scale: 2 }}
        animate={{ x: 0, opacity: [0.1, 0.5, 1], scale: 1 }}
        transition={{ duration: 0.6, ease: "easeIn" }}
        className="text-white text-center text-shadow-cyan-400 mb-2 font-bold text-2xl text-shadow-2xs"
      >
        Filter's{" "}
      </motion.h1>
      <hr className="border-gray-600 border-0.2" />
      <motion.div className="pl-2 border-white pb-2">
        <h3 className="font-bold text-gray-300 pt-2 pb-2"> Sort Options</h3>
        <RadioGroup
          value={sort}
          onValueChange={(val) => dispatch(setSort(val))}
          className=""
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="Sort In accending"
              id="Rating"
              color="green"
              className="w-4 h-4 rounded-full border border-gray-400 data-[state=checked]:bg-blue-600"
            />
            <Label htmlFor="Rating" className="text-gray-400">
              Sort In accending
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="Sort In descending"
              id="Distance"
              className="w-4 h-4 rounded-full border border-gray-400 data-[state=checked]:bg-blue-600"
            />
            <Label htmlFor="Distance" className="text-gray-400">
              Sort In descending
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="Most Reviewed"
              id="Reviewed"
              className="w-4 h-4 rounded-full border border-gray-400 data-[state=checked]:bg-blue-600"
            />
            <Label htmlFor="Reviewed" className="text-gray-400">
              Most Reviewed{" "}
            </Label>
          </div>
        </RadioGroup>
      </motion.div>
      <hr className="border-gray-600 border-0.2" />
      {/*  */}
      <motion.div className="border-white pl-2 pb-2 pt-2">
        <h2 className="text-gray-300 capitalize font-bold ">
          place which are Open
        </h2>
        <label className="p-1 flex items-center gap-3">
          <p className="text-gray-400"> Open now </p>
          <input
            type="checkbox"
            checked={openNowPlaces}
            onChange={() => dispatch(setOpenNowPlaces())}
            className=" cursor-pointer w-10 h-5 rounded-full bg-gray-700 checked:bg-green-500 appearance-none relative
    before:content-[''] before:absolute before:top-0.5 before:left-0.5 before:w-4 before:h-4 before:bg-white
    before:rounded-full before:transition-transform checked:before:translate-x-5"
          />
        </label>
      </motion.div>
      {/*  */}
      <hr className="border-gray-600 border-0.2" />

      <motion.div className="pl-2 pb-2 pt-2">
        <h2 className="text-gray-300 font-bold pb-1">Rating</h2>
        {option.map((v, i) => {
          return (
            <label
              key={i}
              style={{ display: "block" }}
              className="text-gray-400"
            >
              <input
                type="checkbox"
                className="mr-2"
                value={v}
                checked={selectedOptions.includes(v)}
                onChange={handleChange}
              />
              {v}
            </label>
          );
        })}
      </motion.div>
      <hr className="border-gray-600 border-0.2" />

      <motion.div className="border-white pl-2 pb-2 pt-2">
        <h2 className="text-gray-400 font-bold">Type / Category Filter</h2>
        {typesSelect.map((v, i) => {
          return (
            <label key={i} className="block text-gray-400">
              <input
                type="checkbox"
                value={v}
                className="mr-2"
                onChange={(e) =>
                  dispatch(settypeSelectedOptions(e.target.value))
                }
              />
              {v}
            </label>
          );
        })}
      </motion.div>
      {/* *****************************/}
      <hr className="border-gray-600 border-0.2" />
      <motion.div className="pl-2 pb-2 pt-2 mb-4">
        <h2 className="text-gray-400 font-bold"> Phone Number</h2>
        <label className="text-gray-400">
          <input
            type="checkbox"
            value={hasphnNo}
            className="mr-2"
            onChange={() => dispatch(setHasPhoneNumber())}
          />
          Has Phone No.
        </label>
      </motion.div>
    </motion.div>
  );
}
export default LayOutComp;
