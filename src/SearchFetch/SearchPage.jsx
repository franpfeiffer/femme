import { useLocation } from 'react-router-dom';
import { Card } from '../Card/Card';
import { CarritoContext } from "../context/CarritoContext";
import { useContext } from "react"
export const SearchPage = () => {
  const location = useLocation();
  const resultados = location.state && location.state.resultados;
  const { agregarCompra, eliminarCompra } = useContext(CarritoContext)

  const handleAgregar = (compra) => {
    agregarCompra(compra)
  }
  const handleQuitar = (id) => {
    eliminarCompra(id)
  }
  return (
    <div>
      <h2>Resultados de la búsqueda:</h2>
      <ul>
        {resultados.map((resultado) => (
          <Card
            key={resultado.id}
            imagen={resultado.imagene[0]?.url}
            nombre={resultado.nombre}
            descripcion={resultado.descripcion}
            precio={resultado.precio}
            handleAgregar={() => handleAgregar(resultado)}
            handleQuitar={() => handleQuitar(resultado.id)}
          />
        ))}
      </ul>
    </div>
  );
}
