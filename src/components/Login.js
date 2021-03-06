import React, { useRef, useState } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom"


export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signin, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await signin(emailRef.current.value, passwordRef.current.value);
      history.push("/")
    } catch (err) {
      setError(err.message)
    }
    setLoading(false);
  };
  return (
    <div>
      {currentUser && <div><Alert variant="danger" className="text-center">You are Already Signed In</Alert></div>}
    {!currentUser && <div className="login"><Card>
    <Card.Body>
      <h2 className="text-center mb-4">Sign In</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group id="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" ref={emailRef} required></Form.Control>
        </Form.Group>
        <Form.Group id="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            ref={passwordRef}
            required
          ></Form.Control>
        </Form.Group>

        <Button type="submit" className="w-100 text-center mt-2">
          Log In
        </Button>
      </Form>
      <div className="w-100 text-center mt-3">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
    </Card.Body>
    <div className="w-100 text-center mt-2">
        
      Don't have an account? <Link to="/signup">Sign Up</Link>
    </div>
  </Card></div>}
  </div>
    
  );
}