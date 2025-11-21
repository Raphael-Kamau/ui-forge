// src/pages/Home.tsx
import { useEffect, useState } from "react";
import { Row, Col, Form, Container, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import SnippetCard from "../components/SnippetCard";
import { fetchSnippets } from "../services/snippetApi";
import type { Snippet } from "../types/snippet";
import "./Home.css";

const Home: React.FC = () => {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [q, setQ] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [techFilter, setTechFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Debounced fetch
  useEffect(() => {
    const timeout = setTimeout(() => {
      loadSnippets();
    }, 300);
    return () => clearTimeout(timeout);
  }, [q, categoryFilter, techFilter]);

  const loadSnippets = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchSnippets({
        q,
        category: categoryFilter,
        framework: techFilter,
      });
      setSnippets(Array.isArray(data) ? data : []);
    } catch {
      setError("Failed to load snippets");
      setSnippets([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div className="hero-section text-white text-center d-flex align-items-center justify-content-center fade-in-up">
        <div className="hero-content">
          <h1 className="display-4 fw-bold">Build Faster with UI Forge</h1>
          <p className="lead">
            A developer's toolbox for reusable, production-ready UI components.
          </p>
          <Form className="mt-4" role="search">
            <Form.Control
              aria-label="Search snippets"
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
            <Form.Select
              aria-label="Filter by category"
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

            <Form.Select
              aria-label="Filter by technology"
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

        {loading && <Spinner animation="border" variant="primary" />}
        {error && <p className="text-danger">{error}</p>}

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
        <h3 className="mb-4 text-center">All Components</h3>
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
