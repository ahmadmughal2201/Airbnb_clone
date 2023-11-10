import React from 'react';
import { MyProvider, useMyContext } from './components/MyContext';
import Navbar from './components/Navbar';
import Manager from './components/Manager';
import Filters from './components/Filters';
import Footer from './components/Footer';
import AddRoom from './components/AddRoom';
import Empty from './components/Empty';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function AppContent() {
  const { myVariable } = useMyContext();

  return (
    <div className="">
      <Router>

        {/* Navbar */}
        <Navbar />
        <div className="sm:mx-6 md:mx-10 lg:mx-12 px-3 justify-center">
          <Filters />
          {/* Rentals */}
          {/*<Rentals />*/}
        </div>

        {/* Footer */}
        <Footer />
        {myVariable === 'Manager' && <Manager />}


        {/*userRole === 'customer' && <CustomerPage />*/}
        <Routes>

          <Route exact path="/" element={<Empty />}  />
          <Route path="/add-room" element={<AddRoom />} /> {/* Add the route for AddRoom */}
        </Routes>

        {/* Filters */}
        
      </Router>

    </div>

  );
}

function App() {
  return (
    <MyProvider>
      <AppContent />
    </MyProvider>
  );
}

export default App;
