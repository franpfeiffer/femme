import './index.css';
import './normalize.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Navbar } from './NavBar/Navbar'
import { Index } from './Index'
import { Footer } from './Footer/Footer'


function App() {
  return (
    <>
      <div>
      <Navbar />
      <Index />
      <Footer />
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
        </Routes>
      </Router>
    </div>
    </>
  )
}

export default App
