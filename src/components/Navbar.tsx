import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../index.css'; // For custom styling
import '../App.css';

const NavigationBar: React.FC = () => {
  return (
    <div className="navigation-bar position-absolute top-0 start-0 w-100 z-3">
      <Container fluid>
        <Row className="align-items-center py-3 px-4">
          <Col xs={8} md={6}>
            <nav className="nav-links">
              <ul className="list-inline m-0">
                <li className="list-inline-item"><a href="#home">Home</a></li>
                <li className="list-inline-item"><a href="#get-started">Build</a></li>
                <li className="list-inline-item"><a href="#about">About</a></li>
                <li className="list-inline-item"><a href="#contact">Contact</a></li>
              </ul>
            </nav>
          </Col>
          <Col xs={4} md={6} className="text-end">
            <div className="social-icons">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-instagram"></i></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-twitter-x mx-3"></i></a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-github"></i></a>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NavigationBar;
