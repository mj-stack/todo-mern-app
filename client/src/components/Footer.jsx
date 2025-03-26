import { FaRegCopyright } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="mt-auto flex h-[80px] justify-end items-center font-[arial] bg-transparent">
      <FaRegCopyright />{" "}
      <span className="pl-2 pr-24"> All rights reserved to Mukul Joshi</span>
    </footer>
  );
};

export default Footer;
