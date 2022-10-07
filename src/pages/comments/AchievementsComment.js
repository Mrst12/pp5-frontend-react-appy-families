import React from 'react';
import { Media } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import { MoreDropdown } from '../../components/MoreDropdown';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import styles from '../../styles/AchievementsComments.module.css';

const AchievementsComment = (props) => {
    const {
        profile_id,
        profile_image,
        owner,
        created_on,
        content,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    return (
        <div>
            <hr />
            <Media>
                <Link to={`/profiles/${profile_id}`}>
                    <Avatar src={profile_image} />
                </Link>
                <Media.Body className='align-self-center ml-2'>
                    <span className={styles.Owner}>{owner}</span>
                    <span className={styles.Date}>{created_on}</span>
                    <p>{content}</p>
                </Media.Body>
                {is_owner && (
                    <MoreDropdown
                        handleEdit={() => {}}
                        handleDelete={() => {}}
                    />
                )}
            </Media>
        </div>
    );
};

export default AchievementsComment;