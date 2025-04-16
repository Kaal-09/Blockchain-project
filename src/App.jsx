import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserContextProvider from "./context/UserContextProvider";
import Home from "./pages/Home";
import About from "./pages/About"; 
import EventsPage from "./pages/Event";

import Tickets from "./pages/Tickets.jsx";
import AOS from 'aos';
import 'aos/dist/aos.css';



function App() {
    
  return (
    <UserContextProvider>
      <Router>
        <div className="App ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/tickets" element={<Tickets />} />
          </Routes>
        </div>
      </Router>
    </UserContextProvider>
  );
}

export default App;
