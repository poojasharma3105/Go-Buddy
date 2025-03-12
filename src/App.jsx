import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateTrip from './pages/CreateTrip';
import Header from './components/Header';
import Hero from './components/Hero';
import { Toaster } from 'sonner';
import ViewTrip from './pages/ViewTrip';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className='App'>
        <Header />
        <Toaster />
        <Routes>
          <Route path="/" element={
            <>
              <section>
                <Hero />
              </section>
            </>
          }
          />
          <Route path="/create-trip" element={<CreateTrip />} />
          <Route path='/trip/:tripId' element={<ViewTrip/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
