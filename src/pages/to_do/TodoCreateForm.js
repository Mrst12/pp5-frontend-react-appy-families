import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import styles from "../../styles/TodoCreateEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { Alert } from "react-bootstrap";


function TodoCreateForm() {

  const [errors, setErrors] = useState({});

  const [todoData, setTodoData] = useState({
    task_title: "",
    due_date: "",
    content: "",
    status: "",
  });
  const { task_title, due_date, content, status } = todoData;

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

  return (
    <Container className={styles.Container}>
      <br />
      <h2>Create a Task</h2>
      <br />
      <Form onSubmit={handleSubmit}>
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
        <Form.Group as={Col}>
          <Form.Label>Status:</Form.Label>
          <Form.Control
            as="select"
            defaultValue="Choose ..."
            name="status_choices"
            handleChange={handleChange}
            aria-label="status"
          >
            <option value="pending">Pending</option>
            <option value="started">Started</option>
            <option value="done">Done</option>
          </Form.Control>
        </Form.Group>
        {errors?.status_choices?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <br />
        <div className="text-center">
          <Button
            className={btnStyles.Button}
            onClick={() => history.goBack()}
          >
            cancel
          </Button>
          <Button className={btnStyles.Button} type="submit">
            create
          </Button>
        </div>
      </Form>
      <br />
    </Container>
  );
}

export default TodoCreateForm;