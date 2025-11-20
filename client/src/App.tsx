// src/App.tsx
import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SnippetDetail from "./pages/SnippetDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AppNavbar from "./components/NavBar";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppNavbar />
      <Container className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/snippets/:id" element={<SnippetDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Container>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
