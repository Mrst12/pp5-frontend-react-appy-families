import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import appStyles from "../../App.module.css";
import styles from "../../styles/TodoPosts.module.css";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Todo from "./Todo";
import NoResults from "../../assets/no-results.png";
import Asset from "../../components/Asset";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import { useCurrentUser } from "../../contexts/CurrentUserContext";


function TodoPostsPage({ message }) {
    const [todo, setTodo] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();

    const [query, setQuery] = useState("");
    const currentUser = useCurrentUser();

    useEffect(() => {
        const fetchTodoPosts = async () => {
            try {
                const { data } = await axiosReq.get(`/to_do/?search=${query}`);
                setTodo(data);
                setHasLoaded(true);
            } catch (err) {
               // console.log(err);
            }
        };

        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchTodoPosts();
        }, 1000);
        return () => {
            clearTimeout(timer);
        };
    }, [pathname, query, currentUser]);

    return (
        <Container>
            <div>
                <i className={`fas fa-search ${styles.SearchIcon}`} />
                <Form className={styles.SearchBar}
                    onSubmit={(event) => event.preventDefault()}
                >
                    <Form.Control
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        type="text"
                        className="mr-sm-2"
                        placeholder="Search Tasks"
                        aria-label="search"
                    />
                </Form>
            </div>
            {hasLoaded ? (
                <>
                    {todo.results.length ? (
                        <InfiniteScroll
                            children={
                                todo.results.map((todo) => (
                                    <Todo key={todo.id} {...todo} setTodo={setTodo} />
                                ))
                            }
                            dataLength={todo.results.length}
                            loader={<Asset spinner />}
                            hasMore={!!todo.next}
                            next={() => fetchMoreData(todo, setTodo)}
                        />
                    ) : (
                        <Container className={appStyles.Content}>
                            <Asset src={NoResults} message={message} />
                        </Container>
                    )}
                </>
            ) : (
                <Container className={appStyles.Content}>
                    <Asset spinner />
                </Container>
            )}
        </Container>
    );
}

export default TodoPostsPage;