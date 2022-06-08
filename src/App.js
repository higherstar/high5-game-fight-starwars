import React from "react";
import { BrowserRouter as Router, Route, Routes as R } from "react-router-dom";

import BookTrip from "./screens/BookTrip";
import BookDetail from "./screens/BookTrip/BookDetail";
import SeatMap from "./screens/BookTrip/SeatMap";

import AppContextProvider from "./context/AppContext";

function App() {
  return (
    <AppContextProvider>
      <Router>
        <R>
          <Route exact path='/' element={<BookTrip />} />
          <Route exact path='/detail' element={<BookDetail />} />
          <Route exact path='/seat-map' element={<SeatMap />} />
        </R>
      </Router>
    </AppContextProvider>
  );
}

export default App;
