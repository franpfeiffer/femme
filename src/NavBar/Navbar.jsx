import { Link } from "react-router-dom";
import { Badge } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";



export const Navbar = () => {

  const { listaCompras } = useContext(CarritoContext)
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
        <li className="nav__item"><Link to={'/carrito'}><Badge badgeContent={listaCompras.length} color="secondary">
                                                          <ShoppingCart color="action" />
                                                        </Badge></Link></li>
      </ul>
    </nav>
    <div className="banner">
      <p>Banner</p>
    </div>
    </div>
  );
}
