// src/components/NavBar.tsx
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthMenu: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <>
        <Nav.Link as={Link} to="/login">Login</Nav.Link>
        <Nav.Link as={Link} to="/register">SignUp</Nav.Link>
      </>
    );
  }

  return (
    <NavDropdown title={user.name || user.email || "Account"} id="auth-dropdown">
      <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item onClick={() => logout()}>Logout</NavDropdown.Item>
    </NavDropdown>
  );
};

const AppNavbar: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img src="./logo.png" alt="UI Forge Logo" loading="lazy" 
            style={{ width: "30px", height: "30px", marginRight: "10px" }}
          />
          <span className="fw-bold">UI Forge</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/">Browse</Nav.Link>
          </Nav>
          <Nav>
            <AuthMenu />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
