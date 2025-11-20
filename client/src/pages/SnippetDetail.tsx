// src/pages/SnippetDetail.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Row, Col, Card } from "react-bootstrap";
import { useToast } from "../context/ToastContext";
import type { Snippet } from "../types/snippet";

const SnippetDetail: React.FC = () => {
  const { id } = useParams();
  const [snippet, setSnippet] = useState<Snippet | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    if (!id) return;
    axios.get<Snippet>(`/api/snippets/${id}`)
      .then(res => setSnippet(res.data))
      .catch(err => {
        console.error("API error:", err);
        showToast({ body: "Failed to load snippet", bg: "danger" });
      });
  }, [id]);

  const copyCode = async () => {
    if (!snippet) return;
    await navigator.clipboard.writeText(snippet.code);
    showToast({ body: "Code copied!", bg: "success" });
  };

  if (!snippet) return <div>Loading...</div>;

  return (
    <Row>
      <Col md={6}>
        <Card className="mb-3">
          <Card.Body>
            <Card.Title>{snippet.title}</Card.Title>
            <Card.Subtitle className="text-muted">{snippet.category}</Card.Subtitle>
            <pre className="mt-3"><code>{snippet.code}</code></pre>
            <Button onClick={copyCode} variant="success">Copy</Button>
          </Card.Body>
        </Card>
      </Col>
      <Col md={6}>
        <Card className="mb-3">
          <Card.Header>Live preview</Card.Header>
          <Card.Body>
            <div dangerouslySetInnerHTML={{ __html: snippet.code }} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default SnippetDetail;
