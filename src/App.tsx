import React from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import NavigationBar from "./components/Navbar";
import Hero from "./components/Hero";


const App: React.FC = () => {
  return (
      <div className="App">
        <NavigationBar />
        <div className="hero">
              <Hero />  
          </div>
        </div>
    );
};

export default App;