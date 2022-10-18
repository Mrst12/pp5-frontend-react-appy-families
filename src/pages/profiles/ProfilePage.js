import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Asset from "../../components/Asset";

import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import {
    useProfileData,
    useSetProfileData,
} from "../../contexts/ProfileDataContext";
import Achievements from "../achievements/Achievements";
import { fetchMoreData } from "../../utils/utils";
import NoResults from "../../assets/no-results.png";
import FamilyProfiles from "./FamilyProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Button, Image } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { ProfileEditDropdown } from "../../components/MoreDropdown";



function ProfilePage() {
    const [hasLoaded, setHasLoaded] = useState(false);
    const [profilePosts, setProfilePosts] = useState({ results: [] });

    const currentUser = useCurrentUser();
    const { id } = useParams();

    const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
    const { pageProfile } = useProfileData();

    const [profile] = pageProfile.results;
    const is_owner = currentUser?.username === profile?.owner;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [{ data: pageProfile }, { data: profilePosts }] = await Promise.all([
                    axiosReq.get(`/profiles/${id}/`),
                    axiosReq.get(`/achievements/?owner__profile=${id}`),
                ]);
                setProfileData(prevState => ({
                    ...prevState,
                    pageProfile: { results: [pageProfile] },
                }));

                setProfilePosts(profilePosts);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [id, setProfileData]);

    const mainProfile = (
        <>
            {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
            <Row noGutters className="px-3 text-center">
                <Col lg={3} className="text-lg-left">
                    <Image
                        className={styles.ProfileImage}
                        roundedCircle
                        src={profile?.image}
                    />
                </Col>
                <Col lg={6}>
                    <h3 className="m-2">{profile?.owner}</h3>
                    <Row className="justify-content-center no-gutters">
                        <Col xs={4} className="my-2">
                            <div>{profile?.achievements_posts_count}</div>
                            <div>achievement posts</div>
                        </Col>
                        <Col xs={4} className="my-2">
                            <div>{profile?.memo_posts_count}</div>
                            <div>memo posts</div>
                        </Col>
                        <Col xs={4} className="my-2">
                            <div>{profile?.followers_count}</div>
                            <div>watched by</div>
                        </Col>
                        <Col xs={4} className="my-2">
                            <div>{profile?.following_count}</div>
                            <div>watching</div>
                        </Col>
                    </Row>
                </Col>
                <Col lg={3} className="text-lg-right">
                    {currentUser &&
                        !is_owner &&
                        (profile?.following_id ? (
                            <Button
                                className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
                                onClick={() => handleUnfollow(profile)}
                            >
                                Watching you!
                            </Button>
                        ) : (
                            <Button
                                className={`${btnStyles.Button} ${btnStyles.Blue}`}
                                onClick={() => handleFollow(profile)}
                            >
                                Not watching you!
                            </Button>
                        ))}
                </Col>
                {profile?.content && <Col className="p-3">{profile.content}</Col>}
            </Row>
        </>
    );
    //add in memo posts at a later stage
    const mainProfilePosts = (
        <>
            <hr />
            <p className="text-center">{profile?.owner}'s achievement posts</p>
            <hr />
            {profilePosts.results.length ? (
                <InfiniteScroll
                    children={profilePosts.results.map((post) => (
                        <Achievements key={post.id} {...post} setPosts={setProfilePosts} />
                    ))}
                    dataLength={profilePosts.results.length}
                    loader={<Asset spinner />}
                    hasMore={!!profilePosts.next}
                    next={() => fetchMoreData(profilePosts, setProfilePosts)}
                />
            ) : (
                <Asset
                    src={NoResults}
                    message={`No results found, ${profile?.owner} hasn't posted yet.`}
                />
            )}
        </>
    );

    return (
        <Container>
            {hasLoaded ? (
                <>
                    {mainProfile}
                    {mainProfilePosts}
                </>
            ) : (
                <Asset spinner />
            )}
        </Container>
    );
}

export default ProfilePage;