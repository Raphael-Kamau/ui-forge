// src/App.tsx
import { Container, Navbar, Nav } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import SnippetDetail from "./pages/SnippetDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useAuth } from "./context/AuthContext";
import { NavDropdown } from "react-bootstrap";

const AuthMenu: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <>
        <Nav.Link as={Link} to="/login">Login</Nav.Link>
        <Nav.Link as={Link} to="/register">Register</Nav.Link>
      </>
    );
  }

  return (
    <NavDropdown title={user.name || user.email || "Account"} id="auth-dropdown">
      <NavDropdown.Item as={Link} to="/">Profile</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item onClick={() => logout()}>Logout</NavDropdown.Item>
    </NavDropdown>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <span style={{width:28,height:28,background:'#0d6efd',display:'inline-block',borderRadius:6,marginRight:8}} />
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
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/snippets/:id" element={<SnippetDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
