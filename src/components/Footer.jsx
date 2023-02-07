import logo from "../assets/timeless.png";

const Footer = () => {
  return (
    <div className="w-full flex flex-col md:justify-center justify-between items-center gradient-bg-footer p-4">
      <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
        <div className="flex flex-[0.25] justify-center items-center">
          <img className="w-32" src={logo} alt="logo" />
        </div>

        <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full text-white text-base text-center">
          <p className="cursor-pointer mx-2">Market</p>
          <p className="cursor-pointer mx-2">Artist</p>
          <p className="cursor-pointer mx-2">Features</p>
          <p className="cursor-pointer mx-2">Community</p>
        </div>

        <div className=" flex flex-[0.25] justify-center items-center">
          <p className="text-white text-right text-sm ">
            &copy;2023 All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
