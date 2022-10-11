import React from 'react';
import { Card, Media, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import { MoreDropdown } from '../../components/MoreDropdown';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import styles from '../../styles/Memo.module.css';

const Memo = (props) => {
    const {
        id,
        owner,
        profile_id,
        profile_image,
        comments_count,
        likes_count,
        like_id,
        attention_of,
        content,
        created_on,
        MemoPostPage,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    return (
        <Card className={styles.Post}>
            <Card.Body>
                <Media className='align-items-center justify-content-between'>
                    <Link to={`/profiles/${profile_id}`}>
                        <Avatar src={profile_image} height={55} />
                        {owner}
                    </Link>
                    <div className='d-flex align-items-center'>
                        <span>{created_on}</span>
                        {is_owner && MemoPostPage && <MoreDropdown />}
                    </div>
                </Media>
            </Card.Body>
            <Card.Body>
                {attention_of && <Card.Title className='text-center'>{attention_of}</Card.Title>}
                {content && <Card.Text>{content}</Card.Text>}
                <div className={styles.PostBar}>
                    {is_owner ? (
                        <OverlayTrigger placement='top' overlay={<Tooltip>You cant like your own memo!</Tooltip>}>
                            <i className='far fa-heart' />
                        </OverlayTrigger>
                    ) : like_id ? (
                        <span onClick={() => {}}>
                            <i className={`fas fa-heart ${styles.Heart}`} />
                        </span>
                    ) : currentUser ? (
                        <span onClick={() => {}}>
                            <i className={`far fa-heart ${styles.HeartOutline}`} />
                        </span>
                    ) : (
                        <OverlayTrigger placement='top' overlay={<Tooltip>Log in to like memo</Tooltip>}>
                            <i className='far fa-heart' />
                        </OverlayTrigger>
                    )}
                    {likes_count}
                    <Link to={`/memo_posts/${id}`}>
                        <i className='far fa-comments' />
                    </Link>
                    {comments_count}
                </div>
            </Card.Body>
        </Card>
    )
}

export default Memo