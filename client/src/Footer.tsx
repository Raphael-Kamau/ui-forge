// src/components/Footer.tsx
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-light py-5 mt-5">
      <Container>
        <Row>
          <Col md={3}>
            <h5>UI Forge</h5>
            <p>Build faster with ready-made UI components. Browse, preview, and copy production-ready code snippets.</p>
          </Col>
          <Col md={3}>
            <h6>Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="/categories" className="text-light">Categories</a></li>
              <li><a href="/popular" className="text-light">Popular</a></li>
              <li><a href="/docs" className="text-light">Documentation</a></li>
              <li><a href="/api" className="text-light">API Reference</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h6>Resources</h6>
            <ul className="list-unstyled">
              <li><a href="/blog" className="text-light">Blog</a></li>
              <li><a href="https://github.com" className="text-light">GitHub</a></li>
              <li><a href="/support" className="text-light">Support</a></li>
              <li><a href="/changelog" className="text-light">Changelog</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h6>Stay Updated</h6>
            <Form>
              <Form.Group controlId="formEmail">
                <Form.Control type="email" placeholder="Enter your email" />
              </Form.Group>
              <Button variant="primary" className="mt-2">
                <i className="bi bi-envelope"></i> Subscribe
              </Button>
            </Form>
          </Col>
        </Row>
        <hr className="border-light" />
        <p className="text-center mb-0">© 2024 UI Forge. Made for developers with ❤️</p>
      </Container>
    </footer>
  );
};

export default Footer;
