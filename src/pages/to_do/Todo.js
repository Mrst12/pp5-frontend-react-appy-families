import React from 'react';
import Card from 'react-bootstrap/Card';
import Media from 'react-bootstrap/Media';
import { Link, useHistory } from 'react-router-dom';
import { axiosRes } from '../../api/axiosDefaults';
import Avatar from '../../components/Avatar';
import { MoreDropdown } from '../../components/MoreDropdown';
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
        setTodo,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const history = useHistory();

    const handleEdit = () => {
        history.push(`/to_do/${id}/edit`)
    }

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/to_do/${id}`);
            history.goBack();
        } catch (err) {
            //console.log(err);
        }
    };

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
                        {is_owner && setTodo && (
                            <MoreDropdown
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                            />
                        )}
                    </div>
                </Media>
            </Card.Body>
            <Link to={`/to_do/${id}`}>
                <Card.Body>
                    {task_title && <>Task title:<Card.Title className='text_center'>{task_title}</Card.Title></>}
                    {due_date && <>Due date:<Card.Text>{due_date}</Card.Text></>}
                    {content && <>Task: <Card.Text>{content}</Card.Text></>}
                </Card.Body>
            </Link>
        </Card>
    )
}

export default Todo;