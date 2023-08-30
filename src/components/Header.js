import Logo from "../images/logo_mesto.svg";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" alt="Место" src={Logo} />
    </header>
  );
}

export default Header;
