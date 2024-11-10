import * as React from 'react';
import styles from './big_hero.css';
import { Bubbles } from '../bubbles/bubbles';

export const BigHero = ( { children }: React.PropsWithChildren ) => {
    return (
        <div className={styles.bigHero}>
            {/* <div className={styles.bubbleBox}>
                <Bubbles />
            </div> */}
            <div className={styles.container}>
                {children}
            </div>
        </div>
    );
};
