import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import styles from "../../styles/CreateMemoForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useHistory, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { Alert } from "react-bootstrap";

function MemoEditForm() {

  const [errors, setErrors] = useState({});

  const [memoData, setMemoData] = useState({
    attention_of: "",
    content: "",
  });
  const { attention_of, content } = memoData;

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
        try {
            const {data} = await axiosReq.get(`/memo_posts/${id}/`);
            const {attention_of, content, is_owner} = data;

            is_owner ? setMemoData({attention_of, content}) : history.push('/');
        } catch (err) {
           console.log(err); 
        }
    };

    handleMount();
  },[history, id]);

  const handleChange = (event) => {
    setMemoData({
      ...memoData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData();

    formData.append('attention_of', attention_of);
    formData.append('content', content);

    try {
      await axiosReq.put(`/memo_posts/${id}/`, formData);
      history.push(`/memo_posts/${id}`)
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
        <Form.Label>Attention of:</Form.Label>
        <Form.Control
          type="text"
          name="attention_of"
          value={attention_of}
          onChange={handleChange}
          aria-label="attention of"
        />
      </Form.Group>
      {errors?.attention_of?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

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
      {errors?.content?.map((message, idx) => (
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
        Save
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

export default MemoEditForm;