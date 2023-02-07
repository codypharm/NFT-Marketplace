import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import heroImg from "../assets/hero.jpeg";
import { updateNFT } from "../Blockchain.services";
import {
  useGlobalState,
  setGlobalState,
  setLoadingMsg,
  setAlert,
} from "../store";

const UpdateNFT = () => {
  const [updateModal] = useGlobalState("updateModal");
  const [nft] = useGlobalState("nft");
  const [price, setPrice] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!price || price <= 0) return;
    setGlobalState("modal", "scale-0");
    setLoadingMsg("Initializing price update...");

    try {
      setLoadingMsg("Price updating...");
      setGlobalState("updateModal", "scale-0");

      await updateNFT({ id: nft.id, cost: nft.price });

      setAlert("Price updated...");
      window.location.reload();
    } catch (error) {
      console.log("error updating price", error);
      setAlert("Update failed...", "red");
    }

    closeModal();
  };

  const resetForm = () => {
    setPrice("");
  };

  const closeModal = () => {
    setGlobalState("updateModal", "scale-0");
    resetForm();
  };

  useEffect(() => {
    setPrice(nft?.price);
  }, [nft]);

  return (
    <div
      className={` fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform transition-transform duration-300 ${updateModal} `}
    >
      <div className="bg-[#151c25] shadow-xl shadow-green-500 rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="flex justify-between items-center text-gray-400">
            <p className="font-semibold  ">Candy NFT</p>
            <button
              onClick={closeModal}
              type="button"
              className="border-0 bg-transparent focus:outline-none"
            >
              <FaTimes />
            </button>
          </div>

          <div className="flex justify-center items-center rounded-xl mt-5">
            <div className="shrink-0 rounded-xl overflow-hidden h-20 w-20">
              <img
                className="h-full w-full object-cover cursor-pointer"
                src={nft?.metadataURI}
                alt="NFT"
              />
            </div>
          </div>

          <div className="flex justify-between items-center bg-gray-800 rounded-xl mt-5">
            <input
              className="block bg-transparent border-0 w-full text-sm text-slate-500 focus:outline-none cursor-pointer focus:ring-0"
              type="number"
              min={0.01}
              step={0.01}
              placeholder="Price (ETH)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              name="price"
              required
            />
          </div>

          <button
            className=" flex w-full text-md mt-5 justify-center items-center shadow-lg
           shadow-black text-sm text-white bg-green-500
             hover:bg-green-600 rounded-full p-2 "
          >
            Mint Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateNFT;
