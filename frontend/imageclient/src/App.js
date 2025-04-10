import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AmazingBackground from "./components/AmazingBackground";
import DeepGenFooter from "./components/Footer";
function App() {
  return (
    <div className="bg-gray-900 min-h-screen">
      <div style={{ position: "relative", zIndex: 0 }}>
        <AmazingBackground
          colors={["#FF66B2", "#FFB347", "#87CEEB"]}
          speed={0.3}
        />
      </div>

      <Navbar />
      <Home />
      <DeepGenFooter />
    </div>
  );
}

export default App;
