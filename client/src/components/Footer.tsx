import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useState } from "react";
import { sendSupportMessage } from "../services/supportApi";
import { LinkContainer } from "react-router-bootstrap";

const Footer: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<string | null>(null);
  const [variant, setVariant] = useState<"success" | "danger">("success");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendSupportMessage(formData);
      setStatus("Message sent successfully ✅");
      setVariant("success");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus("Failed to send message ❌. Please try again later.");
      setVariant("danger");
    }
  };

  return (
    <footer className="bg-dark text-white pt-5 pb-3 mt-5">
      <Container>
        <Row className="mb-4">
          {/* About Section */}
          <Col md={4}>
            <h5 className="fw-bold">UI Forge</h5>
            <p className="small text-white-50">
              A developer's toolbox of reusable, production-ready UI components.
              Browse, preview, and copy snippets to accelerate your projects.
            </p>
            <p className="small">&copy; {new Date().getFullYear()} UI Forge. All rights reserved.</p>
          </Col>

          {/* Quick Links with LinkContainer */}
          <Col md={2}>
            <h6 className="fw-semibold">Quick Links</h6>
            <ul className="list-unstyled small">
              <li>
                <LinkContainer to="/">
                  <Button variant="link" className="text-white-50 p-0">Home</Button>
                </LinkContainer>
              </li>
              <li>
                <LinkContainer to="/about">
                  <Button variant="link" className="text-white-50 p-0">About</Button>
                </LinkContainer>
              </li>
              <li>
                <LinkContainer to="/snippets">
                  <Button variant="link" className="text-white-50 p-0">Snippets</Button>
                </LinkContainer>
              </li>
              <li>
                <LinkContainer to="/support">
                  <Button variant="link" className="text-white-50 p-0">Support</Button>
                </LinkContainer>
              </li>
            </ul>
          </Col>

          {/* Social Links */}
          <Col md={2}>
            <h6 className="fw-semibold">Connect</h6>
            <div className="d-flex gap-3">
              <a href="https://twitter.com" aria-label="Twitter" className="text-white-50">
                <i className="bi bi-twitter fs-5"></i>
              </a>
              <a href="https://github.com" aria-label="GitHub" className="text-white-50">
                <i className="bi bi-github fs-5"></i>
              </a>
              <a href="https://linkedin.com" aria-label="LinkedIn" className="text-white-50">
                <i className="bi bi-linkedin fs-5"></i>
              </a>
            </div>
          </Col>

          {/* Support Form */}
          <Col md={4}>
            <h6 className="fw-semibold">Enquiry / Support</h6>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-2">
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" size="sm">Submit</Button>
            </Form>
            {status && <Alert variant={variant} className="mt-2 small">{status}</Alert>}
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
