import './index.css';
import './normalize.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Navbar } from './NavBar/Navbar'
import { Index } from './Index'
import { Footer } from './Footer/Footer'
import { Comprascreen } from './CompraScreen/Comprascreen';
import { Carritoscreen } from './CarritoScreen/Carritoscreen';
import { ProductosProvider } from './context/ProductosProvider';
import { CarritoProvider } from './context/CarritoProvider';
import { AdminLog } from './Admin/AdminLog';
import { AdminPanel } from './Admin/AdminPanel';
import { CreateProduct } from './Admin/CreateProduct';
import { CrearStock } from './Admin/CrearStock';
import { SearchPage } from './SearchFetch/SearchPage';
import { DetalleProducto } from './DetalleProducto/DetalleProducto';
import { EditProduct } from './Admin/EditProduct';
import { CreateCat } from './Admin/CreateCat';
import { CreateMarca } from './Admin/CreateMarca';
import { CreateTalles } from './Admin/CreateTalles';
import { CreateColores } from './Admin/CreateColores';

function App() {
  return (

    <>

      <ProductosProvider >
        <CarritoProvider>
          <Navbar />
          <Routes>
            <Route element={< Index />} path='/' />
            <Route element={< Comprascreen />} path='/productos' />
            <Route element={< Carritoscreen />} path='/carrito' />
            <Route element={< SearchPage />} path='/busqueda' />
            <Route element={< DetalleProducto />} path='/:id/detalles-del-producto' />


            <Route element={< AdminLog />} path='/Admin' />
            <Route element={< AdminPanel />} path='/adminPanel' />
            <Route element={< CreateProduct />} path='/create' />
            <Route element={< CrearStock />} path='/create/:id' />
            <Route element={< EditProduct />} path='/:id/editar' />
            <Route element={< CreateCat />} path='/crearcategoria' />
            <Route element={< CreateMarca />} path='/crearmarca' />
            <Route element={< CreateTalles />} path='/creartalles' />
            <Route element={< CreateColores />} path='/crearcolores' />





            <Route path='/*' element={<Navigate to='/' />} />
          </Routes>

          {/* <Footer /> */}
        </CarritoProvider>
      </ProductosProvider>



    </>
  )
}

export default App
