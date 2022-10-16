import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Todo from "./Todo";

function TodoPostPage() {
    const { id } = useParams();
    const [todo, setTodo] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{data: todo}] = await Promise.all([
                    axiosReq.get(`/to_do/${id}`),
                ]);
                setTodo({results: [todo]});
                console.log(todo);
            } catch (err) {
                console.log(err);
            }
        };

        handleMount();
    }, [id]);
  


  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles for mobile</p>
        <Todo {...todo.results[0]} setTodo={setTodo} TodoPostPage />
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popular profiles for desktop
      </Col>
    </Row>
  );
}

export default TodoPostPage;