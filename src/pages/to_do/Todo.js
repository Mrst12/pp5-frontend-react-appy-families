import React from 'react';
import { Card, Media } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import styles from '../../styles/Todo.module.css';

const Todo = (props) => {
    const {
        id,
        owner,
        profile_id,
        profile_image,
        task_title,
        created_on,
        due_date,
        content,
        status,
        urgent,
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
                </Media>
            </Card.Body>
        </Card>
    )
}

export default Todo;