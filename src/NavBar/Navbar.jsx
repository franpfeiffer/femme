import { Link } from "react-router-dom";
import { Badge } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { useContext, useState } from "react";
import { CarritoContext } from "../context/CarritoContext";
import useAuthorization from "../Admin/HooksAdmin/useAuthorization";
import { SearchComponent } from "../SearchFetch/SearchComponent";
import { Navbar, Container, Nav } from "react-bootstrap";



export const Navbar1 = () => {
  const accesoPermitido = useAuthorization();
  const { listaCompras } = useContext(CarritoContext)
  const [search, setSearch] = useState([])
  const captureContentSearch = (contenidoSearch) => {
    setSearch(contenidoSearch)
    console.log(contenidoSearch);
  }


  return (
    <div className="navContainer">
      <Navbar className="navbar-color"  expand="lg">
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
                <Nav.Link as={Link} to="/productos">
                  Productos
                </Nav.Link>
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
