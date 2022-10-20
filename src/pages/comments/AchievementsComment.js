import React, { useState } from 'react';
import Media from 'react-bootstrap/Media';
import { Link } from 'react-router-dom';
import { axiosRes } from '../../api/axiosDefaults';
import Avatar from '../../components/Avatar';
import { MoreDropdown } from '../../components/MoreDropdown';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import styles from '../../styles/AchievementsComments.module.css';
import AchievementsCommentEditForm from './AchievementsCommentEditForm';

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

    const [showEditForm, setShowEditForm] = useState(false);

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/comments_achievements/${id}/`)
            setAchievement(prevAchievement => ({
                results: [{
                    ...prevAchievement.results[0],
                    achievements_comments_count: prevAchievement.results[0].achievements_comments_count - 1
                }]
            }))

            setAchievementsComments(prevAchievementsComment => ({
                ...prevAchievementsComment,
                results: prevAchievementsComment.results.filter((achievementsComments) => achievementsComments.id !== id),
            }))
        } catch (err) {
            //console.log(err);

        }
    }

    return (
        <>
            <hr />
            <Media>
                <Link to={`/profiles/${profile_id}`}>
                    <Avatar src={profile_image} />
                </Link>
                <Media.Body className="align-self-center ml-2">
                    <span className={styles.Owner}>{owner}</span>
                    <span className={styles.Date}>{created_on}</span>
                    {showEditForm ? (
                        <AchievementsCommentEditForm
                        id={id}
                        profile_id={profile_id}
                        content={content}
                        profileImage={profile_image}
                        setAchievementsComments={setAchievementsComments}
                        setShowEditForm={setShowEditForm}
                        />
                    ) : (
                        <p>{content}</p>
                    )}
                </Media.Body>
                {is_owner && !showEditForm && (
                    <MoreDropdown
                        handleEdit={() => setShowEditForm(true)}
                        handleDelete={handleDelete}
                    />
                )}
            </Media>
        </>
    );
};

export default AchievementsComment;