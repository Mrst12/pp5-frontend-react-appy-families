import React from 'react';
import styles from '../../styles/Achievement.module.css';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Card, Media } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Avatar from '../../components/Avatar';

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
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner


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
        </Card.Body>
    </Card>
}

export default Achievements