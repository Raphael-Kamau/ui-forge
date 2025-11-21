import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

const Profile: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <Container className="py-5">
        <Card className="shadow-sm">
          <Card.Body>
            <Card.Title>Profile</Card.Title>
            <Card.Text>You are not logged in.</Card.Text>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Card className="shadow-sm border-0">
        <Card.Body>
          <Card.Title className="fw-bold mb-3">Profile</Card.Title>
          <Card.Text><strong>Name:</strong> {user.name}</Card.Text>
          <Card.Text><strong>Email:</strong> {user.email}</Card.Text>
          <Card.Text><strong>User ID:</strong> {user.id}</Card.Text>
          <Button variant="outline-danger" onClick={logout}>
            <i className="bi bi-box-arrow-right me-2"></i> Logout
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;
