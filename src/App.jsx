import './index.css';
import './normalize.css';
import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { Navbar } from './NavBar/Navbar'
import { Index } from './Index'
import { Footer } from './Footer/Footer'
import { Productos } from './Productos/Productos'


function App() {
  return (
    <>
      <div>
      <Navbar />
      <Routes>
        <Route element={<Index />} path='/home'/>
        <Route element={< Productos />} path='/productos'/>
      </Routes>
      <Footer />
    </div>
    </>
  )
}

export default App
