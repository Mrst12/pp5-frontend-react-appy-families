import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import styles from "../../styles/TodoCreateEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useHistory, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { Alert } from "react-bootstrap";


function TodoEditForm() {

    const [errors, setErrors] = useState({});

    const [todoData, setTodoData] = useState({
        task_title: "",
        due_date: "",
        content: "",
    });
    const { task_title, due_date, content } = todoData;

    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(`/to_do/${id}`);
                const { task_title, content, is_owner, due_date } = data;

                is_owner ? setTodoData({ task_title, content, due_date }) : history.push('/');
            } catch (err) {
               // console.log(err);
            }
        };

        handleMount();
    }, [history, id]);

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

        try {
            await axiosReq.put(`/to_do/${id}/`, formData);
            history.push(`/to_do/${id}`);
        } catch (err) {
           // console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data)
            }
        }
    }

    return (
        <Container className={styles.Container}>
            <br />
            <h2>Edit Task</h2>
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
                <br />
                <div className="text-center">
                    <Button
                        className={btnStyles.Button}
                        onClick={() => history.goBack()}
                    >
                        cancel
                    </Button>
                    <Button className={btnStyles.Button} type="submit">
                        Save
                    </Button>
                </div>
            </Form>
            <br />
        </Container>
    );
}

export default TodoEditForm;