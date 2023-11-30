import React from 'react';
import { MyProvider, useMyContext } from './components/MyContext';
import Navbar from './components/Navbar';
import Manager from './components/Manager';
import SignUp from './components/SignUp';
import Filters from './components/Filters';
import Footer from './components/Footer';
import AddRoom from './components/AddRoom';
import Empty from './components/Empty';
import Wallet from './components/Wallet';
import Customer from './components/Customer';
import RoomInfo from './components/RoomInfo';
import Rating from './components/Rating';
import Review from './components/Review';
import Type from './components/RoomType';
import ReadReview from './components/ReadReviews';
import ManagerRoomInfo from './components/ManagerRoomInfo';
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


        {/*userRole === 'customer' && <CustomerPage />*/}
        <Routes>
          <Route exact path="/" element={<Empty />}  />
          <Route path="/add-room" element={<AddRoom />} />
          <Route path = "/signup" element={<SignUp/>}/>
          <Route path= "/manager" element={<Manager/>} />
          <Route path= "/customer" element={<Customer/>} />
          <Route path= "/wallet" element={<Wallet/>} />
          <Route path= "/rating" element={<Rating/>} />
          <Route path= "/review" element={<Review/>} />
          <Route path= "/get-room-type/:type" element={<Type/>} />
          <Route path="/api/get-single-room/:id" element={<RoomInfo/>} />
          <Route path="/readReviews" element={<ReadReview/>} />
          <Route path="/api/get-single-room-manager/:id" element={<ManagerRoomInfo/>} />
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
