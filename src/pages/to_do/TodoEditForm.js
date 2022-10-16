import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import styles from "../../styles/TodoCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { Alert } from "react-bootstrap";


function TodoEditForm() {

  const [errors, setErrors] = useState({});

  const [todoData, setTodoData] = useState({
    task_title: "",
    due_date: "",
    content: "",
    status: "",
    urgent: "",
  });
  const { task_title, due_date, content, status, urgent } = todoData;

  const history = useHistory();

  const handleChange = (event) => {
    setTodoData({
      ...todoData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append('task_title', task_title)
    formData.append('due_date', due_date)
    formData.append('content', content)
    formData.append('status', status)
    formData.append('urgent', urgent)

    try {
      const { data } = await axiosReq.post('/to_do/', formData);
      history.push(`/to_do/${data.id}`)
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data)
      }
    }
  }

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
      {errors?.task_title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
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
      {errors?.due_date?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
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
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
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
      {errors?.status?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
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
      {errors?.urgent?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}



      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        create
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default TodoEditForm;