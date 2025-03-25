import { FaRegCopyright } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="flex fixed left-0 bottom-0 right-0 h-[80px] justify-end items-center font-[arial]">
      <FaRegCopyright />{" "}
      <span className="pl-2 pr-24"> All rights reserved to Mukul Joshi</span>
    </footer>
  );
};

export default Footer;
