import React from 'react';
import { Media } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { axiosRes } from '../../api/axiosDefaults';
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
        id,
        setAchievement,
        setAchievementsComments,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/comments_achievements/${id}/`)
            setAchievement(prevAchievement => ({
                results: [{
                    ...prevAchievement.results[0],
                    achievements_comments_count: prevAchievement.results[0].achievements_comments_count -1
                }]
            }))

            setAchievementsComments(prevAchievementsComment => ({
                ...prevAchievementsComment,
                results: prevAchievementsComment.results.filter((achievementsComments) => achievementsComments.id !==id),
            }))
        } catch (err) {
            
        }
    }

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
                        handleDelete={handleDelete}
                    />
                )}
            </Media>
        </div>
    );
};

export default AchievementsComment;