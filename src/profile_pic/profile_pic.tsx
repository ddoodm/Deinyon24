import * as React from 'react';
import styles from './profile_pic.css';
import deinyonSmall from './deinyon-small.jpg';

export const ProfilePic = () => {
    return (
        <div>
            <img
                className={styles.profilePic}
                src={deinyonSmall}
            />
        </div>
    );
};