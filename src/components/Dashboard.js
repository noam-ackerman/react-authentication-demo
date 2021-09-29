import React, { useState } from "react";
import { Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function HandleLogout() {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out!");
    }
  }

  return (
    <div>
      <Card className="bg-dark">
        <Card.Body>
          <h2 className="text-center mt-2 mb-3" style={{ color: "#31D2F2" }}>
            Profile
          </h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <div style={{ color: "white" }}>
            <strong>Email:</strong> {currentUser.email}
          </div>
          <Link
            to="/update-profile"
            className="btn btn-info w-100 mt-3 mb-2"
            style={{ color: "white" }}
          >
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-1">
        <Button
          variant="link"
          style={{ color: "white" }}
          onClick={HandleLogout}
        >
          Log out
        </Button>
      </div>
    </div>
  );
}
