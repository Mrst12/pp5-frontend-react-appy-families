import React from 'react';
import { Container } from 'react-bootstrap';
import styles from '../../styles/Profile.module.css';
import Asset from '../../components/Asset';
import { useProfileData } from '../../contexts/ProfileDataContext';
import Profile from './Profile';

const FamilyProfiles = () => {
    const { popularProfiles } = useProfileData();

    return (
        <Container className={styles.Heading}>
            {popularProfiles.results.length ? (
                <>
                    <br />
                    <h2>Family</h2>
                    {popularProfiles.results.map((profile) => (
                            <Profile key={profile.id} profile={profile} />

                        ))}
                    </>
                    ) : (
                      <Asset spinner />  
                    )}
        </Container>
    );
};

export default FamilyProfiles