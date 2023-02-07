import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import heroImg from "../assets/hero.jpeg";
import axios from "axios";
import {
  useGlobalState,
  setGlobalState,
  setAlert,
  setLoadingMsg,
} from "../store";
import { create } from "ipfs-http-client";
import { mintNFT } from "../Blockchain.services";

const auth =
  "Basic " +
  Buffer.from("ootpir3563344" + ":" + "552531t424").toString("base64");
const client = create({
  host: "ipfs.infura.io",
  port: "5001",
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

const JWT = `Bearer ${process.env.REACT_APP_JWT}`;

const CreateNFT = () => {
  const [modal] = useGlobalState("modal");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [imgBase64, setImgBase64] = useState(null);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!title || !description || !price) return;
  //   setGlobalState("modal", "scale-0");
  //   setLoadingMsg("Uploading to IPFS...");
  //   try {
  //     const created = await client.add(fileUrl);
  //     setLoadingMsg("Uploaded, Approve transaction now...");
  //     const metaDataURI = `https://ipfs.io/ipfs/${created}`;
  //     const nft = { title, description, price, metadataURI };
  //     await mintNFT(nft);

  //     closeModal();
  //     setAlert("Minting completed...");
  //     window.location.reload();
  //   } catch (error) {
  //     console.log("Error uploading file");
  //     setAlert("Minting failed...", "red");
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !price) return;
    setGlobalState("modal", "scale-0");
    setLoadingMsg("Uploading to IPFS...");

    try {
      const formData = new FormData();
      formData.append("file", fileUrl);
      formData.append("upload_preset", "versafy-uploads");
      const data = await fetch(
        "https://api.cloudinary.com/v1_1/ikejiwilliam/image/upload",
        {
          method: "POST",
          body: formData,
        }
      ).then((r) => r.json());

      setLoadingMsg("Uploaded, Approve transaction now...");
      const metaDataURI = data.secure_url;

      const nft = { title, description, metaDataURI, price };
      await mintNFT(nft);

      closeModal();
      setAlert("Minting completed...");
      window.location.reload();
    } catch (error) {
      console.log("Error uploading file");
      setAlert("Minting failed...", "red");
    }
  };

  // const handleSubmission = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();

  //   formData.append("file", fileUrl);

  //   const metadata = JSON.stringify({
  //     name: fileUrl.name,
  //   });
  //   formData.append("pinataMetadata", metadata);

  //   const options = JSON.stringify({
  //     cidVersion: 0,
  //   });
  //   formData.append("pinataOptions", options);

  //   try {
  //     const res = await axios.post(
  //       "https://api.pinata.cloud/pinning/pinFileToIPFS",
  //       formData,
  //       {
  //         maxBodyLength: "Infinity",
  //         headers: {
  //           "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
  //           Authorization: JWT,
  //         },
  //       }
  //     );
  //     console.log(res.data);
  //     setLoadingMsg("Uploaded, Approve transaction now...");
  //     const metaDataURI = fileUrl.name;
  //     const nft = { title, description, price, metadataURI };
  //     await mintNFT(nft);

  //     closeModal();
  //     setAlert("Minting completed...");
  //     window.location.reload();
  //   } catch (error) {
  //     console.log(error);
  //     console.log("Error uploading file");
  //     setAlert("Minting failed...", "red");
  //   }
  // };

  const changeImage = async (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) reader.readAsDataURL(e.target.files[0]);

    reader.onload = (readerEvent) => {
      const file = readerEvent.target.result;
      setImgBase64(file);
      setFileUrl(e.target.files[0]);
    };
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setFileUrl("");
    setPrice("");
    setImgBase64(null);
  };

  const closeModal = () => {
    setGlobalState("modal", "scale-0");
    resetForm();
  };

  return (
    <div
      className={` fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform transition-transform duration-300 ${modal} `}
    >
      <div className="bg-[#151c25] shadow-xl shadow-green-500 rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="flex justify-between items-center text-gray-400">
            <p className="font-semibold  ">Add NFT</p>
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
                src={imgBase64 || heroImg}
                alt="NFT"
              />
            </div>
          </div>

          <div className="flex justify-between items-center bg-gray-800 rounded-xl mt-5">
            <label className="block">
              <span className="sr-only"> Choose profile photo</span>
              <input
                onChange={changeImage}
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold hover:file:bg-[#1d2631] focus:outline-none cursor-pointer focus:ring-0"
                type="file"
                accept="image/png, image/gif, image/jpeg, image/jpg, image/webp"
                required
              />
            </label>
          </div>
          <div className="flex justify-between items-center bg-gray-800 rounded-xl mt-5">
            <input
              className="block bg-transparent border-0 w-full text-sm text-slate-500 focus:outline-none cursor-pointer focus:ring-0"
              type="text"
              placeholder="Title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
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
          <div className="flex justify-between items-center bg-gray-800 rounded-xl mt-5">
            <textarea
              className="block bg-transparent border-0 w-full text-sm text-slate-500 focus:outline-none cursor-pointer focus:ring-0 h-20 resize-none"
              placeholder="Description"
              name="description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
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

export default CreateNFT;
