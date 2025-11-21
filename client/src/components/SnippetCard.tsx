import React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import type { Snippet } from "../types/snippet";
import { useToast } from "../context/ToastContext";

interface Props {
  snippet: Snippet;
}

const SnippetCard: React.FC<Props> = ({ snippet }) => {
  const { showToast } = useToast();

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code || "");
      showToast({ body: "Code copied ✅", bg: "success" });
    } catch {
      showToast({ body: "Copy failed ❌", bg: "danger" });
    }
  };

  const tags = snippet.tags || [];
  const visibleTags = tags.slice(0, 3);
  const extraCount = tags.length > 3 ? tags.length - 3 : 0;

  return (
    <Card className="h-100 shadow-sm border-0" style={{ transition: "transform 0.2s" }}
      onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
      onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}>
      
      {/* Preview area */}
      <div style={{ height: 140, background: "#f8f9fa" }} 
           className="d-flex align-items-center justify-content-center">
        <code className="text-muted">{snippet.framework || "component"}</code>
      </div>

      <Card.Body>
        <Card.Title className="mb-1 fw-semibold">{snippet.title}</Card.Title>
        <Card.Subtitle className="text-muted mb-2">{snippet.category}</Card.Subtitle>

        {/* Badges */}
        <div className="mb-2">
          {snippet.framework && <Badge bg="secondary" className="me-1">{snippet.framework}</Badge>}
          {visibleTags.map(t => (
            <Badge bg="light" text="dark" key={t} className="me-1 shadow-sm">{t}</Badge>
          ))}
          {extraCount > 0 && (
            <Badge bg="info" text="dark" className="me-1">+{extraCount} more</Badge>
          )}
        </div>

        {/* Actions */}
        <div className="d-flex justify-content-between align-items-center">
          <LinkContainer to={`/snippets/${snippet._id}`}>
            <Button variant="primary">Preview</Button>
          </LinkContainer>
          <Button variant="outline-secondary" size="sm" onClick={copyCode}>
            <i className="bi bi-clipboard me-1"></i> Copy
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SnippetCard;
