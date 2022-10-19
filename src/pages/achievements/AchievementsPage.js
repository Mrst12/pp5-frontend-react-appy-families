//single achievement page
import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import AchievementsCommentCreateForm from "../comments/AchievementsCommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import styles from "../../styles/AchievementsPosts.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Achievements from "./Achievements";
import AchievementsComment from "../comments/AchievementsComment";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from '../../components/Asset';
import { fetchMoreData } from '../../utils/utils';

function AchievementsPage() {
    const { id } = useParams();
    const [achievement, setAchievement] = useState({ results: [] });

    const currentUser = useCurrentUser();
    const profile_image = currentUser?.profile_image;
    const [achievementsComments, setAchievementsComments] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: achievement }, { data: achievementsComments }] = await Promise.all([
                    axiosReq.get(`/achievements/${id}`),
                    axiosReq.get(`/comments_achievements/?achievement_post=${id}`)
                ])
                setAchievement({ results: [achievement] });
                setAchievementsComments(achievementsComments);
            } catch (err) {
                console.log(err)
            }
        };

        handleMount();
    }, [id]);


    return (
        <Container>
            <Achievements {...achievement.results[0]} setAchievement={setAchievement} AchievementsPage />
            <Container className={styles.Content}>
                {currentUser ? (
                    <AchievementsCommentCreateForm
                        profile_id={currentUser.profile_id}
                        profileImage={profile_image}
                        achievement_post={id}
                        setAchievement={setAchievement}
                        setAchievementsComments={setAchievementsComments}
                    />
                ) : achievementsComments.results.length ? (
                    "Comments"
                ) : null}
                {achievementsComments.results.length ? (
                    <InfiniteScroll
                        children={achievementsComments.results.map((achievementsComments) => (
                            <AchievementsComment
                                key={achievementsComments.id}
                                {...achievementsComments}
                                setAchievement={setAchievement}
                                setAchievementsComments={setAchievementsComments}
                            />

                        ))}
                        dataLength={achievementsComments.results.length}
                        loader={<Asset spinner />}
                        hasMore={!!achievementsComments.next}
                        next={() => fetchMoreData(achievementsComments, setAchievementsComments)}
                    />
                ) : currentUser ? (
                    <span>No comments yet, be the first to comment!</span>
                ) : (
                    <span>No comments yet....</span>
                )}
            </Container>
        </Container >
    );
}

export default AchievementsPage;