import { Link } from "react-router-dom";

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
        <li className="nav__item"><Link to={'/'}>Home</Link></li>
        <li className="nav__item"><Link to={'/productos'}>Productos</Link></li>
        <li className="nav__item">Carrito</li>
      </ul>
    </nav>
    <div className="banner">
      <p>Banner</p>
    </div>
    </div>
  );
}
