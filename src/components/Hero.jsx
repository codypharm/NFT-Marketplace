import React from "react";
import heroImg from "../assets/hero.jpeg";
import Identicon from "react-identicons";
import { setGlobalState, truncate, useGlobalState } from "../store";

function Hero() {
  const [connectedAccount] = useGlobalState("connectedAccount");
  return (
    <div className="flex flex-col md:flex-row w-4/5 justify-between items-center mx-auto py-10">
      <div className="md:w-3/6 w-full">
        <div>
          <h1 className="text-white text-5xl font-bold">
            Buy and Sell <br />
            Digital Arts, <br /> <span className="text-gradient">
              NFTs,
            </span>{" "}
            and More
          </h1>
          <p className="text-gray-500 font-semibold text-sm mt-3 ">
            Mint and collect the hottest NFTs around.
          </p>
        </div>

        <div className="flex mt-5 ">
          <button
            onClick={() => setGlobalState("modal", "scale-100")}
            className="shadow-xl shadow-black text-white bg-green-500 hover:bg-green-600 rounded-full p-2"
          >
            Create NFT
          </button>
        </div>

        <div className="w-3/4  flex justify-between items-center mt-5">
          <div className="text-white">
            <p className="font-bold ">123k</p>
            <small className="text-gray-300">Users</small>
          </div>
          <div className="text-white">
            <p className="font-bold ">152k</p>
            <small className="text-gray-300">Artworks</small>
          </div>
          <div className="text-white">
            <p className="font-bold ">200k</p>
            <small className="text-gray-300">Artists</small>
          </div>
        </div>
      </div>

      <div className="shadow-xl shadow-black md:w-2/5 w-full mt-10 md:mt-0 rounded-md overflow-hidden bg-gray-800">
        <img className="h-60 w-full object-cover" src={heroImg} alt="hero" />
        <div className="flex justify-start items-center p-3">
          <Identicon
            className="h-10 w-10 object-contain rounded-full mr-3"
            string={truncate(connectedAccount, 4, 4, 11)}
            size={50}
          />
          <div>
            <p className="text-white font-semibold">
              {truncate(connectedAccount, 4, 4, 11)}
            </p>
            <small className="text-green-800 font-bold">@you</small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
