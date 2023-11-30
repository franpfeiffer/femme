import { Link } from "react-router-dom";
import { Badge } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { useContext, useState, useEffect } from "react";
import { CarritoContext } from "../context/CarritoContext";
import useAuthorization from "../Admin/HooksAdmin/useAuthorization";
import { SearchComponent } from "../SearchFetch/SearchComponent";
import { Navbar, Container, Nav } from "react-bootstrap";
import NavDropdown from 'react-bootstrap/NavDropdown';


export const Navbar1 = () => {
  const [categoria, setCategoria] = useState([]);
  const [hover, setHover] = useState(false);
  const accesoPermitido = useAuthorization();
  const { listaCompras } = useContext(CarritoContext)
  const [search, setSearch] = useState([])
  const captureContentSearch = (contenidoSearch) => {
    setSearch(contenidoSearch)
    console.log(contenidoSearch);
  }


  useEffect(() => {
    const fetchCategoria = async () => {
      try {
        const response = await fetch('https://api-femme.onrender.com/componentes/categoria', { method: 'GET' });
        if (!response.ok) {
          throw new Error(`Fetch failed with status ${response.status}`);
        }
        const data = await response.json();
        setCategoria(data);
      } catch (error) {
        console.error('Error fetching componentes, categoria:', error);
      }
    };

    fetchCategoria();
  }, []);

  return (
    <div className="navContainer">
      <Navbar className="navbar-color" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img src="logoFemmeFake.png" alt="Logo" className="logoFemme" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className="ms-auto">
              {accesoPermitido && (
                <Nav.Item>
                  <Nav.Link as={Link} to="/AdminPanel">
                    AdminPanel
                  </Nav.Link>
                </Nav.Item>
              )}
              <Nav.Item>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <NavDropdown title="Productos" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/productos">Todos los Productos</NavDropdown.Item>
                  {
                    <>
                      {categoria.length > 0 && categoria.map((item) => (
                        <NavDropdown.Item as={Link} key={item.id} to={`/productos/${item.nombre}`}>{item.nombre}</NavDropdown.Item>
                      ))}
                    </>


                  }
                </NavDropdown>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/carrito">
                  <Badge badgeContent={listaCompras.length} color="secondary">
                    <ShoppingCart color="action" />
                  </Badge>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <SearchComponent contenidoSearch={captureContentSearch} />
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
