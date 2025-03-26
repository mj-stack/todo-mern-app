import { RiAccountBoxFill } from "react-icons/ri";
import { Link } from "react-router";

const Header = () => {
  return (
    <header className="flex items-center justify-between h-[60px] px-4 sm:px-[100px]">
      <section>
        <Link to="/">
          <img
            className="h-[35px] sm:h-[50px] rounded-4xl cursor-pointer"
            src="app-logo.png"
            alt=""
          />
        </Link>
      </section>
      <section className="text-3xl sm:text-6xl font-[cursive]">
        Taskify Hub
      </section>
      <section>
        <a href="account">
          <RiAccountBoxFill className="text-[30px] sm:text-[40px] hover:p-[2px]" />
        </a>
      </section>
    </header>
  );
};

export default Header;
