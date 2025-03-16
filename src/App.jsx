import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateTrip from './pages/CreateTrip';
import Header from './components/Header';
import Hero from './components/Hero';
import { Toaster } from 'sonner';
import ViewTrip from './pages/ViewTrip';
import Footer from './components/Footer';
import MyTrip from './pages/MyTrip';

function App() {
  return (
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
          <Route path="/my-trips" element={<MyTrip />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
