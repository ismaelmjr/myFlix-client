import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
  Form,
  Button,
  Card,
  CardGroup,
  Container,
  Col,
  Row,
  Navbar,
  Nav,
} from "react-bootstrap";

import "./registration-view.scss";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleRegistration = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    axios
      .post("https://topimdbmovies.herokuapp.com/users", {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday,
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        window.open("/", "_self"); // the second argument '_self' is necessary so that the page will open in the current tab
      })
      .catch((e) => {
        console.log("error registering the user");
      });
  };

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <CardGroup>
              <Card>
                <Card.Body>
                  <Card.Title>Please Register:</Card.Title>
                  <Form>
                    <Form.Group>
                      <Form.Label>Username:</Form.Label>
                      <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Password:</Form.Label>
                      <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Email:</Form.Label>
                      <Form.Control
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Birthday:</Form.Label>
                      <Form.Control
                        type="text"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        placeholder="mm/dd/yyyy"
                      />
                    </Form.Group>
                    <Button
                      style={{ marginTop: "20px" }}
                      type="submit"
                      onClick={handleRegistration}
                    >
                      Register
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
  }),
  onRegistration: PropTypes.func.isRequired,
};
