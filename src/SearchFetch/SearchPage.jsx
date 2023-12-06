import { useLocation } from 'react-router-dom';
import { Card } from '../Card/Card';
export const SearchPage = () => {
  const location = useLocation();
  const resultados = location.state && location.state.resultados;
  return (
    <div>
      <h2 className="search-title">Resultados de la búsqueda: </h2>
      <div className="search-page">
      
        {resultados.map((resultado) => (
          <Card
            key={resultado.id}
            verMas={resultado.id}
            imagen={resultado.imagene[0]?.url}
            nombre={resultado.nombre}
            descripcion={resultado.descripcion}
            precio={resultado.precio}
          />
        ))}
      
      </div>
    </div>
  );
}
