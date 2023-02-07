import { useEffect, useState } from "react";
import { BiTransfer } from "react-icons/bi";
import { MdOpenInNew } from "react-icons/md";
import { truncate, useGlobalState } from "../store";

const Transactions = () => {
  const [transactions] = useGlobalState("transactions");
  const [end, setEnd] = useState(1);
  const [count] = useState(1);
  const [collection, setCollection] = useState([]);

  const getCollection = () => {
    return transactions.slice(0, end);
  };

  useEffect(() => {
    setCollection(getCollection());
  }, [transactions, end]);

  return (
    <div className="bg-[#151c25] gradient-bg-artworks">
      <div className="w-4/5 py-10 mx-auto">
        <h4 className="text-white text-3xl font-bold uppercase text-gradient">
          {collection.length > 0
            ? "Latest Transactions"
            : "No Transactions yet"}
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-4  lg:gap-2 py-2.5">
          {collection.map((tx, index) => (
            <Transaction key={index} tx={tx} />
          ))}
        </div>
        {collection.length > 0 && transactions.length > collection.length ? (
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

const Transaction = ({ tx }) => (
  <div className="flex justify-between items-center border border-green-500 text-gray-400 w-full shadow-xl shadow-black rounded-md overflow-hidden bg-gray-800 my-2 p-3">
    <div className="rounded-md shadow-sm shadow-green-500 p-2">
      <BiTransfer />
    </div>

    <div>
      <h4 className="text-sm"> NFT Transfered</h4>
      <small className="flex justify-start items-center">
        <span className="mr-1">Received By </span>
        <a className="text-green-500 mr-2" href="#" target="_blank">
          {truncate(tx.owner, 4, 4, 11)}
        </a>
        <MdOpenInNew />
      </small>
    </div>
    <p className="text-sm font-medium">{tx.price} ETH</p>
  </div>
);

export default Transactions;
