import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Todo from "./Todo";

function TodoPostPage() {
  const { id } = useParams();
  const [todo, setTodo] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: todo }] = await Promise.all([
          axiosReq.get(`/to_do/${id}`),
        ]);
        setTodo({ results: [todo] });
        console.log(todo);
      } catch (err) {
       // console.log(err);
      }
    };

    handleMount();
  }, [id]);



  return (
    <Container>
      <Todo {...todo.results[0]} setTodo={setTodo} TodoPostPage />
    </Container>
  );
}

export default TodoPostPage;