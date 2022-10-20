import React from 'react';
import Button from 'react-bootstrap/Button';
import btnStyles from '../../styles/Button.module.css';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Link } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import { useSetProfileData } from '../../contexts/ProfileDataContext';

const Profile = (props) => {
    const { profile, imageSize = 55 } = props;
    const { id, following_id, image, owner } = profile;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    const { handleFollow, handleUnfollow } = useSetProfileData();

    return (
        <div className="my-4 d-flex">
            <div>
                <Link className='align-self-center' to={`/profiles/${id}`}>
                    <Avatar src={image} height={imageSize} />
                </Link>
            </div>
            <div>
                <p>
                    <strong>{owner}</strong>
                </p>
            </div>
            <div className="ml-auto">
                {currentUser && !is_owner && (
                    following_id ? (
                        <Button
                            className={btnStyles.Button}
                            onClick={() => handleUnfollow(profile)}
                        >
                            Watching you!
                        </Button>
                    ) : (
                        <Button
                            className={btnStyles.Button}
                            onClick={() => handleFollow(profile)}
                        >
                            Not watching you!
                        </Button>
                    )
                )}
            </div>
        </div>
    );
};

export default Profile