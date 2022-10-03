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
            </Media>
        </Card.Body>
    </Card>
}

export default Achievements