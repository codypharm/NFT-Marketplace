import React, { useEffect, useState } from "react";
import heroImg from "../assets/hero.jpeg";
import { setGlobalState, useGlobalState } from "../store";

const Artworks = () => {
  const [nfts] = useGlobalState("nfts");
  const [end, setEnd] = useState(1);
  const [count] = useState(1);
  const [collection, setCollection] = useState([]);

  const getCollection = () => {
    return nfts.slice(0, end);
  };

  useEffect(() => {
    setCollection(getCollection());
  }, [nfts, end]);

  return (
    <div className="bg-[#151c25] gradient-bg-artworks">
      <div className="w-4/5 py-10 mx-auto">
        <h4 className="text-white text-3xl font-bold uppercase text-gradient">
          {collection.length > 0 ? "Latest Artworks" : "No Artworks yet"}
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-4 lg:gap-3 py-2.5">
          {collection.map((nft, index) => (
            <Card key={index} nft={nft} />
          ))}
        </div>

        {collection.length > 0 && nfts.length > collection.length ? (
          <div className="text-center my--5">
            <button
              onClick={() => setEnd(end + count)}
              className="shadow-lg shadow-black text-sm text-white bg-green-500  hover:bg-green-600 rounded-full p-2 "
            >
              Load More
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const Card = ({ nft }) => {
  const setNFT = () => {
    setGlobalState("nft", nft);
    setGlobalState("showModal", "scale-100");
  };
  return (
    <div className="w-full shadow-xl shadow-black rounded-md overflow-hidden bg-gray-800 my-2 p-3">
      <img
        className="h-60 w-full object-cover shadow-lg shadow-black rounded-lg mb-3"
        src={nft.metadataURI}
        alt={nft.title}
      />
      <h4 className="text-white font-semibold">{nft.title}</h4>
      <p className="text-gray-400 text-sm my-1">{nft.description}</p>

      <div className="flex justify-between items-center mb-3 text-white ">
        <div className="flex flex-col">
          <small className="text-xs ">Current price</small>
          <p className="text-sm font-semibold">{nft.price} ETH</p>
        </div>

        <button
          onClick={setNFT}
          className="shadow-lg shadow-black text-sm bg-green-500  hover:bg-green-600 rounded-full px-1.5 py-1"
        >
          Show details
        </button>
      </div>
    </div>
  );
};

export default Artworks;
