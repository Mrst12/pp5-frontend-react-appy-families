import React from "react";
import Container from "react-bootstrap/Container";
import styles from "../styles/About.module.css";



function About() {
    return (
        <Container className={styles.Content}>
            <h2>
                <strong>About this site:</strong>
            </h2>
            <hr />
            <p>
                Need a list, need to write a memo, want to share your achievements?
                This is a family app that can do all that in one place !.
            </p>
            <p>
                Your kids always seem to be glued to their phone, or computer screen,
                now you can get the messsages you want across in an interactive way.
            </p>
            <p>
                You can like and comment on each others memo's, and achievements, you can visit
                each others profile, to tell them "I'm watching you!", you can have your todo list
                all in one handy place.
            </p>
            <p>
                You can edit and delete your own comments, memo's, achievements, and todo list
                everything easily navigational.
                Why not have a look around and then register for your own account, which is also editable
            </p>
            <p>
                Have fun with the family without the stress!.
            </p>
            <br />
            <p>
                Created for educational purposes only
            </p>
        </Container>
    )
}

export default About;
