import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match!");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to create an account!");
    }

    setLoading(false);
  }

  return (
    <div>
      <Card className="bg-dark">
        <Card.Body>
          <h2 className="text-center mt-2 mb-3" style={{ color: "#31D2F2" }}>
            Sign Up
          </h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" className="mt-3">
              <Form.Label style={{ color: "white" }}>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password" className="mt-3">
              <Form.Label style={{ color: "white" }}>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm" className="mt-3 mb-1">
              <Form.Label style={{ color: "white" }}>
                Password Confirmation
              </Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button
              disabled={loading}
              type="submit"
              className="w-100 mt-4 mb-3"
              variant="info"
              style={{ color: "white" }}
            >
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account?{" "}
        <Link to="/login" style={{ color: "white" }}>
          Log in
        </Link>
      </div>
    </div>
  );
}
