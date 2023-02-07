import Identicon from "react-identicons";

import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import heroImg from "../assets/hero.jpeg";
import {
  useGlobalState,
  setGlobalState,
  truncate,
  setLoadingMsg,
  setAlert,
} from "../store";
import { buyNFT } from "../Blockchain.services";

const ShowNFT = () => {
  const [modal] = useGlobalState("showModal");
  const [nft] = useGlobalState("nft");
  const [connectedAccount] = useGlobalState("connectedAccount");

  const onChangePrice = () => {
    setGlobalState("nft", nft);
    setGlobalState("showModal", "scale-0");
    setGlobalState("updateModal", "scale-100");
  };

  const handlePurchase = async () => {
    setGlobalState("showModal", "scale-0");
    setLoadingMsg("Initializing NFT purchase...");

    try {
      setLoadingMsg("Purchasing, please sign transaction...");

      await buyNFT({ id: nft.id, cost: nft.price });

      setAlert("NFT purchased...");
      window.location.reload();
    } catch (error) {
      console.log("error updating price", error);
      setAlert("Purchase failed...", "red");
    }
  };

  const closeModal = () => {
    setGlobalState("showModal", "scale-0");
  };

  return (
    <div
      className={` fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform transition-transform duration-300 ${modal} `}
    >
      <div className="bg-[#151c25] shadow-xl shadow-green-500 rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <div className="flex flex-col">
          <div className="flex justify-between items-center text-gray-400">
            <p className="font-semibold  ">Buy NFT</p>
            <button
              onClick={closeModal}
              type="button"
              className="border-0 bg-transparent focus:outline-none"
            >
              <FaTimes />
            </button>
          </div>

          <div className="flex justify-center items-center rounded-xl mt-5">
            <div className="shrink-0 rounded-xl overflow-hidden h-40 w-40">
              <img
                className="h-full w-full object-cover cursor-pointer"
                src={nft?.metadataURI}
                alt={nft?.title}
              />
            </div>
          </div>

          <div className="flex flex-col justify-start rounded-xl mt-5">
            <h1 className="text-white font-semibold">{nft?.title}</h1>
            <p className="text-gray-400 text-xs my-1">{nft?.description}</p>

            <div className=" flex justify-between items-center mt-3 text-white">
              <div className="flex justify-start items-center">
                <Identicon
                  className="h-10 w-10 object-contain rounded-full mr-3 "
                  string={nft?.owner}
                  size={50}
                />
                <div className="flex flex-col justify-center items-start">
                  <small className="text-white font-bold ">Owner</small>
                  <small className="text-green-800  font-semibold">
                    {nft ? truncate(nft?.owner, 4, 4, 11) : "0x0"}
                  </small>
                </div>
              </div>

              <div className="flex flex-col text-white">
                <small className="text-xs">Current Price</small>
                <p className="text-small font-semibold">{nft?.price} ETH</p>
              </div>
            </div>
          </div>

          {connectedAccount == nft?.owner ? (
            <button
              onClick={onChangePrice}
              className=" flex w-full text-md mt-5 justify-center items-center shadow-lg
           shadow-black text-sm text-white bg-green-500
             hover:bg-green-600 rounded-full p-2 "
            >
              Change Price
            </button>
          ) : (
            <button
              onClick={handlePurchase}
              className=" flex w-full text-md mt-5 justify-center items-center shadow-lg
           shadow-black text-sm text-white bg-green-500
             hover:bg-green-600 rounded-full p-2 "
            >
              Purchase Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowNFT;
