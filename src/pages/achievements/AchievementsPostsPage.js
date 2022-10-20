//display all achievements page
import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import styles from "../../styles/AchievementsPosts.module.css";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Achievements from "./Achievements";
import Asset from "../../components/Asset";
import NoResults from "../../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import { useCurrentUser } from "../../contexts/CurrentUserContext";


function AchievementsPostsPage(message) {

  const [achievementPosts, setAchievementPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  const [query, setQuery] = useState("");
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchAchievementPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/achievements/?search=${query}`);
        setAchievementPosts(data);
        setHasLoaded(true);
      } catch (err) {
        //console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchAchievementPosts();
    }, 1000);
    return () => {
      clearTimeout(timer);
    };

  }, [query, pathname, currentUser]);

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
            placeholder="Search achievements"
            aria-label="search achievements"
          />
        </Form>
      </div>

      {hasLoaded ? (
        <>
          {achievementPosts.results.length ? (
            <InfiniteScroll
              children={
                achievementPosts.results.map((achievement_post) => (
                  <Achievements key={achievement_post.id} {...achievement_post} setAchievement={setAchievementPosts} />
                ))
              }
              dataLength={achievementPosts.results.length}
              loader={<Asset spinner />}
              hasMore={!!achievementPosts.next}
              next={() => fetchMoreData(achievementPosts, setAchievementPosts)}
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

export default AchievementsPostsPage;