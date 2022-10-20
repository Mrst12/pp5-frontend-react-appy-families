import React from 'react';
import Card from 'react-bootstrap/Card';
import Media from 'react-bootstrap/Media';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Link, useHistory } from 'react-router-dom';
import { axiosRes } from '../../api/axiosDefaults';
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
        setMemoPost,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const history = useHistory();

    const handleEdit = () => {
        history.push(`/memo_posts/${id}/edit`)
    }

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/memo_posts/${id}/`);
            history.goBack();
        } catch (err) {
            //console.log(err);
        }
    };

    const handleLike = async () => {
        try {
            const { data } = await axiosRes.post('/like_memo/', { memo_post: id });
            setMemoPost((prevMemoPost) => ({
                ...prevMemoPost,
                results: prevMemoPost.results.map((memo_post) => {
                    return memo_post.id === id
                        ? { ...memo_post, likes_count: memo_post.likes_count + 1, like_id: data.id }
                        : memo_post;
                }),
            }));
        } catch (err) {
            //console.log(err)
        }
    };

    const handleUnlike = async () => {
        try {
            await axiosRes.delete(`/like_memo/${like_id}/`);
            setMemoPost((prevMemoPost) => ({
                ...prevMemoPost,
                results: prevMemoPost.results.map((memo_post) => {
                    return memo_post.id === id
                        ? { ...memo_post, likes_count: memo_post.likes_count - 1, like_id: null }
                        : memo_post;
                }),
            }));
        } catch (err) {
            //console.log(err);
        }
    }

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
                        {is_owner && setMemoPost && (
                            <MoreDropdown
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                            />
                        )}
                    </div>
                </Media>
            </Card.Body>
            <Card.Body>
                <Link to={`/memo_posts/${id}`}>
                    {attention_of && <Card.Title className='text-center'>{attention_of}</Card.Title>}
                    {content && <Card.Text>{content}</Card.Text>}
                </Link>
                <div className={styles.PostBar}>
                    {is_owner ? (
                        <OverlayTrigger placement='top' overlay={<Tooltip>You cant like your own memo!</Tooltip>}>
                            <i className='far fa-heart' />
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