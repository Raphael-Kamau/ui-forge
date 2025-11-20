import axios from "axios";
import { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast({ body: "Please enter email and password", bg: "warning" });
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/register", { name, email, password });
      setUser(res.data.user);
      showToast({ body: "Registered & logged in", bg: "success" });
      navigate("/");
    } catch (err) {
      showToast({ body: "Registration failed", bg: "danger" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Register</Card.Title>
        <Form onSubmit={submit}>
          <Form.Group className="mb-2">
            <Form.Label>Name</Form.Label>
            <Form.Control value={name} onChange={e => setName(e.target.value)} disabled={loading} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Email</Form.Label>
            <Form.Control value={email} onChange={e => setEmail(e.target.value)} disabled={loading} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} disabled={loading} />
          </Form.Group>
          <div className="d-flex gap-2">
            <Button type="submit" className="me-2" disabled={loading}>{loading ? 'Registering...' : 'Register'}</Button>
            <Button href="/api/auth/google" variant="outline-primary" className="me-2">Continue with Google</Button>
            <Button href="/api/auth/github" variant="outline-dark">Continue with GitHub</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Register;
