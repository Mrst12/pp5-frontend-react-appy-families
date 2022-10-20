import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import styles from "../../styles/MemoPosts.module.css";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Memo from "./Memo";
import NoResults from "../../assets/no-results.png";
import Asset from "../../components/Asset";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";


function MemoPostsPage({ message }) {
    const [memo_post, setMemoPost] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();

    const [query, setQuery] = useState("");

    useEffect(() => {
        const fetchMemoPosts = async () => {
            try {
                const { data } = await axiosReq.get(`/memo_posts/?search=${query}`);
                setMemoPost(data);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        }

        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchMemoPosts();
        }, 1000);
        return () => {
            clearTimeout(timer);
        };
    }, [query, pathname]);

    return (
        <Container>
            <div>

                <i className={`fas fa-search ${styles.SearchIcon}`} />
                <Form
                    className={styles.SearchBar}
                    onSubmit={(event => event.preventDefault())}
                >
                    <Form.Control
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        type="text"
                        className="mr-sm-2"
                        placeholder="Search memo's"
                        aria-label="search memos"

                    />
                </Form>
            </div>
            {hasLoaded ? (
                <>
                    {memo_post.results.length ? (
                        <InfiniteScroll
                            children={
                                memo_post.results.map((memo_post) => (
                                    <Memo key={memo_post.id} {...memo_post} setMemoPost={setMemoPost} />
                                ))
                            }
                            dataLength={memo_post.results.length}
                            loader={<Asset spinner />}
                            hasMore={!!memo_post.next}
                            next={() => fetchMoreData(memo_post, setMemoPost)}
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

export default MemoPostsPage;