// src/components/SnippetCard.tsx
import React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
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
      showToast({ body: "Code copied", bg: "success" });
    } catch (err) {
      showToast({ body: "Copy failed", bg: "danger" });
    }
  };

  return (
    <Card className="h-100 shadow-sm">
      <div style={{ height: 140, background: "#f8f9fa" }} className="d-flex align-items-center justify-content-center">
        <code className="text-muted">{snippet.framework || "component"}</code>
      </div>
      <Card.Body>
        <Card.Title className="mb-1">{snippet.title}</Card.Title>
        <Card.Subtitle className="text-muted mb-2">{snippet.category}</Card.Subtitle>
        <div className="mb-2">
          {snippet.framework && <Badge bg="secondary" className="me-1">{snippet.framework}</Badge>}
          {(snippet.tags || []).slice(0,3).map(t => (
            <Badge bg="light" text="dark" key={t} className="me-1">{t}</Badge>
          ))}
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <Button as={Link as any} to={`/snippets/${snippet._id}`} variant="primary">Preview</Button>
          <div className="d-flex gap-2">
            <Button variant="outline-secondary" size="sm" onClick={copyCode}>Copy</Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SnippetCard;
