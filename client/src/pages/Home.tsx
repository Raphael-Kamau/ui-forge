// src/pages/Home.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Form, Container } from "react-bootstrap";
import SnippetCard from "../components/SnippetCard";
import Footer from "../Footer";
import type { Snippet } from "../types/snippet";
import "./Home.css";

const Home: React.FC = () => {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [q, setQ] = useState("");
  const [componentFilter, setComponentFilter] = useState("");
  const [frameworkFilter, setFrameworkFilter] = useState("");
  const [styleFilter, setStyleFilter] = useState("");

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const res = await axios.get<any>(
          `/api/snippets?q=${encodeURIComponent(q)}&component=${componentFilter}&framework=${frameworkFilter}&style=${styleFilter}`
        );
        const data = res.data;
        if (Array.isArray(data)) {
          setSnippets(data);
        } else if (data && Array.isArray(data.snippets)) {
          setSnippets(data.snippets);
        } else {
          setSnippets([]);
        }
      } catch (err) {
        setSnippets([]);
      }
    };

    fetchSnippets();
  }, [q, componentFilter, frameworkFilter, styleFilter]);

  return (
    <>
      {/* Hero Section */}
      <div className="hero-section text-white text-center d-flex align-items-center justify-content-center">
        <div className="hero-content">
          <h1 className="display-4 fw-bold">Build Faster with UI Forge</h1>
          <p className="lead">Browse, preview, and copy production-ready code snippets for your next project.</p>
          <Form className="mt-4">
            <Form.Control
              placeholder="Search snippets..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="search-bar"
            />
          </Form>
        </div>
      </div>

      {/* Filters */}
      <Container className="my-4">
        <Row className="mb-3">
          <Col md={4}>
            <Form.Select value={componentFilter} onChange={(e) => setComponentFilter(e.target.value)}>
              <option value="">All Components</option>
              <option value="navbar">Navbar</option>
              <option value="hero">Hero</option>
              <option value="form">Form</option>
              <option value="menu">Menu</option>
              <option value="grid">Grid Section</option>
            </Form.Select>
          </Col>
          <Col md={4}>
            <Form.Select value={frameworkFilter} onChange={(e) => setFrameworkFilter(e.target.value)}>
              <option value="">All Frameworks</option>
              <option value="react">React</option>
              <option value="vue">Vue</option>
              <option value="angular">Angular</option>
            </Form.Select>
          </Col>
          <Col md={4}>
            <Form.Select value={styleFilter} onChange={(e) => setStyleFilter(e.target.value)}>
              <option value="">All Styling</option>
              <option value="bootstrap">Bootstrap</option>
              <option value="tailwind">Tailwind</option>
              <option value="material">Material UI</option>
            </Form.Select>
          </Col>
        </Row>

        {/* Snippet Cards */}
        <Row xs={1} md={2} lg={3} className="g-3">
          {snippets.map((s) => (
            <Col key={s._id}>
              <SnippetCard snippet={s} />
            </Col>
          ))}
        </Row>
      </Container>

      <Footer />
    </>
  );
};

export default Home;
