export const Index = () => {
    // Aca fetcheamos la api
    const productos = [
      { name: 'Product 1', imageUrl: 'mesi.jpg', label: 'nashe' },
      { name: 'Product 2', imageUrl: 'mesi.jpg', label: 'nashe' },
      { name: 'Product 3', imageUrl: 'mesi.jpg', label: 'nashe' },
      // Agregar mas productos aca
    ];
  
    return (
      <div>
        <div className="banner">
        <p>Banner</p>
      </div>
        <h3 className="tituloProductos">Productos Destacados</h3>
        <div className="productos">
          {productos.map((product, index) => (
            <div key={index}>
              <img src={product.imageUrl} alt={product.name} />
              <p>{product.name}</p>
              <p>{product.label}</p>
            </div>
          ))}
        </div>
        <h3 className="tituloProductos">Nuevos Productos</h3>
        <div className="productos">
          {productos.map((product, index) => (
            <div key={index}>
              <img src={product.imageUrl} alt={product.name} />
              <p>{product.name}</p>
              <p>{product.label}</p>
            </div>
          ))}
        </div>
        <h3 className="tituloProductos">OFERTAS</h3>
        <div className="productos">
          {productos.map((product, index) => (
            <div key={index}>
              <img src={product.imageUrl} alt={product.name} />
              <p>{product.name}</p>
              <p>{product.label}</p>
            </div>
          ))}
        
        </div>
        <div className="line"></div>
          <div className="dataContainer">
            <div className="data">
              <i className="fa-solid fa-truck"></i>
              <h3>ENVIAMOS TU COMPRA</h3>
              <p>Entregas a todo el pais</p>
            </div>
            <div className="data">
              <i className="fa-solid fa-credit-card"></i>
              <h3>PAGA COMO QUIERAS</h3>
              <p>Tarjeta de credito o efectivo</p>
            </div>
            <div className="data">
              <i className="fa-solid fa-lock"></i>
              <h3>COMPRA CON SEGURIDAD</h3>
              <p>Tus datos siempre protegidos</p>
          </div>
        </div>
      </div>
    );
  }