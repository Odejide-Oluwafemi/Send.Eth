export function NavBar() {
  return (
    <nav>
      <ul>
        <a href="#about-section" className="nav-link">
          <li>About Us<div className="bg-orangeAccent"></div></li>
        </a>

        <a href="#contact-section" className="nav-link">
          <li>Contact<div className="bg-orangeAccent"></div></li>
        </a>
      </ul>
    </nav>
  );
}

export default NavBar;

