import Logo from "../images/logo_mesto.svg";
import "../index.css";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" alt="Место" src={Logo} />
    </header>
  );
}

export default Header;
