import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import styles from "../../styles/TodoCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

function TodoCreateForm() {

  const [errors, setErrors] = useState({});

  const [todoData, setTodoData] = useState({
    task_title: "",
    due_date: "",
    content: "",
    status: "",
    urgent:"",
  });
  const { task_title, due_date, content, status, urgent } = todoData;

  const handleChange = (event) => {
    setTodoData({
      ...todoData,
      [event.target.name]: event.target.value,
    });
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Task Title:</Form.Label>
        <Form.Control
          type="text"
          name="task_title"
          value={task_title}
          onChange={handleChange}
          aria-label="task title"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Due date:</Form.Label>
        <Form.Control
          type="date"
          name="due_date"
          value={due_date}
          onChange={handleChange}
          aria-label="due date"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Task:</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="content"
          value={content}
          onChange={handleChange}
          aria-label="content"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>pending:</Form.Label>
          <Form.Control
            type="checkbox"
            name="status"
            value={status}
            handleChange={handleChange}
            aria-label="status"
          />
        
        <Form.Label>started:</Form.Label>
          <Form.Control
            type="checkbox"
            name="status"
            value={status}
            handleChange={handleChange}
            aria-label="status"
          />
        
        <Form.Label>done:</Form.Label>
          <Form.Control
            type="checkbox"
            name="status"
            value={status}
            handleChange={handleChange}
            aria-label="status"
          />
        
      </Form.Group>
      <Form.Group>
        <Form.Label>Urgent</Form.Label>
        <Form.Control
          type="checkbox"
          name="urgent"
          value={urgent}
          handleChange={handleChange}
          aria-label="is it urgent"
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
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default TodoCreateForm;