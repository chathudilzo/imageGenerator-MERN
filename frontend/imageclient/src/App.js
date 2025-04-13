import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AiVideo from "./pages/AiVideo";
import AmazingBackground from "./components/AmazingBackground";
import DeepGenFooter from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="bg-gray-900 min-h-screen">
        <div style={{ position: "relative", zIndex: 0 }}>
          {/* <AmazingBackground
            colors={["#FF66B2", "#FFB347", "#87CEEB"]}
            speed={0.3}
          /> */}
        </div>

        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/video" element={<AiVideo />}></Route>
        </Routes>
        <DeepGenFooter />
      </div>
    </Router>
  );
}

export default App;
