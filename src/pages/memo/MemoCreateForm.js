import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import styles from "../../styles/CreateMemoForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

function MemoCreateForm() {

  const [errors, setErrors] = useState({});

  const [memoData, setMemoData] = useState({
    attention_of: "",
    content: "",
  });
  const {attention_of, content} = memoData;

  const handleChange = (event) => {
    setMemoData({
      ...memoData,
      [event.target.name]: event.target.value,
    });
  };


  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Attention of:</Form.Label>
        <Form.Control
          type="text"
          name="attention_of"
          value={attention_of}
          onChange={handleChange}
          aria-label="attention of"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Content:</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="content"
          value={content}
          onChange={handleChange}
          aria-label="content"
        />
      </Form.Group>


      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => { }}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        create
      </Button>
    </div>
  );

  return (
    <Form>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >

            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default MemoCreateForm;