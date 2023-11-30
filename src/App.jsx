import './normalize.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Navbar1 } from './NavBar/Navbar'
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
import { EditStock } from './Admin/EditStock';
import { FacturacionPage } from './Admin/Facturacion/FacturacionPage';
import { CompradorAdd } from './Admin/Facturacion/CompradorAdd';
import { FacturacionManual } from './Admin/Facturacion/FacturacionManual';
import { Estadisticas } from './Admin/Estadisticas/Estadisticas';
import { RegisterAdmin } from './Admin/RegisterAdmin/RegisterAdmin';
import { CompraScreenCate } from './CompraScreen/CompraScreenCate';
import './index.css';



function App() {
  return (

    <>

      <ProductosProvider >
        <CarritoProvider>
       
          <Navbar1 />
          <Routes>
           
            <Route element={< Index />} path='/' />
            <Route element={< Comprascreen />} path='/productos' />
            <Route element={< CompraScreenCate />} path='/productos/:categoria' />

            <Route element={< Carritoscreen />} path='/carrito' />
            <Route element={< SearchPage />} path='/busqueda' />
            <Route element={< DetalleProducto />} path='/:id/detalles-del-producto' className="main-content" />


            <Route element={< AdminLog />} path='/Admin' />
            <Route element={< AdminPanel />} path='/adminPanel' />
            <Route element={< CreateProduct />} path='/create' />
            <Route element={< CrearStock />} path='/create/:id' />
            <Route element={< EditProduct />} path='/:id/editar' />
            <Route element={< CreateCat />} path='/crearcategoria' />
            <Route element={< CreateMarca />} path='/crearmarca' />
            <Route element={< CreateTalles />} path='/creartalles' />
            <Route element={< CreateColores />} path='/crearcolores' />
            <Route element={< EditStock />} path='/editStock' />
            <Route element={< FacturacionPage />} path='/facturacionPage' />
            <Route element={< CompradorAdd />} path='/compradorAdd' />
            <Route element={< FacturacionManual />} path='/createFactura/:id' />
            <Route element={< Estadisticas />} path='/estadisticas' />
            <Route element={< RegisterAdmin />} path='/registerAdmin' />












            <Route path='/*' element={<Navigate to='/' />} />
          </Routes>

          {/* <Footer /> */}
          
        </CarritoProvider>
      </ProductosProvider>



    </>
  )
}

export default App
