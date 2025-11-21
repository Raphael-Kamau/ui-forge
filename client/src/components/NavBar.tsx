import { Container, Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const AuthMenu: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <>
        <LinkContainer to="/login">
          <Nav.Link><i className="bi bi-box-arrow-in-right me-1"></i>Login</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/register">
          <Nav.Link><i className="bi bi-person-plus me-1"></i>SignUp</Nav.Link>
        </LinkContainer>
      </>
    );
  }

  return (
    <NavDropdown
      title={<span><i className="bi bi-person-circle me-2"></i>{user.name || user.email || "Account"}</span>}
      id="auth-dropdown"
      align="end"
    >
      <LinkContainer to="/profile">
        <NavDropdown.Item><i className="bi bi-gear me-2"></i>Profile</NavDropdown.Item>
      </LinkContainer>
      <NavDropdown.Divider />
      <NavDropdown.Item onClick={() => logout()}>
        <i className="bi bi-box-arrow-right me-2"></i>Logout
      </NavDropdown.Item>
    </NavDropdown>
  );
};

const AppNavbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const gradient = theme === "light"
    ? "linear-gradient(90deg, #0d6efd, #6610f2)"
    : "linear-gradient(90deg, #212529, #343a40)";

  return (
    <Navbar expand="lg" sticky="top" className="mb-4 shadow-sm" data-bs-theme={theme} style={{ background: gradient }}>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="d-flex align-items-center fw-bold text-white">
            <img
              src="./logo.png"
              alt="UI Forge Logo"
              loading="lazy"
              style={{
                width: "35px",
                height: "35px",
                marginRight: "10px",
                borderRadius: "50%",
                transition: "transform 0.3s, box-shadow 0.3s"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.1)";
                e.currentTarget.style.boxShadow = "0 0 10px rgba(255,255,255,0.6)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
            UI Forge
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="main-nav" className="border-0" />
        <Navbar.Collapse id="main-nav">
          <Nav className="mx-auto">
            <LinkContainer to="/snippets"><Nav.Link className="text-white">Forge</Nav.Link></LinkContainer>
            <LinkContainer to="/about"><Nav.Link className="text-white">About</Nav.Link></LinkContainer>
            <LinkContainer to="/snippets"><Nav.Link className="text-white">Snippets</Nav.Link></LinkContainer>
            <LinkContainer to="/support"><Nav.Link className="text-white">Support</Nav.Link></LinkContainer>
          </Nav>

          <Nav className="align-items-center">
          <Button
            variant={theme === "light" ? "outline-light" : "outline-secondary"}
            size="sm"
            onClick={toggleTheme}
            className="me-2 rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: "36px", height: "36px" }}
            aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
            title={theme === "light" ? "Dark Mode" : "Light Mode"}
          >
            <i
              className={`bi ${theme === "light" ? "bi-moon-fill" : "bi-sun-fill"} fs-5`}
              style={{
                transition: "transform 0.3s ease-in-out",
                transform: theme === "light" ? "rotate(0deg)" : "rotate(180deg)",
                color: theme === "light" ? "#212529" : "#f8f9fa"
              }}
            />
          </Button>

            <AuthMenu />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
