// src/components/Footer.tsx
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

const Footer: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/support`, formData);
      setStatus("Message sent successfully");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("Failed to send message. Please try again later.");
    }
  };

  return (
    <footer className="bg-dark text-white py-5 mt-5">
      <Container>
        <Row>
          <Col md={6} className="mb-4">
            <h5>About UI Forge</h5>
            <p className="small text-muted">
              UI Forge is a developer's toolbox of reusable, production-ready UI components.
              Browse, preview, and copy snippets to accelerate your projects.
            </p>
            <p className="small">&copy; {new Date().getFullYear()} UI Forge. All rights reserved.</p>
          </Col>

          <Col md={6}>
            <h5>Enquiry / Support Form</h5>
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                  />
                </Col>
                <Col md={6}>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    required
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    required
                  />
                </Col>
              </Row>
              <Button variant="primary" type="submit">Submit</Button>
            </Form>
            {status && <p className="mt-2 small">{status}</p>}
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
