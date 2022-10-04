import React from 'react';
import styles from '../../styles/Achievement.module.css';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Card, Media, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import { axiosRes } from '../../api/axiosDefaults';

const Achievements = (props) => {
    const {
        id,
        owner,
        profile_id,
        profile_image,
        comments_count,
        likes_count,
        like_id,
        title,
        content,
        image,
        achievementsPage,
        setAchievement,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner

    const handleLike = async () => {
        try {
            const {data} = await axiosRes.post('/like_achievements', {achievements:id});
            setAchievement((prevAchievement) => ({
                ...prevAchievement,
                results: prevAchievement.results.map((achievements) => {
                    return achievements.id === id
                    ? {...achievements, achievements_likes_count: achievements.likes_count +1, like_id: data.id}
                    : achievements;
                }),
            }));
        } catch (err) {
            console.log(err);
        }
    };

    const handleUnlike = async () => {
        try {
            await axiosRes.delete(`/like_achievements${like_id}/`);
            setAchievement((prevAchievement) => ({
                ...prevAchievement,
                results: prevAchievement.results.map((achievements) => {
                    return achievements.id === id
                    ? { ...achievements, likes_count: achievements.likes_count -1, like_id: null }
                    : achievements;
                }),
            }));
        } catch (err) {
            console.log(err);
        }
    }


    return <Card className={styles.Achievements}>
        <Card.Body>
            <Media className="align-items-center justify-content-between">
                <Link to={`/profiles/${profile_id}`}>
                    <Avatar src={profile_image} height={55} />
                    {owner}
                </Link>
                <div className="d-flex align-items-center">
                    {is_owner && achievementsPage && "..."}
                </div>
            </Media>
        </Card.Body>
        <Link to={`/achievements/${id}`}>
            <Card.Img src={image} alt={title} />
        </Link>
        <Card.Body>
            {title && <Card.Title className='text-center'>{title}</Card.Title>}
            {content && <Card.Text>{content}</Card.Text>}
            <div className={styles.PostBar}>
                {is_owner ? (
                    <OverlayTrigger placement='top' overlay={<Tooltip>You can't like your own post!</Tooltip>}>
                        <i className="far fa-heart" />
                    </OverlayTrigger>
                ) : like_id ? (
                    <span onClick={handleUnlike}>
                        <i className={`fas fa-heart ${styles.Heart}`} />
                    </span>
                ) : currentUser ? (
                    <span onClick={handleLike}>
                        <i className={`far fa-heart ${styles.HeartOutline}`} />
                    </span>
                ) : (
                    <OverlayTrigger placement='top' overlay={<Tooltip>Log in to like achievements</Tooltip>}>
                        <i className="far fa-heart" />
                    </OverlayTrigger>
                )}
                {likes_count}
                <Link to={`/achievements/${id}`}>
                    <i className='far fa-comments' />
                </Link>
                {comments_count}
            </div>
        </Card.Body>
    </Card>
}

export default Achievements