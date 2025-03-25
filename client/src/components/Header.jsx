import { RiAccountBoxFill } from "react-icons/ri";
import { Link } from "react-router";

const Header = () => {
  return (
    <header className="flex items-center justify-between h-[60px] pl-[100px] pr-[100px]">
      <section>
        <Link to="/">
          <img
            className="h-[50px] rounded-4xl cursor-pointer"
            src="app-logo.png"
            alt=""
          />
        </Link>
      </section>
      <section className="text-6xl font-[cursive]">Taskify Hub</section>
      <section>
        <a href="account">
          <RiAccountBoxFill className="text-[40px] hover:p-[2px]" />
        </a>
      </section>
    </header>
  );
};

export default Header;
