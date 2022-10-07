//single achievement page
import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import AchievementsCommentCreateForm from "../comments/AchievementsCommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Achievements from "./Achievements";
import AchievementsComment from "../comments/AchievementsComment";

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
        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <p>Popular profiles for mobile</p>
                <Achievements {...achievement.results[0]} setAchievement={setAchievement} AchievementsPage />
                <Container className={appStyles.Content}>
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
                        achievementsComments.results.map(achievementsComments => (
                            <AchievementsComment
                                key={achievementsComments.id}
                                {...achievementsComments}
                            />

                        ))
                    ) : currentUser ? (
                        <span>No comments yet, be the first to comment!</span>
                    ) : (
                        <span>No comments yet....</span>
                    )}
                </Container>
            </Col>
            <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
                Popular profiles for desktop
            </Col>
        </Row>
    );
}

export default AchievementsPage;