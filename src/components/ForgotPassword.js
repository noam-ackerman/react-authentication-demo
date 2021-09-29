import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions!");
    } catch {
      setError("Failed to reset password!");
    }

    setLoading(false);
  }

  return (
    <div>
      <Card className="bg-dark">
        <Card.Body>
          <h2 className="text-center mt-2 mb-3" style={{ color: "#31D2F2" }}>
            Password Reset
          </h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" className="mt-3">
              <Form.Label style={{ color: "white" }}>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Button
              disabled={loading}
              type="submit"
              className="w-100 mt-4 mb-3"
              variant="info"
              style={{ color: "white" }}
            >
              Reset Password
            </Button>
          </Form>
          <div className="w-100 text-center mt-2">
            <Link to="/login" style={{ color: "white" }}>
              Log in
            </Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account?{" "}
        <Link to="/signup" style={{ color: "white" }}>
          Sign up
        </Link>
      </div>
    </div>
  );
}
