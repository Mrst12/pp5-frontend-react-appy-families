//display all achievements page
import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import styles from "../../styles/AchievementsPosts.module.css";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Achievements from "./Achievements";
import Asset from "../../components/Asset";
import NoResults from "../../assets/no-results.png";

function AchievementsPostsPage(message) {

  const [achievementPosts, setAchievementPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchAchievementPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/achievements/?search=${query}`);
        setAchievementPosts(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchAchievementPosts();
    }, 1000);
    return () => {
      clearTimeout(timer);
    };

  }, [query, pathname]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles mobile</p>
        <i className={`fas fa-search ${styles.SearchIcon}`} />
        <Form className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            className="mr-sm-2"
            placeholder="Search achievements"
            aria-label="search achievements"
          />
        </Form>


        {hasLoaded ? (
          <>
            {achievementPosts.results.length ? (
              achievementPosts.results.map((achievement_post) => (
                <Achievements key={achievement_post.id} {...achievement_post} setAchievement={setAchievementPosts} />
              ))
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container classNmae={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <p>Popular profiles for desktop</p>
      </Col>
    </Row>
  );
}

export default AchievementsPostsPage;