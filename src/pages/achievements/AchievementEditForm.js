import React, { useEffect, useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import styles from "../../styles/CreateAchievementForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { Alert, Image } from "react-bootstrap";
import { useHistory, useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

function AchievementEditForm() {

    const [errors, setErrors] = useState({});

    const [achievementData, setAchievementData] = useState({
        title: '',
        content: '',
        image: '',
    });
    const { title, content, image } = achievementData;

    const imageInput = useRef(null);
    const history = useHistory();

    const { id } = useParams();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(`/achievements/${id}/`);
                const { title, content, image, is_owner } = data;

                is_owner ? setAchievementData({ title, content, image }) : history.push('/');
            } catch (err) {
                console.log(err);
            }
        };

        handleMount();
    }, [history, id]);

    const handleChange = (event) => {
        setAchievementData({
            ...achievementData,
            [event.target.name]: event.target.value,
        });
    };

    const handleChangeImage = (event) => {
        if (event.target.files.length) {
            URL.revokeObjectURL(image);
            setAchievementData({
                ...achievementData,
                image: URL.createObjectURL(event.target.files[0]),
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData();

        formData.append('title', title);
        formData.append('content', content);

        if (imageInput?.current?.files[0]) {
            formData.append('image', imageInput.current.files[0]);
        }

        try {
            await axiosReq.put(`/achievements/${id}/`, formData);
            history.push(`/achievements/${id}`);
        } catch (err) {
            console.log(err)
            if (err.response?.status !== 401) {
                setErrors(err.response?.data)
            }
        }
    }

    return (
        <Container className={styles.Container}>
            <br />
            <h2>
                Create Achievement
            </h2>
            <br />
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        aria-label="title"
                        value={title}
                        onChange={handleChange}
                    />
                </Form.Group>
                {errors?.title?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                        {message}
                    </Alert>
                ))}
                <Form.Group>
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={6}
                        name="content"
                        aria-label="content"
                        value={content}
                        onChange={handleChange}
                    />
                </Form.Group>
                {errors?.content?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                        {message}
                    </Alert>
                ))}
                <Form.Group className="text-center">
                    <figure>
                        <Image className={appStyles.Image} src={image} rounded />
                    </figure>
                    <div>
                        <Form.Label
                            className={btnStyles.Button}
                            htmlFor="image-upload"
                        >
                            Change the image
                        </Form.Label>
                    </div>

                    <Form.File
                        id="image-upload"
                        accept="image/*"
                        onChange={handleChangeImage}
                        ref={imageInput}
                    />
                </Form.Group>
                {errors?.image?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                        {message}
                    </Alert>
                ))}
                
                <div className="text-center">
                    <Button
                        className={btnStyles.Button}
                        onClick={() => history.goBack()}
                    >
                        Cancel
                    </Button>
                    <Button className={btnStyles.Button} type="submit">
                        Save
                    </Button>
                </div>
            </Form>
            <br />
        </Container>
    );
}

export default AchievementEditForm;