import React from 'react';
import NavigationBar from './Navbar';
import { Container } from 'react-bootstrap';
import '../App.css';

const Hero: React.FC = () => {
  return (
    <header className="hero-section">
      <NavigationBar />
      <Container className="hero-content text-center text-white d-flex flex-column justify-content-center align-items-center">
        <h1 className="display-4 fw-bold">Welcome to UIForge</h1>
        <p className="lead">Build beautiful interfaces faster with modular templates and curated palettes</p>
        <a href="#get-started" className="btn btn-warning mt-3">Get Started</a>
      </Container>
    </header>
  );
};

export default Hero;
