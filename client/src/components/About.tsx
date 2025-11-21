import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useTheme } from "../context/ThemeContext";

const impactAreas = [
  { title: "Education (SDG 4)", text: "Accessible snippets and guides for learners and educators." },
  { title: "Innovation (SDG 9)", text: "Modular, scalable design patterns for web and IoT systems." },
  { title: "Economic Growth (SDG 8)", text: "Faster prototyping for startups and small teams." },
  { title: "Sustainable Communities (SDG 11)", text: "Tools that support automation and local resilience." },
  { title: "Partnerships (SDG 17)", text: "Open-source collaboration and shared libraries." },
];

const About: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Container className="py-5" data-bs-theme={theme}>
      <Row className="mb-4">
        <Col>
          <h1 className="fw-bold">About UI Forge</h1>
          <hr />
          <p className="text-body-secondary">
            Empowering developers with reusable UI snippets, scalable design patterns, and sustainable innovation.
          </p>
        </Col>
      </Row>

      <Row className="g-4">
        <Col md={6}>
          <Card className="shadow-sm h-100 bg-body text-body">
            <Card.Body>
              <Card.Title className="fw-semibold">Our Mission</Card.Title>
              <Card.Text className="text-body-secondary">
                UI Forge democratizes access to design and code resources, reduces onboarding friction,
                and fosters collaboration across teams and communities. We contribute to quality education, innovation, and sustainable growth.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="shadow-sm h-100 bg-body text-body">
            <Card.Body>
              <Card.Title className="fw-semibold">Impact Areas</Card.Title>
              <ul className="mb-0">
                {impactAreas.map((area, idx) => (
                  <li key={idx}>
                    <strong>{area.title}:</strong> {area.text}
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <Card className="shadow-sm bg-body text-body">
            <Card.Body>
              <Card.Title className="fw-semibold">Built With</Card.Title>
              <Card.Text className="text-body-secondary">
                React, Vite, TypeScript, Bootstrap, Node.js, Express, MongoDB — modern technologies powering
                a platform that is lightweight, scalable, and community-driven.
              </Card.Text>
              <LinkContainer to="/snippets">
                <Button variant="primary">Explore Snippets</Button>
              </LinkContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
