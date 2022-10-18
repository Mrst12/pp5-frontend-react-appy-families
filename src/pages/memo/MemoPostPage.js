import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Memo from "./Memo";

import MemoCommentCreateForm from "../comments/MemoCommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import MemoComment from "../comments/MemoComment";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";


function MemoPostPage() {
    const { id } = useParams();
    const [memoPost, setMemoPost] = useState({ results: [] });

    const currentUser = useCurrentUser();
    const profile_image = currentUser?.profile_image;
    const [comments, setComments] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: memoPost }, { data: comments }] = await Promise.all([
                    axiosReq.get(`/memo_posts/${id}`),
                    axiosReq.get(`/comments_memo_posts/?memo_post=${id}`)
                ])
                setMemoPost({ results: [memoPost] });
                setComments(comments);
                console.log(memoPost);
                console.log(comments);
            } catch (err) {
                console.log(err);
            }
        }

        handleMount();
    }, [id]);


    return (
        <Container>
                <Memo {...memoPost.results[0]} setMemoPost={setMemoPost} MemoPostPage />
                <Container className={appStyles.Content}>
                    {currentUser ? (
                        <MemoCommentCreateForm
                            profile_id={currentUser.profile_id}
                            profileImage={profile_image}
                            memo_post={id}
                            setMemoPost={setMemoPost}
                            setComments={setComments}
                        />
                    ) : comments.results.length ? (
                        "Comments"
                    ) : null}
                    {comments.results.length ? (
                        <InfiniteScroll
                            children={comments.results.map((comments) => (
                            <MemoComment
                                key={comments.id}
                                {...comments}
                                setMemoPost={setMemoPost}
                                setComments={setComments}
                            />
                        ))}
                        dataLength={comments.results.length}
                        loader={<Asset spinner />}
                        hasMore={!!comments.next}
                        next={() => fetchMoreData(comments, setComments)}
                        />
                    ) : currentUser ? (
                        <span>No comments yet, be the first to comment!</span>
                    ) : (
                        <span>No comments yet...</span>
                    )}
                </Container>
        </Container>
    );
}

export default MemoPostPage;