// src/App.tsx
import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SnippetDetail from "./pages/SnippetDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import AppNavbar from "./components/NavBar";
import About from "./components/About";
import Footer from "./components/Footer";
import './App.css';
import { ThemeProvider } from "./context/ThemeContext";
import ProtectedRoute from "./components/ProtectedRoutes";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppNavbar />
        <Container className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/snippets/:id" element={<ProtectedRoute><SnippetDetail /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          </Routes>
        </Container>
        <About />
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
