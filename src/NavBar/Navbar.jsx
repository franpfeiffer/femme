export const Navbar = () => {
  return (
    <div className="navContainer">
      <nav className="nav">
      <div>
        <img src="logoFemmeFake.png" alt="Logo" className="logoFemme"/>
      </div>
      <div className="nav__search">
          <input type="text" placeholder="" />
          <button>Buscar</button>
      </div>
      <ul className="nav__list">
        <li className="nav__item">Home</li>
        <li className="nav__item">Productos</li>
        <li className="nav__item">Carrito</li>
      </ul>
    </nav>
    <div className="banner">
      <p>Banner</p>
    </div>
    </div>
  );
}
