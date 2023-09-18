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


            <Route element={< AdminLog />} path='/Admin' />
            <Route element={< AdminPanel />} path='/adminPanel' />



            <Route path='/*' element={<Navigate to='/' />} />
          </Routes>

          <Footer />
        </CarritoProvider>
      </ProductosProvider>



    </>
  )
}

export default App
