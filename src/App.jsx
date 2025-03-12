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
      <div className="App flex flex-col min-h-screen">
        <Header />
        <Toaster />
        <div className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <section>
                    <Hero />
                  </section>
                </>
              }
            />
            <Route path="/create-trip" element={<CreateTrip />} />
            <Route path="/trip/:tripId" element={<ViewTrip />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}


export default App
