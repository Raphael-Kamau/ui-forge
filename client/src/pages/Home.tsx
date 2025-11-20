// src/pages/Home.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Form, Container, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import SnippetCard from "../components/SnippetCard";
import type { Snippet } from "../types/snippet";
import "./Home.css";

const Home: React.FC = () => {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [q, setQ] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [techFilter, setTechFilter] = useState("all");

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/snippets`, {
          params: {
            q,
            category: categoryFilter,
            framework: techFilter,
          },
        });
        const data = res.data;
        setSnippets(Array.isArray(data) ? data : []);
      } catch {
        setSnippets([]);
      }
    };
    fetchSnippets();
  }, [q, categoryFilter, techFilter]);

  return (
    <>
      {/* Hero Section */}
      <div className="hero-section text-white text-center d-flex align-items-center justify-content-center">
        <div className="hero-content">
          <h1 className="display-4 fw-bold">Build Faster with UI Forge</h1>
          <p className="lead">
            A developer's toolbox for reusable, production-ready UI components.
          </p>
          <Form className="mt-4">
            <Form.Control
              placeholder="Search snippets..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="search-bar"
            />
          </Form>
          <Button variant="primary" size="lg" className="mt-3">
            <Link to="/register" className="text-white text-decoration-none">
              Get Started
            </Link>
          </Button>
        </div>
      </div>

      {/* Popular Components with Filters */}
      <Container className="my-5">
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-3">
          <h3 className="mb-0">Popular Components</h3>
          <div className="d-flex gap-3">
            {/* Category Dropdown */}
            <Form.Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={{ maxWidth: "200px" }}
            >
              <option value="all">All Categories</option>
              <option value="navbar">Navbar</option>
              <option value="hero">Hero</option>
              <option value="grid">Grid</option>
              <option value="form">Form</option>
              <option value="card">Card</option>
            </Form.Select>

            {/* Technology Dropdown */}
            <Form.Select
              value={techFilter}
              onChange={(e) => setTechFilter(e.target.value)}
              style={{ maxWidth: "200px" }}
            >
              <option value="all">All Technologies</option>
              <option value="bootstrap">Bootstrap</option>
              <option value="tailwind">Tailwind</option>
              <option value="tsx">React/TSX</option>
              <option value="jsx">React/JSX</option>
              <option value="vue">Vue</option>
            </Form.Select>
          </div>
        </div>

        <Row xs={1} md={2} lg={4} className="g-4">
          {snippets.slice(0, 8).map((s) => (
            <Col key={s._id}>
              <SnippetCard snippet={s} />
            </Col>
          ))}
        </Row>
      </Container>

      {/* Browse All Components */}
      <Container className="my-5">
        <h3 className="mb-4 text-center">Browse All Components</h3>
        <Row xs={1} md={2} lg={3} className="g-3">
          {snippets.map((s) => (
            <Col key={s._id}>
              <SnippetCard snippet={s} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Home;
