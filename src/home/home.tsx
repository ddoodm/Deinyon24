import * as React from 'react';
import { BigHero } from '../big_hero/big_hero';
import styles from './home.css';

export const Home = () => {
    return (
        <div className={styles.body}>
            <BigHero>
                hiii
            </BigHero>
        </div>
    );
};