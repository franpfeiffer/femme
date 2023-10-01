import { Link } from "react-router-dom";
import { Badge } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { useContext,useState } from "react";
import { CarritoContext } from "../context/CarritoContext";
import useAuthorization from "../Admin/HooksAdmin/useAuthorization";
import { SearchComponent } from "../SearchFetch/SearchComponent";



export const Navbar = () => {
  const accesoPermitido = useAuthorization();
  const { listaCompras } = useContext(CarritoContext)
  const [search, setSearch] = useState([])
  const captureContentSearch = (contenidoSearch) => {
      setSearch(contenidoSearch)
      console.log(contenidoSearch);
  }
  return (
    <div className="navContainer">
      <nav className="nav">
        <div>
          <img src="logoFemmeFake.png" alt="Logo" className="logoFemme" />
        </div>
        <SearchComponent contenidoSearch={captureContentSearch}/>
        <ul className="nav__list">
          {
            accesoPermitido ? (<li className="nav__item"><Link to={'/AdminPanel'}>AdminPanel</Link></li>) :
              null
          }

          <li className="nav__item"><Link to={'/'}>Home</Link></li>
          <li className="nav__item"><Link to={'/productos'}>Productos</Link></li>
          <li className="nav__item"><Link to={'/carrito'}><Badge badgeContent={listaCompras.length} color="secondary">
            <ShoppingCart color="action" />
          </Badge></Link></li>
        </ul>
      </nav>
    </div>
  );
}
